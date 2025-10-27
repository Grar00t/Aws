export async function getPricing(): Promise<string> {
  const res = await fetch('/api/pricing', { cache: 'no-store' });
  if (!res.ok) throw new Error('failed to fetch pricing');
  return await res.text();
}
export async function health(): Promise<{status: string}> {
  const res = await fetch('/api/healthz', { cache: 'no-store' });
  if (!res.ok) throw new Error('failed health');
  return res.json();
}
export async function getModels(): Promise<string[]> {
  try {
    const res = await fetch('http://vllm.production.svc.cluster.local:8000/v1/models', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data?.data)) return data.data.map((m:any)=>m.id || m.name).filter(Boolean);
    return [];
  } catch { return []; }
}
