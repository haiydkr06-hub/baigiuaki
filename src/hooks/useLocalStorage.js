import { useState, useEffect } from 'react';

export default function useLocalStorage(khoa, giaTriDau) {
  // Khởi tạo lười (lazy initialization) + try-catch xử lý dữ liệu hỏng
  const [giaTri, setGiaTri] = useState(() => {
    try {
      const item = window.localStorage.getItem(khoa);
      return item ? JSON.parse(item) : giaTriDau;
    } catch (error) {
      return giaTriDau;
    }
  });

  // Ghi vào localStorage mỗi khi khoa hoặc giaTri thay đổi
  useEffect(() => {
    try {
      window.localStorage.setItem(khoa, JSON.stringify(giaTri));
    } catch (error) {
      console.error(error);
    }
  }, [khoa, giaTri]);

  return [giaTri, setGiaTri];
}