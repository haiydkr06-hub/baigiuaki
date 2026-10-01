import React from 'react';
import MonAnCard from './MonAnCard';

export default function DanhSachMon({ dsMon, dangChon, onChon, onDat }) {
  return (
    <div className="danh-sach-mon">
      {dsMon.map((mon) => (
        <MonAnCard
          key={mon.id}
          mon={mon}
          dangChon={dangChon}
          onChon={onChon}
          onDat={onDat}
        />
      ))}
    </div>
  );
}