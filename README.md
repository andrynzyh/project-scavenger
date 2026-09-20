# Digimon MMORPG Wiki 🌐

Wiki komunitas **Bahasa Inggris** untuk game MMORPG Digimon: species digimon, evolution, items, dungeon, guide, playstyle, dan progression. Dibangun dengan **Astro 5** + Content Collections (Zod).

> 🔓 **Proyek terbuka** — siapa pun boleh berkontribusi artikel dan guide lewat pull request!

## ✨ Fitur

- 📚 **Konten komunitas** — artikel & guide dalam Bahasa Inggris
- 🧬 **Content Collections + Zod** — validasi frontmatter otomatis saat build
- 🗂️ **Registry tunggal** — `src/lib/collections.ts`: satu tempat untuk daftar koleksi, grouping, dan filter
- 🔍 **Search client-side** — indeks semua koleksi dibangun saat build (tanpa Pagefind)
- 🎨 **Dark theme** — tema "Digital World" neon green/blue, mudah di-re-skin via CSS variables
- 📱 **Responsive** — mobile & desktop
- ⚡ **SSG statis** — cepat, siap SEO (sitemap, OG tags, canonical)

## 🧭 Struktur Konten

| Koleksi | Lokasi | Schema |
| --- | --- | --- |
| Digimon | `src/content/digimon/` | rank (SSS+/SSS/U), stage, attribute, role, partner |
| Gear | `src/content/gear/` | category (Goggles/Digivice/Equipment/Cloth), owner |
| Dungeons | `src/content/dungeons/` | category (Overview/Early Game/Mid Game/Late Game) |
| Guides | `src/content/guides/` | category (Basics/AA DPS/SK DPS/Tank) |
| Items | `src/content/items/` | category (opsional) |
| Progression | `src/content/progression/` | category (opsional) |
| System | `src/content/system/` | category, owner (opsional) |
| Patchnote | `src/content/patchnote/` | version, date, type (Major/Hotfix) |

> Semua koleksi **eksplisit** di `src/content.config.ts` + metadata UI di `src/lib/collections.ts` — tanpa auto-scan, sepenuhnya type-safe.

## 🚀 Menjalankan Lokal

Prasyarat: **Node.js ≥ 20**

```bash
npm install
npm run dev        # dev server (Astro dev toolbar dimatikan)
npm run build      # build production — WAJIB sukses (validasi Zod di sini!)
npm run preview    # preview hasil build
```

> **Penting**: `npm run build` adalah satu-satunya validasi. Jika frontmatter Zod gagal, build error. Pastikan build sukses sebelum membuat pull request.

## 🛡️ Keamanan & Deploy

- **Tidak ada secret/kunci di repo** — konfigurasi sensitif lewat GitHub repository secrets.
- Deploy otomatis ke GitHub Pages via **GitHub Actions** (`.github/workflows/deploy.yml`) pada push ke `main`.
- CI (`.github/workflows/ci.yml`) menjalankan build + cek base path di setiap pull request.

## 📝 Lisensi

- **Konten** (`src/content/`): CC BY 4.0 — silakan berbagi & adaptasi dengan atribusi
- **Kode**: [MIT](./LICENSE)

## 🙏 Kontributor

Terima kasih untuk semua yang berkontribusi! 🎉
