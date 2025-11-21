
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Movements from './Movements';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ background: '#263859', color: '#fff', padding: '24px 0', textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
        <img src="https://img.icons8.com/ios-filled/50/ffffff/money.png" alt="Logo" style={{ verticalAlign: 'middle', marginRight: 12 }} />
        <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: 2 }}>Financeiro Seguro</span>
        <div style={{ fontSize: 16, fontWeight: 400, marginTop: 8, opacity: 0.8 }}>Seu controle financeiro confiável</div>
      </header>
      <main style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0002', padding: 32, marginBottom: 32 }}>
          <Movements addTransaction={addTransaction} />
        </div>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0002', padding: 32 }}>
          <Dashboard transactions={transactions} />
        </div>
      </main>
      <footer style={{ textAlign: 'center', color: '#888', padding: 16, fontSize: 14 }}>
        &copy; {new Date().getFullYear()} Financeiro Seguro. Todos os direitos reservados.
      </footer>
    </div>
  );
}
