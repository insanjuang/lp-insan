# TechSolution - Landing Page IT Services

Landing page profesional untuk bisnis layanan IT yang menyediakan solusi teknologi lengkap meliputi repair komputer, instalasi jaringan, CCTV, pengembangan website & aplikasi, serta desain grafis.

## 🚀 Fitur Utama

- **Modern & Responsive Design** - Tampilan yang menarik dan optimal di semua perangkat
- **Komponen Lengkap** - Header, Hero, Services, About, Contact, Footer
- **SEO Optimized** - Meta tags lengkap dan structured data untuk ranking yang baik
- **Interactive UI** - Animasi dan transisi yang smooth
- **Contact Form** - Form kontak yang fungsional dengan validasi
- **Mobile First** - Didesain khusus untuk pengalaman mobile yang optimal

## 🛠️ Teknologi yang Digunakan

- **React 18** - JavaScript library untuk UI
- **Vite** - Build tool yang cepat dan modern
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library yang modern
- **Responsive Design** - Mobile-first approach

## 📋 Layanan yang Ditampilkan

1. **Repair Komputer** - Perbaikan dan maintenance hardware/software
2. **Instalasi Jaringan** - Setup LAN, WiFi, dan infrastruktur IT
3. **CCTV & Security** - Sistem keamanan dan monitoring
4. **Penyediaan Perangkat** - Penjualan komputer, laptop, proyektor
5. **Website & Aplikasi** - Pengembangan web dan mobile app
6. **Desain Grafis** - Branding dan material marketing

## 🎨 Desain Features

- **Gradient Background** - Background yang menarik dengan efek gradient
- **Card Hover Effects** - Animasi saat hover pada service cards
- **Smooth Scrolling** - Navigasi yang smooth antar section
- **Loading States** - Feedback visual untuk user interaction
- **Color Scheme** - Palet warna profesional biru dan kuning
- **Typography** - Font Inter untuk readability yang optimal

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Installation

1. Clone repository ini:
```bash
git clone <repository-url>
cd it-services-landing
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

File hasil build akan tersedia di folder `dist/`

## 📁 Struktur Project

```
it-services-landing/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎯 Komponen Utama

### Header
- Logo dan branding
- Navigation menu responsive
- CTA button "Konsultasi Gratis"
- Mobile hamburger menu

### Hero Section  
- Headline yang menarik
- Value propositions
- Dual CTA buttons
- Statistics display
- Service preview cards

### Services Section
- 6 service cards dengan detail lengkap
- Pricing information
- Feature lists dengan checkmarks
- Individual CTA buttons

### About Section
- Company values dan achievements
- Team member cards
- Customer testimonial
- Dual CTA buttons

### Contact Section
- Contact form dengan validation
- Company contact information
- Quick action buttons (WhatsApp, Phone)
- Emergency support info

### Footer
- Company information
- Quick links dan service links
- Social media icons
- Newsletter subscription
- Copyright dan legal links

## 🔧 Kustomisasi

### Mengubah Warna
Edit file `tailwind.config.js` untuk mengubah color scheme:

```javascript
colors: {
  primary: {
    // Warna utama perusahaan
  },
  secondary: {
    // Warna sekunder
  }
}
```

### Mengubah Konten
- **Company Info**: Edit di setiap komponen sesuai kebutuhan
- **Services**: Modify array `services` di `Services.jsx`
- **Contact Info**: Update di `Contact.jsx` dan `Footer.jsx`
- **Team Members**: Edit array `team` di `About.jsx`

### Menambah Animasi
Tambahkan class Tailwind untuk animasi:
- `animate-pulse` - Efek pulse
- `animate-bounce` - Efek bounce
- `transition-all duration-300` - Smooth transitions

## 📞 Informasi Kontak (Template)

- **Telepon**: +62 812-3456-7890
- **Email**: info@techsolution.com
- **Alamat**: Jl. Teknologi No. 123, Jakarta Selatan
- **Jam Operasional**: Senin-Jumat 08:00-17:00, Sabtu 08:00-14:00

## 📈 SEO Features

- Meta tags lengkap untuk social sharing
- Structured data (JSON-LD) untuk Google
- Semantic HTML untuk accessibility
- Image alt texts
- Proper heading hierarchy
- Fast loading dengan Vite

## 🔒 Performance & Security

- **Vite** untuk bundling yang optimal
- **Tree shaking** untuk ukuran file minimal  
- **Code splitting** otomatis
- **Image optimization** ready
- **HTTPS** recommended untuk production

## 📄 License

Project ini dibuat untuk keperluan bisnis IT services. Silakan customize sesuai kebutuhan bisnis Anda.

## 🤝 Contributing

Jika ingin berkontribusi:
1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📞 Support

Untuk pertanyaan atau bantuan teknis, silakan hubungi tim development.

---

**Dibuat dengan ❤️ untuk kemajuan teknologi Indonesia**
