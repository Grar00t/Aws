'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function AIPerformanceGraph() {
  const data = {
    labels: ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],
    datasets: [
      { label: 'p95 AI (s)', data: [3.4, 3.2, 3.1, 2.9, 2.8, 2.7, 2.6] }
    ]
  };
  const options = { responsive: true, plugins: { legend: { display: true } } };
  return <div className="card p-4"><Line data={data as any} options={options as any} /></div>;
}
