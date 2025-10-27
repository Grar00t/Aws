# Pricing

تتم قراءة التسعير مباشرة من ConfigMap `pricing-cm` ويُقدَّم عبر مسار `/pricing` في الـ API.
قم بتعديل `k8s/apps/pricing-cm.yaml` وفق حاجتك ثم أعد تشغيل الـ API Deployment.
