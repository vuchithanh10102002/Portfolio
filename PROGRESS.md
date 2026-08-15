# Tiến trình dự án

Portfolio ReactJS (static) dựng lại giao diện, bố cục, hiệu ứng của
`https://slimhamdi.net/tunis/demos/dark.html` (template "Tunis" — bản dark).

Cập nhật lần cuối: 2026-08-09

---

## Trạng thái: hoàn thành phần dựng lại giao diện

| Hạng mục | Trạng thái |
| --- | --- |
| Scaffold Vite + React 18 | Xong |
| Port toàn bộ CSS (style, component, circle, skins) | Xong |
| 5 trang: Home, About, Portfolio, Contact, Blog | Xong |
| Preloader (vạch dọc + màn chẻ đôi) | Xong |
| Chuyển trang "revealer" 3 lớp, 8 hướng | Xong |
| Masonry grid portfolio | Xong |
| Hover đổi hướng theo con trỏ (hoverdir) | Xong |
| Lightbox 3D slideshow (ảnh / YouTube / video / carousel) | Xong |
| Vòng tròn % kỹ năng | Xong |
| Style switcher: 10 màu + dark/light + hướng chuyển trang | Xong |
| Menu mobile (burger + panel trượt) | Xong, đã kiểm tra ở 430px và 768px |
| Build production `npm run build` | Xong, chạy được |

---

## Đã kiểm tra bằng browser

Chạy trên `localhost` và so sánh trực tiếp với trang gốc:

- Home: bố cục, khối màu chéo, ảnh bo góc, nav tròn bên phải — khớp
- About: personal info, box stats, vòng tròn kỹ năng, resume timeline — khớp
- Portfolio: masonry 3 cột đúng thứ tự, panel hover trượt theo hướng chuột — khớp
- Lightbox: slide bên cạnh hé ra ở rìa (3D `translateZ(-150px)`), prev/next/close,
  điều hướng bằng bàn phím (←/→/Esc), YouTube embed — khớp
- Contact + Blog: khớp
- Đổi màu accent và dark/light theme: hoạt động
- Build production: ảnh load đủ, không lỗi console

### Layout mobile — đã kiểm tra (2026-07-28)

Kiểm tra bằng cách nhúng site vào iframe rộng cố định (media query bên trong
iframe phản ứng theo kích thước iframe).

Ở **430px** (điện thoại):
- Home: nội dung canh giữa theo chiều dọc, chữ căn trái, burger góc phải trên.
  Không có ảnh đại diện — đúng bản gốc (`d-none d-sm-block`, ảnh chỉ hiện từ 576px).
- Menu burger: mở full màn hình, 5 mục có icon + đường kẻ, mục đang chọn màu accent,
  nút burger biến thành dấu X.
- About: thanh tiêu đề fixed trên cùng, ảnh đại diện tròn 230px, info 2 cột
  (nhãn trên / giá trị dưới), stat boxes 2x2, vòng tròn kỹ năng 2 cột scale 0.8.
- Portfolio: 1 cột, panel hover tắt hẳn.
- Lightbox: full màn hình, thanh nav 62px trên cùng (prev trái / close giữa / next phải),
  chi tiết dự án xếp 1 cột, burger bị ẩn.
- Contact, Blog: 1 cột.

Ở **768px** (tablet):
- Home: ảnh đại diện tròn 270px, chữ và nút canh giữa.
- Portfolio: 2 cột, thứ tự trái→phải đúng.
- Thanh tiêu đề trang không fixed (chỉ fixed dưới 576px) — đúng bản gốc.

**Đã sửa 1 lỗi phát hiện trong lúc kiểm tra:** tôi đã thêm nhầm
`.home { height: auto }` cho `max-width: 991px`, làm nội dung trang chủ dồn lên
đỉnh màn hình thay vì canh giữa. Bản gốc giữ `height: 100vh` — đã bỏ override này.

Lưu ý về công cụ: trong iframe test, timeline animation của trình duyệt bị đóng
băng nên **transition CSS đứng yên ở giá trị đầu** (và transition ghi đè cả
`!important`). Đây là giới hạn của môi trường test, không phải lỗi code — khi mở
thật trên trình duyệt các hiệu ứng chạy bình thường.

---

## Cách chạy

```bash
cd C:\myproject\portfolio
npm install      # chỉ cần lần đầu
npm run dev      # http://localhost:5173
npm run build    # xuất ra dist/ — đây là site tĩnh để deploy
npm run preview  # xem thử bản build
```

Deploy: đẩy nguyên thư mục `dist/` lên Netlify / Vercel / GitHub Pages.
Nếu host trong subfolder (vd. `user.github.io/portfolio/`), sửa `base` trong
`vite.config.js` thành `'/portfolio/'`.

---

## Cấu trúc

```
src/
  data/portfolioData.js     <- TOÀN BỘ nội dung ở đây, sửa file này là đủ
  App.jsx                   <- điều phối chuyển trang
  components/
    Header.jsx              nav desktop (icon tròn) + nav mobile
    Home.jsx About.jsx Portfolio.jsx Contact.jsx Blog.jsx
    Slideshow.jsx           lightbox portfolio
    SkillCircle.jsx ResumeBox.jsx TitleSection.jsx
    Preloader.jsx StyleSwitcher.jsx
  hooks/
    useRevealer.js          hiệu ứng chuyển trang 3 lớp
    useHoverDir.js          hover theo hướng con trỏ
    useMasonry.js           xếp grid theo cột ngắn nhất
  styles/
    skins.css               biến màu (accent + dark/light)
    style.css               style chính
    pages.css               container trang + animation revealer
    circle.css              vòng tròn %
    switcher.css            panel đổi màu
public/img/                 ảnh placeholder
```

---

## Việc cần bạn làm tiếp

1. **Thay ảnh**: ghi đè các file trong `public/img/` bằng ảnh của bạn, giữ
   nguyên tên và tỉ lệ để layout không đổi:
   - `dark.jpg` — 746x1020 (ảnh chân dung trang chủ, desktop)
   - `img-mobile.jpg` — 300x300 (ảnh tròn, mobile)
   - `projects/project-1..9.jpg` — 895x552
   - `blog/blog-post-1..6.jpg` — 895x552
   - `projects/video.mp4` — **chưa có**, dự án số 4 dùng video local nên hiện chỉ
     hiện ảnh poster. Thêm file này hoặc đổi `media` của nó sang `type: 'image'`.
2. **Thay nội dung**: sửa `src/data/portfolioData.js` (tên, giới thiệu, kỹ năng,
   kinh nghiệm, dự án, bài viết, liên hệ).
3. **Form liên hệ**: hiện chỉ validate và hiện "Message Sent!" ở client, không gửi
   thật (site tĩnh nên không có backend). Nối vào Formspree / Netlify Forms trong
   `src/components/Contact.jsx` — chỗ đã ghi chú `onSubmit`.
4. **Style switcher**: là panel demo. Muốn bỏ thì xoá `<StyleSwitcher />` trong
   `src/App.jsx`, và đổi màu mặc định ở `--accent` trong `src/styles/skins.css`.

---

## Nhật ký

### 2026-08-09 — "sửa portfolioData mà không thấy đổi"

Kiểm tra 2 khả năng:

1. **`dist/` cũ** — có thật: build lúc 2026-07-28 15:13, còn `portfolioData.js`
   sửa lúc 2026-07-29 10:31, bundle cũ vẫn chứa "Steve" và không có "Vũ Chí".
   `dist/` **không** tự build lại. Đã chạy `npm run build`, bundle mới đã đúng.
2. **Dev server** — đang chạy sẵn ở `localhost:5173` (PID 10648). Fetch thử
   `http://localhost:5173/src/data/portfolioData.js` → **trả về đúng nội dung mới**.
   Vậy dev server không phải nguyên nhân, nó vẫn hot-reload bình thường.

**Nguyên nhân thật sự (nếu bạn đang xem localhost):** tên nằm ở **2 chỗ tách biệt**
trong `portfolioData.js`, sửa một chỗ không ảnh hưởng chỗ kia:

| Chỗ | Dòng | Hiện lên ở đâu | Giá trị hiện tại |
| --- | --- | --- | --- |
| `profile.firstName` / `lastName` | 12–13 | tiêu đề trang **Home** ("I'm ...") | Steve / Milner |
| `personalInfo[0]` / `[1]` | 23–24 | khối info trang **About** | Vũ Chí / Thành |

Đã đổi `personalInfo` nhưng chưa đổi `profile` → Home vẫn hiện "I'm Steve Milner".

Còn sót tên cũ: `contact.email` = `steve@mail.com`, `personalInfo` Skype
`steve.milner`, Nationality/Address = Tunis.

Quy tắc chung: sửa `portfolioData.js` xong thì `npm run dev` (F5 hoặc tự reload,
thấy ngay), hoặc `npm run build` lại trước khi xem `dist/`. Muốn `dist/` tự build
lại mỗi lần sửa thì chạy `npx vite build --watch`.

### 2026-08-09 — Nạp nội dung thật từ CV PDF

Nguồn: `VuChiThanh_FrontendEngineer_CV.pdf.pdf` (Vũ Chí Thành, Software Engineer).

PDF không có text layer đọc được bằng công cụ sẵn có (`pdftoppm` chưa cài; 2 ảnh
JPEG nhúng bên trong chỉ là mask bóng đổ). Đã bóc text bằng script Node tự viết:
inflate 189 stream FlateDecode + đọc ToUnicode CMap (89 entry). Script lưu ở
scratchpad, không nằm trong repo.

Đã thay trong `src/data/portfolioData.js`: `profile`, `personalInfo`, `stats`,
`skills`, `experience`, `education`, `projects`, `contact`.

CV đã copy sang `public/cv/VuChiThanh-CV.pdf`, nút "Download CV" ở trang About
trỏ vào đó (`profile.cvUrl`).

**Chỗ tôi tự suy ra, không có trong CV — cần bạn xác nhận:**

- `skills` phần trăm (php 90, cakephp 85, javascript 85, next.js 80,
  react native 75, flutter 70, node.js 65, mysql 80) — CV không cho số, tôi ước
  lượng theo thứ tự nhấn mạnh trong CV.
- `stats`: đổi 2 ô "Happy customers" / "Awards won" (không có dữ liệu) thành
  "technologies used" = 12 và "TOEIC score" = 550.
- `personalInfo`: bỏ ô "Skype" (CV không có) → thay bằng "Degree".
  Age 23 tính từ ngày sinh 10/10/2002.
- `contact.socials`: vẫn là `#`, CV không có link mạng xã hội.
- Tên dự án "G-Finance": trong PDF ligature "fi" bị mất nên bóc ra thành
  "G- nance". Tôi đoán là G-Finance.
- Dự án "TAT Golf / TAT Pick" trong CV là 1 mục, tôi tách thành 2 để lưới
  masonry đủ 5 ô.

**Chưa đụng tới:** ảnh dự án vẫn là placeholder `project-1..5.jpg`.

### 2026-08-09 — Ẩn trang Blog

Blog là mục cuối trong cả `NAV_ITEMS` (Header.jsx) và mảng `pages` (App.jsx), hai
mảng này ăn theo index nên bỏ mục cuối ở cả hai là xong, index của các trang còn
lại không đổi. Đã comment lại chỗ cần khôi phục ở cả hai file.

`src/components/Blog.jsx` và `posts` trong `portfolioData.js` **vẫn giữ nguyên**,
chỉ là không còn ai import — Vite tree-shake bỏ khỏi bundle (52 → 51 module,
170.28 kB → 167.65 kB). Muốn bật lại thì bỏ comment 2 chỗ đó.

CSS nav không phụ thuộc số lượng mục (`#mobile-nav li:last-child:after` tự xử lý)
nên không phải sửa gì thêm.

Đã kiểm tra bằng browser ở `localhost:5173`: nav còn 4 icon, Home / About /
Portfolio / Contact đều đúng dữ liệu CV, không có lỗi console.

**Còn 1 chỗ gợn:** CSS `.about .box-stats h3:after` gắn cứng dấu `+` sau mọi số,
nên ô TOEIC hiện ra "550+". Đúng về nghĩa nhưng đọc hơi lạ — muốn thì đổi ô đó
sang chỉ số khác, hoặc bỏ dấu `+` riêng cho ô cuối.

### 2026-08-09 — Bỏ trang Contact, dồn thông tin liên hệ vào About

Site giờ còn **3 trang**: Home, About, Portfolio.

Bỏ `contact` khỏi `NAV_ITEMS` và `pages` (lại là mục cuối nên index các trang còn
lại không đổi). Thêm khối "Get in touch" vào cuối `About.jsx`, sau phần
Experience & Education: đoạn giới thiệu, email, phone, 4 icon mạng xã hội.

CSS của trang contact cũ đều nằm dưới selector `.contact ...`, nên khối mới bọc
trong `<div className="row contact">` là dùng lại được nguyên si, không phải sửa
CSS cho từng selector. `.contact .main-content` không dính vì `main-content` là
tổ tiên chứ không phải con.

Email và phone giờ bấm được (`mailto:` / `tel:`). Bootstrap sẽ tô chúng màu xanh
mặc định nên đã thêm 2 rule: `color: inherit` trong `style.css`, và
`.contact .custom-span-contact a:hover` vào nhóm `var(--accent)` ở `skins.css`
để hover đổi theo màu skin.

**Đã bỏ luôn form liên hệ** — nó vốn không gửi được thật (site tĩnh, không có
backend, chỉ hiện "Message Sent!" ở client). Nếu bạn muốn giữ form thì nói,
tôi đưa lại vào About và nối vào Formspree / Netlify Forms.

`src/components/Contact.jsx` vẫn còn trên đĩa nhưng không ai import nữa
(50 module, bundle 166.01 kB).

Đã kiểm tra bằng browser: nav còn 3 icon, khối Get in touch hiện đúng ở cuối
About, icon màu accent, email/phone màu trắng và hover thành vàng, không lỗi console.

### 2026-08-09 — Thay vòng tròn % kỹ năng bằng logo công nghệ

Phần "My Skills" giờ hiện logo thay vì dial phần trăm — hợp lý hơn vì CV không hề
có số phần trăm nào, mấy con số cũ là tôi tự ước lượng.

Logo lấy từ dự án **devicon** (SVG màu gốc), tải một lần về
`public/img/skills/` chứ không link CDN lúc chạy — site vẫn hoạt động offline và
deploy đi đâu cũng được. 8 file, tổng ~14 KB.

Component mới `SkillLogo.jsx`. `SkillCircle.jsx` và các rule `.c100` trong
`circle.css` vẫn giữ nguyên, chỉ là không dùng nữa — muốn quay lại kiểu dial thì
đổi import trong `About.jsx` và trả `percent` về `skills`.

Trong `portfolioData.js`, `skills` đổi từ `{ name, percent }` sang
`{ name, logo }`.

Hai chỗ phải chỉnh riêng cho hợp nền tối:

- **Next.js**: logo gốc là hình tròn **đen**, trên nền `#111` gần như tàng hình.
  Đã đảo thành đĩa trắng chữ N đen (sửa trực tiếp trong `nextjs.svg`, có ghi chú).
- **PHP**: artwork chỉ chiếm ~52% chiều cao canvas 128×128 nên hiện ra bé hơn hẳn
  các logo khác. Đã crop `viewBox` xuống `0 28 128 72`, đồng thời cho khung ảnh
  rộng 76px / cao 56px để logo nằm ngang có chỗ nở ra, logo vuông vẫn bị chặn ở
  56px. Nhìn đã cân.

Hover: viền tròn đổi sang màu accent (`skins.css`) + logo phóng nhẹ 1.12. Không
dùng nền accent vì sẽ chọi với màu logo (nhất là JS vàng).

Đã kiểm tra bằng browser ở desktop: đủ 8 logo, hover đúng, không lỗi console.
**Chưa xem được ở mobile** — `resize_window` của extension không làm viewport co
lại, ảnh chụp vẫn ra 1568px. Rủi ro thấp: `.skill-logo` dùng đúng `scale(0.8)`
như `.c100` cũ và class lưới `col-6 col-md-3` không đổi.

### 2026-08-09 — Bổ sung 6 kỹ năng, tổng 14

Thêm React.js, MongoDB, PostgreSQL, Docker, Redis, Elasticsearch. Logo cũng lấy
từ devicon về `public/img/skills/` (13 file, ~36 KB).

`skills` giờ xếp theo nhóm có comment trong `portfolioData.js`: Backend (php,
cakephp, node.js) → Frontend & mobile (javascript, react.js, next.js, react
native, flutter) → Data (mysql, postgresql, mongodb, elasticsearch, redis) →
Tools (docker).

**React Native không có logo riêng** — chính thức nó dùng luôn logo React. Nên
2 ô "react.js" và "react native" trỏ chung `react.svg`, hiện ra 2 icon giống hệt
nhau. Đúng về mặt thương hiệu nhưng nhìn hơi trùng; muốn thì gộp làm 1 ô.

**Docker không có trong CV** (mục Tools của CV chỉ ghi Git, Bitbucket) — thêm vào
theo yêu cầu trực tiếp. 4 cái còn lại đều có trong mục Database của CV.

Lưới 14 ô = 4/4/4/2, hàng cuối hụt 2 ô. Muốn đều 4 hàng thì thêm Git + Bitbucket
(đều có trong CV) là tròn 16.

Logo Elasticsearch có thanh giữa màu `#343741`, gần sát nền `--surface` (#252525)
nên hơi chìm — vẫn đọc được hình, và đó là màu logo gốc nên tôi để nguyên.

### 2026-08-09 — Sửa lỗi: mục Experience bịa thêm 1 vị trí không có trong CV

Bạn hỏi lại và đúng là tôi sai. CV chỉ có **một** mục WORK EXPERIENCE:

> Jul 2023 - Present · WebPX Software Co., Ltd. · Software Engineer (Full-time)
> — 4 gạch đầu dòng.

Tôi đã tách 4 bullet đó thành 2 mục, và tự đặt tên mục thứ hai là
**"API & Performance"** — chức danh này không hề tồn tại trong CV. Lý do tôi làm
vậy chỉ là để cột Experience cân với cột Education (2 mục). Đó là bịa dữ liệu,
không phải quyết định trình bày.

Đã sửa: `experience` trở lại đúng 1 mục, chức danh đầy đủ "Software Engineer
(Full-time)", và 4 bullet giữ nguyên văn CV.

Để không phải nhồi bullet vào 1 đoạn văn, `ResumeBox.jsx` giờ nhận thêm trường
`bullets` (mảng) — có `bullets` thì render `<ul class="points">`, không thì vẫn
render `description` như cũ (Education đang dùng cách này).

CSS `.points` phải huỷ lại 3 rule kế thừa từ `.about .resume-box li`: thụt 60px,
margin 50px, và `:after` vẽ đường kẻ dọc timeline — nếu không mỗi bullet sẽ tự vẽ
một vạch dọc riêng. Chấm đầu dòng dùng `var(--accent)` qua `skins.css`.

**Rà lại các chỗ khác tôi từng tự suy ra:**

- `stats` "technologies used": sửa 12 → **14** cho khớp đúng số logo đang hiện.
  (Mục Technical Skills của CV liệt kê ~19 mục, con số 12 cũ không dựa trên gì cả.)
- `stats` "key projects" = 5: CV có **4** mục Key Projects, ra 5 là do tôi tách
  TAT Golf / TAT Pick thành 2. Khớp với số ô đang hiện ở trang Portfolio.
- `stats` "3 years of experience": khớp CV ("3+ years", Jul 2023 → nay).
- Mô tả chi tiết của 4 Key Projects trong CV **không hiện ở đâu cả** — thẻ dự án
  của template chỉ có kind / client / languages / preview, không có chỗ cho
  đoạn mô tả. Muốn hiện thì phải thêm trường vào `Slideshow.jsx`.
- `previewLabel` đang dùng không nhất quán: 3 dự án ghi khoảng thời gian, 2 dự án
  TAT ghi tên miền.

### 2026-08-09 — Cân nhắc rồi bỏ: mô tả dự án trong lightbox

Đã thử đưa `role` + 3 bullet KEY PROJECTS của CV vào caption lightbox, nhưng
**quyết định không làm** và revert sạch.

Lý do (bạn nêu ra, tôi đồng ý): đây là portfolio chứ không phải CV.

- Bullet trong CV chung chung, không phân biệt được dự án nào với dự án nào —
  ví dụ "Optimize system performance and database queries".
- CV gộp TAT Golf và TAT Pick làm một, nên 2 ô đó sẽ hiện 3 bullet **giống hệt
  nhau** — lướt qua 2 lightbox liền nhau thấy y chang.
- Chi tiết đã có sẵn trong CV, mà nút Download CV vốn có trên trang About.

Đã revert: `Slideshow.jsx`, `.project-notes` trong `style.css`, và `role`/`bullets`
trong 5 mục `projects`. Verify bằng cách grep bundle: không còn
"Fullstack Developer" / "Develop core modules" / "project-notes"; hash CSS trở về
đúng `index-CyPFfXJC.css` như trước khi sửa. Bullet của `experience` vẫn còn
nguyên (đó là bản sửa lỗi riêng, không liên quan).

Đã mở lightbox kiểm tra: caption về đúng title + 4 ô meta, không lỗi console.

---

## Lưu ý về bản quyền

Ảnh và video trên trang demo gốc là tài sản của template nên **không** được tải
về đây. Thay vào đó `public/img/` chứa ảnh placeholder tự sinh, đúng kích thước,
để bố cục giống hệt bản gốc — bạn thay bằng ảnh của mình.

Phần code là dựng lại từ đầu bằng React. Nếu bạn định dùng thương mại, nên mua
license template gốc trên ThemeForest cho chắc.
