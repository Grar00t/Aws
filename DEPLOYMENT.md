# Production Deployment (Bluvalt)

1. أنشئ الـ VPC عبر Terraform داخل مجلد `terraform/` إن رغبت بشبكة مُدارة.
2. طبّق المجلد `k8s/` بالترتيب الموضح في README.
3. تحقق:
```bash
kubectl get pods -n production
kubectl get ingress -n production
curl -k https://gratech.sa/api/healthz
```

## بيئات
أنصح بفصل `production` و`staging` بأسماء Namespaces مختلفة مع Secrets وقواعد بيانات منفصلة.
