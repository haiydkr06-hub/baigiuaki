import React from 'react';

export default function Header({ tongPhan }) {
  const tenQuan = import.meta.env.VITE_TEN_QUAN || 'Quán Huế';

  return (
    <header className="header">
      <h1>{tenQuan}</h1>
      {/* QUY ƯỚC: data-testid="tong-phan" */}
      <span data-testid="tong-phan">{tongPhan}</span>
    </header>
  );
}