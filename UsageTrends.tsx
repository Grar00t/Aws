'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function UsageTrends() {
  const data = {
    labels: Array.from({length: 12}, (_,i)=>`WK${i+1}`),
    datasets: [
      { label: 'Token (M)', data: [1.2,1.1,1.4,1.6,1.5,1.8,2.0,2.2,2.1,2.4,2.6,2.8] }
    ]
  };
  const options = { responsive: true, plugins: { legend: { display: true } } };
  return <div className="card p-4"><Line data={data as any} options={options as any} /></div>;
}
