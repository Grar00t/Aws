# Security & Compliance (PDPL / NCA CCC-2-2024)

- **Localization**: Bluvalt + MinIO داخل المملكة، سياسات egress تقيّد الخروج.
- **At-Rest Encryption**: Cinder/LUKS + pgcrypto، StorageClass `cinder-sc` مع نوع مُعمّى.
- **In-Transit Encryption**: TLS 1.3 على الحواف + mTLS داخلي (شبكة خدمية).
- **Tenant Isolation**: Namespaces + NetworkPolicy + **Postgres RLS**.
- **Supply Chain**: Sigstore ClusterImagePolicy + Cosign توقيع صور.
- **Backups**: استخدم pg_dump إلى MinIO، اختبارات استرجاع شهرية.
