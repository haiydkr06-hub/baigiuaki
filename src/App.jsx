import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DanhSachMon from './components/DanhSachMon';
import GioHang from './components/GioHang';
import FormDatMon from './components/FormDatMon';
import Khung from './components/Khung';
import useLocalStorage from './hooks/useLocalStorage';

const initialDsMon = [
  { id: 1, tenMon: 'Bún bò Huế', gia: 45000, moTa: 'Bún bò đặc sản đậm đà', daHet: false },
  { id: 2, tenMon: 'Bánh bột lọc', gia: 30000, moTa: 'Bánh bột lọc nhân tôm thịt', daHet: true },
  { id: 3, tenMon: 'Chè bắp', gia: 15000, moTa: 'Chè bắp Cồn Hến ngọt thơm', daHet: true },
  { id: 4, tenMon: 'Bánh nậm', gia: 30000, moTa: 'Bánh nậm lá dong truyền thống', daHet: false },
  { id: 5, tenMon: 'Bánh khoái', gia: 35000, moTa: 'Bánh khoái giòn rụm kèm nước lèo', daHet: false },
  { id: 6, tenMon: 'Cơm hến', gia: 25000, moTa: 'Cơm hến cay nồng chuẩn vị', daHet: false },
  { id: 7, tenMon: 'Bún hến', gia: 25000, moTa: 'Bún hến thanh mát, vừa ăn', daHet: false },
  { id: 8, tenMon: 'Chè hé', gia: 20000, moTa: 'Chè thập cẩm thơm ngon', daHet: false },
];

export default function App() {
  const [dsMon] = useState(initialDsMon);
  const [gio, setGio] = useLocalStorage('gio-hang', []);
  const [idDangChon, setIdDangChon] = useState(null);
  
  // C4.3: State hiển thị thông báo thành công & key để reset form
  const [thongBao, setThongBao] = useState('');
  const [formKey, setFormKey] = useState(0);

  const tenQuan = import.meta.env.VITE_TEN_QUAN || 'Quán Huế';
  const tongPhan = gio.reduce((sum, item) => sum + item.soLuong, 0);

  // C4.3: choPhepGui = giỏ có ít nhất một món
  const choPhepGui = gio.length > 0;

  useEffect(() => {
    if (tongPhan > 0) {
      document.title = `(${tongPhan}) ${tenQuan}`;
    } else {
      document.title = tenQuan;
    }
  }, [tongPhan, tenQuan]);

  const datMon = (id) => {
    setGio((prevGio) => {
      const tonTai = prevGio.find((item) => item.id === id);
      if (tonTai) {
        return prevGio.map((item) =>
          item.id === id ? { ...item, soLuong: item.soLuong + 1 } : item
        );
      }
      return [...prevGio, { id, soLuong: 1 }];
    });
  };

  // C4.2: Xóa giỏ hàng
  const xoaGioHang = () => {
    setGio([]);
  };

  // C4.3: Hàm xử lý gửi đơn hàng
  const guiDon = (thongTinNguoiDung) => {
    // 1. Hiện thông báo "Đã nhận đơn của <Họ tên>"
    setThongBao(`Đã nhận đơn của ${thongTinNguoiDung.hoTen}`);
    
    // 2. Làm rỗng giỏ hàng
    setGio([]);
    
    // 3. Đặt lại form (các ô trở về trống) bằng cách đổi key
    setFormKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="app">
      <Header tongPhan={tongPhan} />

      <main className="container" style={{ display: 'flex', gap: '24px', padding: '20px' }}>
        <section style={{ flex: 2 }}>
          <h2>Thực đơn</h2>
          <DanhSachMon
            dsMon={dsMon}
            dangChon={idDangChon}
            onChon={(id) => setIdDangChon(id)}
            onDat={datMon}
          />
        </section>

        <aside style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* C4.2: Khung Giỏ hàng có truyền prop hanhDong là nút "Xóa giỏ hàng" */}
          <Khung
            tieuDe="Giỏ hàng"
            hanhDong={
              gio.length > 0 ? (
                <button onClick={xoaGioHang} className="btn-xoa">
                  Xóa giỏ hàng
                </button>
              ) : null
            }
          >
            <GioHang gio={gio} dsMon={dsMon} />
          </Khung>

          {/* Khung Đặt món */}
          <Khung tieuDe="Thông tin đặt hàng">
            {/* C4.3: Hiển thị thông báo khi đã gửi đơn */}
            {thongBao && <p role="status" className="thong-bao-thanh-cong">{thongBao}</p>}

            {/* C4.3: Truyền key để reset form khi đổi key */}
            <FormDatMon
              key={formKey}
              onGui={guiDon}
              choPhepGui={choPhepGui}
            />
          </Khung>
        </aside>
      </main>
    </div>
  );
}