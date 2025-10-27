'use client';
import { useState } from 'react';

export function TenantSelector() {
  const [tenant, setTenant] = useState('default');
  return (
    <div className="card px-3 py-2">
      <label className="text-sm opacity-80 mr-2">المستأجر:</label>
      <select className="bg-transparent outline-none" value={tenant} onChange={e=>setTenant(e.target.value)}>
        <option value="default">الافتراضي</option>
        <option value="gov">حكومي</option>
        <option value="edu">تعليمي</option>
      </select>
    </div>
  );
}
