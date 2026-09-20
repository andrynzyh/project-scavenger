# Ditulis dalam Bahasa Indonesia

**Aturan wajib untuk semua interaksi dengan pengguna proyek ini:**

- Seluruh komunikasi (penjelasan, summary perubahan, review kode, pertanyaan klarifikasi, dokumentasi commit) ditulis dalam **Bahasa Indonesia**.
- Kode itu sendiri, identifier, nama file, nama variabel, komentar yang sudah ada di dalam file kode — tetap dalam bahasa Inggris (bukan bagian dari komunikasi).
- Dokumentasi konten baru (`src/content/**`) mengikuti bahasa yang sudah dipakai di file sejenis; umumnya Bahasa Inggris untuk konten, frontmatter keys tetap bahasa Inggris.
- Struktur kalimat wajar, tidak perlu kaku; gunakan istilah teknis asing bila lebih umum (e.g. *build*, *deploy*, *frontmatter*).

## Ringkasan proyek

Wiki statis **Bahasa Inggris** untuk MMORPG Digimon, dibangun dengan **Astro 5** + Content Collections (Zod). Menyajikan species digimon, evolution, items, dungeon, playstyle, dan progression guide — deploy ke GitHub Pages di `https://andrynzyh.github.io/project-scavenger/`.

- **Komunikasi**: selalu Bahasa Indonesia (aturan di atas).
- **Kode & komentar di dalam file**: bahasa Inggris, sesuai konvensi yang sudah ada.
- **Konten**: Bahasa Inggris; frontmatter keys tetap bahasa Inggris.
- **Instruksi teknis lengkap** (perintah, struktur, schema, konvensi kode): baca [`README.md`](./README.md) — sumber kebenaran untuk konvensi teknis.
- **Kontribusi**: lewat pull request — `npm run build` wajib hijau sebelum merge (validasi Zod).

> **Catatan**: proyek ini adalah remake dari `digidocs` (Docusaurus) — jangan bawa pola Docusaurus ke sini. Proyek Astro ini adalah sumber kebenaran.