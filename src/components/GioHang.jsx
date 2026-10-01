import React, { useMemo } from 'react';

export default function GioHang({ gio = [], dsMon = [] }) {
  const dinhDangGia = (gia) => new Intl.NumberFormat('vi-VN').format(gia) + ' đ';

  // C3.1: Dùng useMemo tính tongTien, chỉ tính lại khi gio hoặc dsMon đổi
  const tongTien = useMemo(() => {
    return gio.reduce((sum, item) => {
      const mon = dsMon.find((m) => m.id === item.id);
      return sum + (mon ? mon.gia * item.soLuong : 0);
    }, 0);
  }, [gio, dsMon]);

  return (
    // Quy ước: data-testid="gio-hang" ở vùng ngoài cùng
    <div data-testid="gio-hang" className="gio-hang">
      <h2>Giỏ hàng</h2>

      {gio.length === 0 ? (
        /* Quy ước: Hiển thị đúng chữ "Giỏ hàng trống" khi giỏ rỗng */
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul>
            {gio.map((item) => {
              const mon = dsMon.find((m) => m.id === item.id);
              if (!mon) return null;
              const thanhTien = mon.gia * item.soLuong;
              return (
                /* Quy ước: "Tên × số lượng — thành tiền" */
                <li key={item.id}>
                  {mon.tenMon} × {item.soLuong} — {dinhDangGia(thanhTien)}
                </li>
              );
            })}
          </ul>

          {/* Quy ước: Tổng tiền trong thẻ data-testid="tong-tien" */}
          <div className="tong-tien">
            Tổng tiền: <strong data-testid="tong-tien">{dinhDangGia(tongTien)}</strong>
          </div>
        </>
      )}
    </div>
  );
}