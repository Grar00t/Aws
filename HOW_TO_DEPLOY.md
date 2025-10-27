# 🚀 تعليمات النشر Gra Genius 2025

## 🧱 المتطلبات:
- Docker أو Kubernetes v1.30+
- Helm 3.11+
- PostgreSQL مع pgvector وpgcrypto
- Python 3.11 (لـ ai/)
- .NET 8 SDK
- Node.js 20 + pnpm
- Cosign + Trivy (للتحقق من الصور)

---

## 1️⃣ قاعدة البيانات (PostgreSQL)

```bash
psql -U gra -d gra -f src/services/db/init_extensions.sql
```

- يتضمن:
  - `pgvector`
  - `pgcrypto`
  - سياسات RLS على `tenant_vectors`

---

## 2️⃣ بناء وتشغيل الـ API (gra.api - .NET 8)

```bash
cd src/backend/gra.api
dotnet build
dotnet run
# التحقق:
curl http://localhost:5000/healthz
```

---

## 3️⃣ إعداد RAG وPython AI

```bash
cd ai/
python3 -m venv .venv && source .venv/bin/activate
pip install psycopg2 pgvector
python rag_pipeline_improved.py
```

---

## 4️⃣ تشغيل الواجهة (UI - Next.js)

```bash
cd src/ui
pnpm install
pnpm build
pnpm start
```

---

## 5️⃣ Kubernetes (تنصيب السياسات والمراقبة)

```bash
kubectl apply -f k8s/namespaces.yaml
kubectl apply -f k8s/security/
kubectl apply -f k8s/observability/
kubectl apply -f k8s/data/
kubectl apply -f k8s/ai/
```

---

## 6️⃣ أدوات الأمان والتكامل

```bash
cosign verify --key secrets/cosign.pub <IMAGE>
trivy image --exit-code 1 registry.gratech.sa/gra/api:2025.1
```

---

## 7️⃣ المراقبة

- التنبيهات محفوظة في `k8s/observability/alerts.yaml`
- يجب أن يتكامل مع Prometheus + Grafana

---

## 📄 معلومات إضافية

- ملف `PROMPT.json`: يحتوي إعدادات الذكاء الاصطناعي.
- `docs/README.md`: توثيق أولي للنظام.
