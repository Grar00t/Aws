from typing import List, Tuple, Optional
import psycopg2
from psycopg2.extras import Json
try:
    from pgvector.psycopg2 import register_vector
except Exception:
    register_vector = None

DDL = """
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS tenant_vectors (
  tenant_id text NOT NULL,
  chunk_id uuid DEFAULT gen_random_uuid(),
  chunk text NOT NULL,
  embedding vector(768) NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (tenant_id, chunk_id)
);
ALTER TABLE tenant_vectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS tenant_isolation ON tenant_vectors
  USING (tenant_id = current_setting(\'app.tenant_id\', true));

CREATE INDEX IF NOT EXISTS tenant_vectors_embedding_ivfflat
  ON tenant_vectors USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
"""

def connect(db_url: str, tenant_id: str):
    conn = psycopg2.connect(db_url)
    with conn.cursor() as cur:
        cur.execute("SELECT set_config(\'app.tenant_id\', %s, true);", (tenant_id,))
        if register_vector is not None:
            register_vector(conn)
        cur.execute(DDL)
        conn.commit()
    return conn

def embed_texts(texts: List[str]) -> List[List[float]]:
    return [[0.0]*768 for _ in texts]

def upsert_embeddings(conn, tenant_id: str, chunks: List[str], vectors: List[List[float]], metadatas: Optional[List[dict]] = None):
    metadatas = metadatas or [{} for _ in chunks]
    with conn.cursor() as cur:
        for c, v, m in zip(chunks, vectors, metadatas):
            cur.execute(
                "INSERT INTO tenant_vectors (tenant_id, chunk, embedding, metadata) VALUES (%s,%s,%s,%s)",
                (tenant_id, c, v, Json(m))
            )
    conn.commit()

def search(conn, tenant_id: str, query_vec: List[float], top_k: int = 5) -> List[Tuple[str, float]]:
    sql = (
      "SELECT chunk, (embedding <-> %s) AS distance "
      "FROM tenant_vectors "
      "WHERE tenant_id = %s "
      "ORDER BY embedding <-> %s "
      "LIMIT %s"
    )
    with conn.cursor() as cur:
        cur.execute(sql, (query_vec, tenant_id, query_vec, top_k))
        return [(row[0], float(row[1])) for row in cur.fetchall()]
