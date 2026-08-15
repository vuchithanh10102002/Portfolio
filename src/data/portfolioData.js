/* ==========================================================================
   All site content lives here - edit this file to make the portfolio yours.
   Images come from the `public/` folder: asset('img/foo.jpg') resolves to
   public/img/foo.jpg, and stays correct even when the site is deployed under a
   subfolder (set `base` in vite.config.js for that case).
   ========================================================================== */

const asset = (path) =>
  `${import.meta.env.BASE_URL}${path}`.replace(/([^:])\/{2,}/g, "$1/");

export const profile = {
  firstName: "Vũ Chí",
  lastName: "Thành",
  role: "software engineer",
  intro:
    "I'm a fullstack developer based in Hanoi with 3+ years of experience building web and mobile applications with PHP, CakePHP, Reactjs, Nodejs, Next.js, React Native and Flutter. I focus on RESTful APIs, SEO optimisation and business applications that stay fast as they grow.",
  desktopImage: asset("img/avatar.jpg"),
  mobileImage: asset("img/avatar.jpg"),
  cvUrl: asset("cv/VuChiThanh-CV.pdf"),
};

export const personalInfo = [
  { label: "Fullname", value: "Vũ Chí Thành" },
  { label: "Age", value: "23 Years" },
  { label: "Email", value: "vuchithanh10102002@gmail.com" },
  { label: "Phone", value: "0981672709" },
  { label: "Nationality", value: "Vietnamese" },
  { label: "Address", value: "Hanoi, Vietnam" },
  { label: "Degree", value: "Software Engineering" },
  { label: "Langages", value: "Vietnamese, English" },
];

export const stats = [
  { value: 3, label: "years of", label2: "experience" },
  { value: 5, label: "key", label2: "projects" },
  { value: 14, label: "technologies", label2: "used" },
  { value: 550, label: "TOEIC", label2: "score" },
];

/* Logos live in public/img/skills/ as SVG (from the devicon project). To add a
   skill, drop its SVG in that folder and point `logo` at it.                  */
export const skills = [
  /* Backend */
  { name: "php", logo: asset("img/skills/php.svg") },
  { name: "cakephp", logo: asset("img/skills/cakephp.svg") },
  { name: "node.js", logo: asset("img/skills/nodejs.svg") },
  /* Frontend & mobile — React Native ships no logo of its own, it uses React's */
  { name: "javascript", logo: asset("img/skills/javascript.svg") },
  { name: "react.js", logo: asset("img/skills/react.svg") },
  { name: "next.js", logo: asset("img/skills/nextjs.svg") },
  { name: "react native", logo: asset("img/skills/react.svg") },
  { name: "flutter", logo: asset("img/skills/flutter.svg") },
  /* Data */
  { name: "mysql", logo: asset("img/skills/mysql.svg") },
  { name: "postgresql", logo: asset("img/skills/postgresql.svg") },
  { name: "mongodb", logo: asset("img/skills/mongodb.svg") },
  { name: "elasticsearch", logo: asset("img/skills/elasticsearch.svg") },
  { name: "redis", logo: asset("img/skills/redis.svg") },
  /* Tools */
  { name: "docker", logo: asset("img/skills/docker.svg") },
];

/* An entry renders `bullets` as a list when present, otherwise `description`. */
export const experience = [
  {
    time: "Jul 2023 - Present",
    title: "Software Engineer (Full-time)",
    place: "WebPX Software Co., Ltd.",
    bullets: [
      "Developed and maintained enterprise web applications, CRM systems, eCommerce platforms, and mobile applications.",
      "Participated in the development of WebPX ecosystem products including CRM, AI Chatbot, LiveChat, Marketing Automation, HRM, and Financial Management systems.",
      "Built and maintained RESTful APIs, integrated third-party services, and optimized system performance.",
      "Worked across frontend and backend using CakePHP, Next.js, React Native, Flutter, and Node.js.",
    ],
  },
];

export const education = [
  {
    time: "Oct 2020 - Oct 2024",
    title: "Software Engineering",
    place: "Thủy Lợi University",
    description:
      "Bachelor's degree in Software Engineering. Graduated with Good grade.",
  },
  {
    time: "2024",
    title: "TOEIC 550",
    place: "Certification",
    description: "English proficiency certification.",
  },
];

/* Portfolio projects.
   `media` decides what the lightbox renders:
     { type: 'image',    src }
     { type: 'youtube',  id }
     { type: 'video',    src, poster }
     { type: 'carousel', images: [] }                                        */
export const projects = [
  {
    title: "WebPX Ecosystem",
    thumb: asset("img/projects/Frame 1.png"),
    kind: "Ecosystem",
    client: "WebPX Software Co., Ltd.",
    languages: "CakePHP 4, MySQL, HTML, JS, CSS,...",
    previewLabel: "Webpx",
    previewUrl: "https://webpx.vn/",
    media: { type: "image", src: asset("img/projects/Frame 2.png") },
  },
  {
    title: "Shoplite",
    thumb: asset("img/projects/Frame 25.png"),
    kind: "Individual",
    client: "Shoplite",
    languages: "Node.js, TypeScript, PostgreSQL, Redis, Docker, Reactjs, Vite",
    previewLabel: "Shoplite",
    previewUrl: "https://github.com/vuchithanh10102002/SHOPLITE",
    media: { type: "image", src: asset("img/projects/Frame 25.png") },
  },
  {
    title: "DBV Insurance Website",
    thumb: asset("img/projects/Frame 3.png"),
    kind: "Website",
    client: "DBV Insurance",
    languages: "Next.js, API Routes, SEO",
    previewLabel: "DBV",
    previewUrl: "https://dbvi.com.vn/",
    media: { type: "image", src: asset("img/projects/Frame 3.png") },
  },
  {
    title: "G-Finance Web",
    thumb: asset("img/projects/Frame 4.png"),
    kind: "Website",
    client: "WebPX Software Co., Ltd.",
    languages: "CakePHP 4, RESTful API, HTML, CSS, JS",
    previewLabel: "Gfin",
    previewUrl: "https://gfindev.webpx.io.vn/",
    media: { type: "image", src: asset("img/projects/Frame 4.png") },
  },
  {
    title: "G-Finance App",
    thumb: asset("img/projects/Frame 8.png"),
    kind: "Mobile App",
    client: "WebPX Software Co., Ltd.",
    languages: "Flutter, CakePHP 4, RESTful API",
    previewLabel: "Gfin",
    previewUrl: "#",
    media: { type: "image", src: asset("img/projects/Frame 8.png") },
  },
  {
    title: "TAT Golf",
    thumb: asset("img/projects/Frame 19.png"),
    kind: "Website",
    client: "TAT Golf",
    languages: "CakePHP 2, Elasticsearch, CRM",
    previewLabel: "tatgolf.vn",
    previewUrl: "https://tatgolf.vn",
    media: { type: "image", src: asset("img/projects/Frame 20.png") },
  },
  {
    title: "TAT Pick",
    thumb: asset("img/projects/Frame 22.png"),
    kind: "Website",
    client: "TAT Pick",
    languages: "CakePHP 2, Elasticsearch, CRM",
    previewLabel: "tatpick.vn",
    previewUrl: "https://tatpick.vn",
    media: { type: "image", src: asset("img/projects/Frame 22.png") },
  },
  {
    title: "Perfume",
    thumb: asset("img/projects/Frame 9.png"),
    kind: "Website",
    client: "Perfume",
    languages: "CakePHP 2, CRM",
    previewLabel: "nuochoawb",
    previewUrl: "https://nuochoawb.webpx.com.vn/",
    media: { type: "image", src: asset("img/projects/Frame 10.png") },
  },
  {
    title: "Nhẫn Lopa mosa",
    thumb: asset("img/projects/Frame 12.png"),
    kind: "Website",
    client: "Nhẫn Lopa mosa",
    languages: "CakePHP 2, CRM",
    previewLabel: "lopamosa",
    previewUrl: "https://lopamosa.webpx.com.vn/",
    media: { type: "image", src: asset("img/projects/Frame 14.png") },
  },
  {
    title: "Publicbank",
    thumb: asset("img/projects/Frame 17.png"),
    kind: "Website",
    client: "Publicbank",
    languages: "CakePHP 2",
    previewLabel: "Publicbank",
    previewUrl: "https://lopamosa.webpx.com.vn/",
    media: { type: "image", src: asset("img/projects/Frame 17.png") },
  },
  {
    title: "Viện dưỡng lão Thiên Ân",
    thumb: asset("img/projects/Frame 29.png"),
    kind: "Website",
    client: "Viện dưỡng lão Thiên Ân",
    languages: "CakePHP 4",
    previewLabel: "Thiên Ân",
    previewUrl: "https://thienanwp.webpx.com.vn/",
    media: { type: "image", src: asset("img/projects/Frame 29.png") },
  },
  {
    title: "Ifood",
    thumb: asset("img/projects/Frame 31.png"),
    kind: "Website",
    client: "Ifood",
    languages: "CakePHP 4, CRM",
    previewLabel: "Ifood",
    previewUrl: "https://foodsvietnam.com/",
    media: { type: "image", src: asset("img/projects/Frame 31.png") },
  },
  {
    title: "Autovnn",
    thumb: asset("img/projects/Frame 32.png"),
    kind: "Website",
    client: "Autovnn",
    languages: "CakePHP 4",
    previewLabel: "Autovnn",
    previewUrl: "https://autovnn.com/",
    media: { type: "image", src: asset("img/projects/Frame 32.png") },
  },
];

export const contact = {
  email: "vuchithanh10102002@gmail.com",
  phone: "+84 981 672 709",
  socials: [
    {
      name: "Facebook",
      icon: "fa-facebook",
      url: "https://www.facebook.com/thanh.vu.693192",
    },
    {
      name: "Github",
      icon: "fa-github",
      url: "https://github.com/vuchithanh10102002",
    },
  ],
};

export const posts = [
  {
    title: "How to Own Your Audience by Creating an Email List",
    image: asset("img/blog/blog-post-1.jpg"),
    excerpt:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
    url: "#",
  },
  {
    title: "Top 10 Toolkits for Deep Learning in 2020",
    image: asset("img/blog/blog-post-2.jpg"),
    excerpt:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
    url: "#",
  },
  {
    title: "Everything You Need to Know About Web Accessibility",
    image: asset("img/blog/blog-post-3.jpg"),
    excerpt:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
    url: "#",
  },
  {
    title: "How to Inject Humor & Comedy Into Your Brand",
    image: asset("img/blog/blog-post-4.jpg"),
    excerpt:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
    url: "#",
  },
  {
    title: "Women in Web Design: How To Achieve Success",
    image: asset("img/blog/blog-post-5.jpg"),
    excerpt:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
    url: "#",
  },
  {
    title: "Evergreen versus topical content: An overview",
    image: asset("img/blog/blog-post-6.jpg"),
    excerpt:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
    url: "#",
  },
];
