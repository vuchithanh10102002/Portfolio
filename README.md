# Vũ Chí Thành Portfolio — ReactJS

Portfolio cá nhân dạng **static site**, dựng bằng React + Vite, giao diện / bố cục /
hiệu ứng theo template "Tunis" bản dark.

## Chạy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # xuất site tĩnh vào dist/
npm run preview  # xem thử dist/
```

## Sửa nội dung

Mọi chữ và đường dẫn ảnh nằm trong **`src/data/portfolioData.js`**.
Ảnh nằm trong **`public/img/`** (hiện là placeholder — xem `PROGRESS.md` để biết
kích thước cần dùng cho từng ảnh).

## Điểm cần biết

- **Không có router.** 5 "trang" đều nằm trong DOM; điều hướng chỉ đổi
  `.page--current` kèm animation 3 lớp. Vì vậy không có URL riêng cho từng trang
  và nút Back của trình duyệt không chuyển trang — giống hệt bản gốc.
- **Form liên hệ chưa gửi thật** (site tĩnh, không có backend). Xem `Contact.jsx`.
- **Style switcher** ở góc trái là panel demo, xoá được.
- Bootstrap 4.6 được dùng cho grid + utility class, do markup gốc dựa vào nó
  (`col-*`, `text-left`, `d-none d-lg-block`...).

Chi tiết tiến trình, những gì đã kiểm tra và việc còn lại: **`PROGRESS.md`**.
