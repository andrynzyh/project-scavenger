import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * EIGHT EXPLICIT COLLECTIONS — semua terdaftar di src/lib/collections.ts
 * (label, emoji, grouping, filter). Menambah koleksi baru:
 *   1. buat folder src/content/<name>/
 *   2. tambah definisi di sini
 *   3. tambah entri di COLLECTIONS (src/lib/collections.ts)
 * Tidak ada auto-scan fs — setiap koleksi eksplisit dan tervalidasi Zod.
 */

/** Field yang dipakai semua koleksi. */
const baseSchema = {
  /** Judul halaman, mis. "Agumon" */
  title: z.string(),
  /** Emoji avatar/thumbnail (fallback saat tidak ada icon) */
  emoji: z.string().default('📄'),
  /** Nama ikon library ("lucide:swords") atau nama/path file di public/<collection>/ */
  icon: z.string().optional(),
  /** Ringkasan singkat untuk kartu & hasil pencarian */
  description: z.string(),
  tags: z.array(z.string()).default([]),
  /** Posisi urut dalam grupnya */
  order: z.number().default(99),
};

const digimon = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/content/digimon',
    // Semua file FLAT di folder digimon — id dari nama file saja, sehingga
    // URL tetap bersih: /digimon/<slug>/
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, '').split('/').pop()!,
  }),
  schema: z.object({
    ...baseSchema,
    /** Rarity rank — filter Rank */
    rank: z.enum(['SSS+', 'SSS', 'U']).optional(),
    /** Evolution stage — grouping opsional */
    stage: z
      .enum(['Fresh', 'In-Training', 'Rookie', 'Champion', 'Ultimate', 'Mega'])
      .optional(),
    /** Combat attribute — filter Attribute */
    attribute: z.enum(['Vaccine', 'Virus', 'Data']).optional(),
    /** Combat role — filter Type */
    role: z.enum(['Autoattack', 'Skill', 'Tank']).optional(),
    partner: z.string().optional(),
  }),
});

const gear = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/gear' }),
  schema: z.object({
    ...baseSchema,
    emoji: z.string().default('🎒'),
    /** Kategori gear — grouping */
    category: z.enum(['Goggles', 'Digivice', 'Equipment', 'Cloth']),
    /** Pemakai gear */
    owner: z.string().optional(),
  }),
});

const dungeons = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/dungeons' }),
  schema: z.object({
    ...baseSchema,
    emoji: z.string().default('🗺️'),
    /** Fase game (Early Game belum ada kontennya) */
    category: z.enum(['Overview', 'Early Game', 'Mid Game', 'Late Game']),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/guides' }),
  schema: z.object({
    ...baseSchema,
    emoji: z.string().default('📘'),
    /** Basics / playstyle (AA DPS, SK DPS, Tank) */
    category: z.enum(['Basics', 'AA DPS', 'SK DPS', 'Tank']),
  }),
});

const items = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/items' }),
  schema: z.object({
    ...baseSchema,
    emoji: z.string().default('🧪'),
    category: z.string().optional(),
  }),
});

const progression = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/progression' }),
  schema: z.object({
    ...baseSchema,
    emoji: z.string().default('📈'),
    category: z.string().optional(),
  }),
});

const system = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/system' }),
  schema: z.object({
    ...baseSchema,
    emoji: z.string().default('⚙️'),
    category: z.string().optional(),
    owner: z.string().optional(),
  }),
});

const patchnote = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/patchnote' }),
  schema: z.object({
    ...baseSchema,
    emoji: z.string().default('📝'),
    /** Versi human-readable, mis. "3.5.1" */
    version: z.string(),
    /** Tanggal rilis — urutan & tampilan */
    date: z.coerce.date(),
    /** "Major" = badge berwarna, "Hotfix" = redup */
    type: z.enum(['Major', 'Hotfix']).default('Hotfix'),
  }),
});

export const collections = {
  digimon,
  gear,
  dungeons,
  guides,
  items,
  progression,
  system,
  patchnote,
};
