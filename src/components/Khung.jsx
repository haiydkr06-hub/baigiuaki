import React from 'react';

export default function Khung({ tieuDe, hanhDong, children }) {
  return (
    <div className="khung">
      <div className="khung-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{tieuDe}</h2>
        {/* C4.2: Hiển thị prop hanhDong cạnh tiêu đề nếu có */}
        {hanhDong && <div className="khung-hanh-dong">{hanhDong}</div>}
      </div>
      <div className="khung-noi-dung">{children}</div>
    </div>
  );
}