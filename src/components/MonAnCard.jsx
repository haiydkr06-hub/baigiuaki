import React from 'react';

export default function MonAnCard({ mon, dangChon, onChon, onDat }) {
  const isSelected = dangChon === mon.id;
  const dinhDangGia = (gia) => new Intl.NumberFormat('vi-VN').format(gia) + ' đ';

  const handleDatClick = (e) => {
    // C2.4: Ngăn nổi bọt sự kiện để không làm đổi món đang chọn
    e.stopPropagation();
    if (!mon.daHet) {
      onDat(mon.id);
    }
  };

  return (
    <article 
      className={`mon-an-card ${isSelected ? 'dang-chon' : ''}`}
      onClick={() => onChon(mon.id)}
    >
      <h3>{mon.tenMon}</h3>
      <p className="mo-ta">{mon.moTa}</p>
      <p className="gia">{dinhDangGia(mon.gia)}</p>

      {mon.daHet && <span className="het-mon">Hết món</span>}

      <div className="card-actions">
        {/* Chỉ giữ duy nhất nút "Đặt món" chuẩn quy ước */}
        <button 
          onClick={handleDatClick} 
          disabled={mon.daHet}
        >
          Đặt món
        </button>
      </div>
    </article>
  );
}