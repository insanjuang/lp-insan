# CV Landing Page - Suga Maulana (React Version)

Landing page modern untuk curriculum vitae menggunakan React.js dengan fokus pada Backend Developer role.

## 🚀 Fitur

- **React.js** - Framework modern dengan component-based architecture
- **Vite** - Build tool yang cepat untuk development dan production
- **Responsive Design** - Tampil baik di desktop, tablet, dan mobile
- **Component-based** - Mudah di-maintain dan dikustomisasi
- **Modern UI** - Desain clean dan professional
- **Fast Loading** - Optimized untuk performa terbaik
- **SEO Friendly** - Struktur yang baik untuk search engine

## 📁 Struktur Project

```
cv-landing-page/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx      # Header dengan profile info
│   │   ├── About.jsx       # Section tentang saya
│   │   ├── Skills.jsx      # Keahlian teknis
│   │   ├── Experience.jsx  # Pengalaman kerja
│   │   ├── Education.jsx   # Pendidikan
│   │   ├── Projects.jsx    # Portfolio proyek
│   │   └── Footer.jsx      # Footer
│   ├── data/
│   │   └── cvData.js       # Data CV (mudah dikustomisasi)
│   ├── App.jsx             # Main App component
│   ├── App.css             # Styles utama
│   └── main.jsx            # Entry point
├── package.json
└── README.md
```

## 🛠️ Cara Menjalankan

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Installation

1. Clone atau download project
2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## 🎨 Cara Kustomisasi

### 1. Update Data Personal
Edit file `src/data/cvData.js`:

```javascript
export const cvData = {
  personal: {
    name: "Nama Anda",
    title: "Job Title Anda",
    location: "Lokasi Anda",
    email: "email@anda.com",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username"
  },
  // ... data lainnya
}
```

### 2. Tambah/Edit Pengalaman Kerja
Dalam `cvData.js`, update array `experience`:

```javascript
experience: [
  {
    title: "Posisi Anda",
    company: "Nama Perusahaan",
    period: "2020 - Sekarang",
    responsibilities: [
      "Tanggung jawab 1",
      "Tanggung jawab 2"
    ]
  }
]
```

### 3. Update Skills
Sesuaikan kategori dan skills dalam object `skills`:

```javascript
skills: {
  "Programming Languages": ["Python", "JavaScript", "Go"],
  "Frameworks": ["React", "Django", "Express.js"],
  // ... kategori lainnya
}
```

### 4. Kustomisasi Styling
Edit `src/App.css` untuk mengubah:
- Color scheme
- Typography
- Layout
- Spacing

### 5. Tambah Komponen Baru
Buat file baru di `src/components/` dan import ke `App.jsx`

## 🎯 Keunggulan React Version

### ✅ Maintainability
- Komponen terpisah dan reusable
- Data terpusat di `cvData.js`
- Easy to extend dan modify

### ✅ Performance
- Virtual DOM untuk rendering yang efisien
- Code splitting dan lazy loading ready
- Optimized build dengan Vite

### ✅ Developer Experience
- Hot Module Replacement (HMR)
- Modern JavaScript features
- Easy debugging dengan React DevTools

### ✅ Scalability
- Component-based architecture
- State management ready (Redux, Zustand, dll)
- Easy to add new features

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## 🚀 Deployment

### Netlify
1. Build project: `npm run build`
2. Upload folder `dist/` ke Netlify
3. Atau connect dengan Git repository

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add script di package.json:
```json
"homepage": "https://username.github.io/cv-landing-page",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## 🛠️ Teknologi yang Digunakan

- **React 18** - UI Library
- **Vite** - Build Tool
- **CSS3** - Styling dengan Flexbox & Grid
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

## 🤝 Contributing

1. Fork project ini
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📝 License

MIT License - bebas digunakan untuk personal dan komersial.

---

**Dibuat dengan ❤️ menggunakan React.js untuk Backend Developers**

### 💡 Tips Pengembangan Lanjutan

- Tambah dark mode toggle
- Implementasi animation dengan Framer Motion
- Tambah contact form dengan emailjs
- Integrasi dengan headless CMS
- Tambah blog section
- PWA support
