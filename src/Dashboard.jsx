

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ transactions }) {
  const saldo = transactions.reduce((acc, t) => acc + (t.type === 'entrada' ? t.value : -t.value), 0);
  const entradas = transactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.value, 0);
  const saidas = transactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + t.value, 0);

  const data = {
    labels: ['Entradas', 'Saídas', 'Saldo'],
    datasets: [
      {
        label: 'R$',
        data: [entradas, saidas, saldo],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h2 style={{ color: '#263859', fontWeight: 700, marginBottom: 24 }}>Resumo Financeiro</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ background: '#e8f5e9', borderRadius: 8, padding: 16, minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
          <div style={{ color: '#388e3c', fontWeight: 600 }}>Entradas</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>R$ {entradas.toFixed(2)}</div>
        </div>
        <div style={{ background: '#ffebee', borderRadius: 8, padding: 16, minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
          <div style={{ color: '#d32f2f', fontWeight: 600 }}>Saídas</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>R$ {saidas.toFixed(2)}</div>
        </div>
        <div style={{ background: '#e3f2fd', borderRadius: 8, padding: 16, minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
          <div style={{ color: '#1976d2', fontWeight: 600 }}>Saldo</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>R$ {saldo.toFixed(2)}</div>
        </div>
      </div>
      <div style={{ background: '#f4f6f8', borderRadius: 12, padding: 24 }}>
        <Bar data={data} options={{ plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
}
