# Digimon MMORPG Wiki 🌐

Wiki komunitas **Bahasa Inggris** untuk game MMORPG Digimon: species digimon, evolution, items, dungeon, playstyle, dan progression guide. Dibangun dengan **Astro 5** + Content Collections (Zod).

> 🔓 **Proyek terbuka** — siapa pun boleh berkontribusi artikel dan guide! Baca [CONTRIBUTING.md](./CONTRIBUTING.md) untuk panduan lengkap, dan [GOVERNANCE.md](./GOVERNANCE.md) untuk bagaimana proyek dijaga tetap aman.

## ✨ Fitur

- 📚 **Konten kolaboratif** — artikel & guide dari komunitas dalam Bahasa Inggris
- 🧬 **Content Collections + Zod** — setiap entri divalidasi otomatis saat build
- 🔍 **Search client-side** — indeks semua koleksi dibangun saat build (tanpa Pagefind)
- 🎨 **Dark theme** — tema "Digital World" neon green/blue, mudah di-re-skin via CSS variables
- 📱 **Responsive** — mobile & desktop
- ⚡ **SSG statis** — cepat, siap SEO (sitemap, OG tags, canonical)

## 🧭 Struktur Konten

| Koleksi | Lokasi | Schema |
| --- | --- | --- |
| Digimon (strict) | `src/content/digimon/` | stage, rank, attribute, role, partner |
| Accessories (strict) | `src/content/accessories/` | category, owner |
| Patchnote (strict) | `src/content/patchnote/` | version, date, type |
| Dungeon | `src/content/dungeon/` | auto (generik) |
| Guide | `src/content/guide/` | auto (generik) |
| Items | `src/content/items/` | auto (generik) |
| Playstyle | `src/content/playstyle/` | auto (generik) |
| Progression | `src/content/progression/` | auto (generik) |
| System | `src/content/system/` | auto (generik) |

> ✨ **Trik auto-collection**: membuat folder baru di `src/content/` otomatis menjadi koleksi baru tanpa perlu mengubah kode. Lihat `src/content.config.ts`.

## 🚀 Menjalankan Lokal

Prasyarat: **Node.js ≥ 20**

```bash
npm install
npm run dev        # dev server (Astro dev toolbar dimatikan)
npm run build      # build production — WAJIB sukses (validasi Zod di sini!)
npm run preview    # preview hasil build
```

> **Penting**: `npm run build` adalah satu-satunya validasi. Jika frontmatter Zod gagal, build error. Pastikan build sukses sebelum membuat pull request.

## 🛡️ Keamanan & Model Kontribusi

Proyek ini mengikuti model **Pull Request + review**:

1. **Fork** repo ini
2. Buat **branch** baru untuk perubahan Anda
3. Buat **pull request** ke branch `main`
4. **CI otomatis** menjalankan `npm run build` (validasi Zod) di setiap PR
5. **Maintainer** mereview & merge

Branch `main` dilindungi — tidak ada perubahan langsung ke main. Detail lengkap: [GOVERNANCE.md](./GOVERNANCE.md).

## 📝 Lisensi

- **Konten** (`src/content/`): [CC BY 4.0](./CONTENT_LICENSE.md) — silakan berbagi & adaptasi dengan atribusi
- **Kode**: [MIT](./LICENSE)

## 🙏 Kontributor

Terima kasih untuk semua yang berkontribusi! 🎉
