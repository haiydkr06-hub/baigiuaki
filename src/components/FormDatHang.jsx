import React, { useState, useEffect, useRef } from 'react';

export default function FormDatHang({ mon, onXacNhanDat }) {
  const [formData, setFormData] = useState({
    tenKhachHang: '',
    soDienThoai: '',
    ghiChu: ''
  });

  const inputTenRef = useRef(null);

  useEffect(() => {
    if (inputTenRef.current) {
      inputTenRef.current.focus();
    }
  }, [mon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tenKhachHang || !formData.soDienThoai) {
      alert('Vui lòng nhập Tên và Số điện thoại!');
      return;
    }
    onXacNhanDat({ ...formData, mon });
  };

  if (!mon) return <p style={{ fontStyle: 'italic', color: '#666' }}>Vui lòng chọn một món ăn để đặt hàng.</p>;

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #2563eb', padding: '16px', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, color: '#1e40af' }}>ĐẶT MÓN: {mon.tenMon}</h3>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Tên khách hàng:</label>
        <input
          ref={inputTenRef}
          type="text"
          name="tenKhachHang"
          value={formData.tenKhachHang}
          onChange={handleChange}
          style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Số điện thoại:</label>
        <input
          type="text"
          name="soDienThoai"
          value={formData.soDienThoai}
          onChange={handleChange}
          style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Ghi chú:</label>
        <input
          type="text"
          name="ghiChu"
          value={formData.ghiChu}
          onChange={handleChange}
          style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
        />
      </div>
      <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
        Xác nhận đặt
      </button>
    </form>
  );
}