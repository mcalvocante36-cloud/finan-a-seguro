
import React, { useState } from 'react';

export default function Movements({ addTransaction }) {
  const [type, setType] = useState('entrada');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || isNaN(value) || parseFloat(value) <= 0) return;
    addTransaction({ type, value: parseFloat(value) });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ fontWeight: 500, color: '#263859' }}>
          Tipo:
          <select value={type} onChange={e => setType(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6, border: '1px solid #ccc', background: '#f4f6f8' }}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </label>
        <label style={{ fontWeight: 500, color: '#263859' }}>
          Valor:
          <input type="number" value={value} onChange={e => setValue(e.target.value)} min="0" step="0.01" style={{ marginLeft: 8, padding: 6, borderRadius: 6, border: '1px solid #ccc', width: 120, background: '#f4f6f8' }} />
        </label>
        <button type="submit" style={{ background: '#263859', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }}>
          <span style={{ verticalAlign: 'middle', marginRight: 6 }}>+</span> Adicionar
        </button>
      </div>
    </form>
  );
}
