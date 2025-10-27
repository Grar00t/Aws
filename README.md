# GrA × Genius — 2025.1 (PRODUCTION)

حزمة موحّدة مُدقّقة للتشغيل على Bluvalt OpenStack مع سيادة بيانات كاملة (PDPL/CCC-2-2024).
**مسار التشغيل الموصى به: kubectl أولاً** (Helm اختياري وغير مضمن كـ Chart لتفادي ازدواج النشر).

## الترتيب المقترح للتطبيق
```bash
# 0) Namespaces
kubectl apply -f k8s/namespaces.yaml

# 1) StorageClass (Cinder مُعمّى)
kubectl apply -f k8s/data/storageclass-cinder.yaml

# 2) أسرار وقاعدة البيانات (Postgres + pgvector + RLS)
kubectl apply -f k8s/data/db-secrets.yaml
kubectl apply -f k8s/data/postgres-init-configmap.yaml
kubectl apply -f k8s/data/postgres.yaml
kubectl apply -f k8s/data/redis.yaml

# 3) أمن الشبكة (طبّق deny ثم allow)
kubectl apply -f k8s/security/networkpolicy-deny-egress.yaml
kubectl apply -f k8s/security/networkpolicy-allow-core-egress.yaml

# 4) cert-manager (مطلوب مثبّت مسبقًا) + Ingress
kubectl apply -f k8s/cert-manager/selfsigned-issuer.yaml
kubectl apply -f k8s/apps/pricing-cm.yaml
kubectl apply -f k8s/apps/api-deployment.yaml
kubectl apply -f k8s/apps/ui-deployment.yaml
kubectl apply -f k8s/ai/vllm.yaml
kubectl apply -f k8s/ai/rag-api.yaml
kubectl apply -f k8s/apps/ingress.yaml

# 5) المراقبة (اختياري)
kubectl apply -f k8s/observability/prometheus.yaml
kubectl apply -f k8s/observability/grafana-ds.yaml
kubectl apply -f k8s/observability/prometheus-rules.yaml

# 6) سياسات توقيع الصور (بعد تثبيت policy-controller)
kubectl apply -f k8s/security/clusterimagepolicy.yaml
```

## ملاحظات
- غيّر كلمة سر Postgres في `k8s/data/db-secrets.yaml` واستبدل `cosign.pub` بمفتاحك.
- لخدمات mTLS داخلية، ابدأ بـ Linkerd (أخف من Istio) ثم فعّل سياسة عدم الثقة الافتراضية.
- لا تخلط Helm وkubectl لنفس الموارد لتفادي الازدواج.
