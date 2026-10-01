import React, { useState, useEffect, useRef } from 'react';

// Giữ nguyên hàm kiemTra có sẵn của đề bài
function kiemTra(formData) {
  const loi = {};
  if (!formData.hoTen.trim()) {
    loi.hoTen = 'Vui lòng nhập họ tên';
  }
  if (!formData.soDienThoai.trim()) {
    loi.soDienThoai = 'Vui lòng nhập số điện thoại';
  } else if (!/^\d{10}$/.test(formData.soDienThoai.trim())) {
    loi.soDienThoai = 'Số điện thoại phải gồm đúng 10 chữ số';
  }
  return loi;
}

export default function FormDatMon({ onGui, choPhepGui }) {
  const hoTenRef = useRef(null);

  // C4.1: State cho các trường trong form
  const [formData, setFormData] = useState({
    hoTen: '',
    soDienThoai: '',
    ghiChu: '',
  });

  // C4.1: State lưu lỗi của từng ô
  const [loi, setLoi] = useState({});

  // C3.4: Tự động focus ô Họ tên khi form xuất hiện
  useEffect(() => {
    if (hoTenRef.current) {
      hoTenRef.current.focus();
    }
  }, []);

  // Hàm xử lý khi gõ văn bản
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // C4.1: Kiểm tra từng ô khi rời ô (onBlur)
  const handleBlur = (e) => {
    const { name } = e.target;
    const danhSachLoi = kiemTra(formData);
    setLoi((prev) => ({
      ...prev,
      [name]: danhSachLoi[name] || '',
    }));
  };

  // C4.1: Xử lý khi gửi form (onSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra tất cả các ô khi gửi
    const danhSachLoi = kiemTra(formData);
    setLoi(danhSachLoi);

    // Nếu còn lỗi -> Chặn gửi và KHÔNG gọi onGui
    if (Object.keys(danhSachLoi).length > 0) {
      return;
    }

    // Gửi hợp lệ: cắt khoảng trắng hai đầu và gọi onGui
    onGui({
      hoTen: formData.hoTen.trim(),
      soDienThoai: formData.soDienThoai.trim(),
      ghiChu: formData.ghiChu.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-dat-mon">
      <div className="form-group">
        <label htmlFor="hoTen">Họ tên</label>
        <input
          ref={hoTenRef}
          id="hoTen"
          name="hoTen"
          type="text"
          value={formData.hoTen}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Nhập họ tên..."
        />
        {loi.hoTen && (
          <p className="loi" role="alert">
            {loi.hoTen}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="soDienThoai">Số điện thoại</label>
        <input
          id="soDienThoai"
          name="soDienThoai"
          type="text"
          value={formData.soDienThoai}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Nhập số điện thoại..."
        />
        {loi.soDienThoai && (
          <p className="loi" role="alert">
            {loi.soDienThoai}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="ghiChu">Ghi chú</label>
        <textarea
          id="ghiChu"
          name="ghiChu"
          value={formData.ghiChu}
          onChange={handleChange}
          placeholder="Nhập ghi chú (không bắt buộc)..."
        ></textarea>
      </div>

      {/* C4.3: Chỉ bấm được khi choPhepGui === true */}
      <button type="submit" disabled={!choPhepGui}>
        Gửi đơn
      </button>
    </form>
  );
}