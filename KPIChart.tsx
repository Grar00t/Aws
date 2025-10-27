'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function KPIChart() {
  const data = {
    labels: ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],
    datasets: [
      { label: 'p95 API (ms)', data: [220,210,205,190,185,180,175] },
    ]
  };
  const options = { responsive: true, plugins: { legend: { display: true } } };
  return <div className="card p-4"><Line data={data as any} options={options as any} /></div>;
}
