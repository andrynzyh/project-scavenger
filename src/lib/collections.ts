import { withBase } from './paths';

/**
 * SINGLE SOURCE OF TRUTH untuk seluruh site:
 * satu entri di sini = satu koleksi konten (content.config.ts) = satu section
 * di hub/sidebar/filter/search. Menambah koleksi baru = tambah folder
 * src/content/<name>/ + satu entri di array COLLECTIONS. Tidak ada magic
 * auto-scan — semuanya eksplisit dan type-safe.
 */

export interface CollectionFilter {
  /** Frontmatter field yang difilter (mis. 'rank') */
  field: string;
  /** Label dropdown di halaman koleksi */
  label: string;
  /** Opsi tetap yang ditampilkan (nilai tak dikenal tetap tampil, hanya tak terfilter) */
  options: readonly string[];
}

export interface CollectionMeta {
  /** Nama folder di src/content + segmen URL: /<name>/<slug>/ */
  name: string;
  /** Judul yang ditampilkan di nav, hub, dan judul halaman */
  label: string;
  /** Emoji kartu hub */
  emoji: string;
  /** Badge pendek kartu hub (mis. DIGI / GEAR) */
  tag: string;
  /** Deskripsi satu baris kartu hub */
  blurb: string;
  /** Field frontmatter untuk pengelompokan daftar (opsional) */
  groupField?: string;
  /** Urutan tampil grup — nilai tak dikenal menyusul secara alfabetis */
  groupOrder?: readonly string[];
  /** Label grup saat field kosong/tidak ada */
  fallbackGroup?: string;
  /** Dropdown filter tambahan di halaman index koleksi */
  filters?: readonly CollectionFilter[];
}

export const COLLECTIONS: readonly CollectionMeta[] = [
  {
    name: 'digimon',
    label: 'Digimon',
    emoji: '🐾',
    tag: 'DIGI',
    blurb: 'Every Digimon entry — evolution lines, stats, ranks and lore.',
    groupField: 'rank',
    groupOrder: ['SSS+', 'SSS', 'U'],
    fallbackGroup: 'Unclassified',
    filters: [
      { field: 'rank', label: 'Rank', options: ['SSS+', 'SSS', 'U'] },
      { field: 'attribute', label: 'Attribute', options: ['Vaccine', 'Virus', 'Data'] },
      { field: 'role', label: 'Type', options: ['Autoattack', 'Skill', 'Tank'] },
    ],
  },
  {
    name: 'gear',
    label: 'Gear',
    emoji: '🎒',
    tag: 'GEAR',
    blurb: 'Goggles, digivices, equipment and clothing.',
    groupField: 'category',
    groupOrder: ['Goggles', 'Digivice', 'Equipment', 'Cloth'],
    fallbackGroup: 'Other',
  },
  {
    name: 'dungeons',
    label: 'Dungeons',
    emoji: '🗺️',
    tag: 'RAID',
    blurb: 'Maps, spawn areas, channels and boss strategies per phase.',
    groupField: 'category',
    groupOrder: ['Overview', 'Early Game', 'Mid Game', 'Late Game'],
    fallbackGroup: 'Other',
  },
  {
    name: 'guides',
    label: 'Guides',
    emoji: '📘',
    tag: 'GUIDE',
    blurb: 'New-player basics, class guides and playstyle deep-dives (AA / SK / Tank).',
    groupField: 'category',
    groupOrder: ['Basics', 'AA DPS', 'SK DPS', 'Tank'],
    fallbackGroup: 'Other',
  },
  {
    name: 'items',
    label: 'Items',
    emoji: '🧪',
    tag: 'ITEM',
    blurb: 'Evolution items, materials and where to farm them.',
    groupField: 'category',
    fallbackGroup: 'All',
  },
  {
    name: 'progression',
    label: 'Progression',
    emoji: '📈',
    tag: 'PATH',
    blurb: 'Level-by-level roadmaps from pre-early game to end game.',
    groupField: 'category',
    fallbackGroup: 'All',
  },
  {
    name: 'system',
    label: 'Game Systems',
    emoji: '⚙️',
    tag: 'SYS',
    blurb: 'Core mechanics: attributes, tamers, novice challenge and more.',
    groupField: 'category',
    fallbackGroup: 'All',
  },
  {
    name: 'patchnote',
    label: 'Patch Notes',
    emoji: '📝',
    tag: 'PATCH',
    blurb: 'Balance changes, content drops and hotfixes — newest first.',
    groupField: 'type',
    groupOrder: ['Major', 'Hotfix'],
    fallbackGroup: 'Patches',
  },
];

/** Nama semua koleksi — urutan menentukan urutan nav/hub. */
export const COLLECTION_NAMES: readonly string[] = COLLECTIONS.map((c) => c.name);

/** Metadata koleksi berdasarkan nama (undefined jika tidak terdaftar). */
export function getCollectionMeta(name: string): CollectionMeta | undefined {
  return COLLECTIONS.find((c) => c.name === name);
}

/** URL base koleksi, selalu lewat withBase(): "/<base>/<name>/" */
export function hrefOf(name: string): string {
  return withBase(`/${name}/`);
}
