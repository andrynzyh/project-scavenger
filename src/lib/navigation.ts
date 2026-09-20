import { resolveIcon } from './icons';
import { withBase } from './paths';
import { COLLECTIONS, getCollectionMeta } from './collections';

/**
 * NAVIGATION — dibangun dari registry src/lib/collections.ts.
 * Tidak ada lagi auto-scan fs: SEMUA koleksi eksplisit, jadi API di sini
 * tinggal memetakan registry menjadi data sidebar/hub.
 */

export interface SidebarSection {
  /** Heading yang ditampilkan di sidebar/hub */
  label: string;
  /** Halaman index koleksi ("view all") */
  href: string;
  /** Nama koleksi (sama dengan folder src/content) */
  collection: string;
  /** Field frontmatter untuk pengelompokan (mis. 'rank', 'category') */
  groupField?: string;
  /** Urutan tampil grup — nilai tak dikenal menyusul alfabetis */
  groupOrder?: readonly string[];
  /** Label grup saat field kosong/tidak ada */
  fallbackGroup?: string;
  /** Emoji kartu hub */
  emoji?: string;
  /** Badge kartu hub, mis. DIGI / GEAR */
  tag?: string;
  /** Deskripsi satu baris kartu hub */
  blurb?: string;
}

/** Nama semua koleksi, dari registry. */
export function getAllCollectionNames(): string[] {
  return COLLECTIONS.map((c) => c.name);
}

/** Mapping registry -> bentuk section yang dipakai UI. */
function toSection(name: string): SidebarSection {
  const meta = getCollectionMeta(name)!;
  return {
    label: meta.label,
    href: withBase(`/${meta.name}/`),
    collection: meta.name,
    groupField: meta.groupField,
    groupOrder: meta.groupOrder,
    fallbackGroup: meta.fallbackGroup,
    emoji: meta.emoji,
    tag: meta.tag,
    blurb: meta.blurb,
  };
}

/** Semua section, urut sesuai registry. */
export function getSections(): SidebarSection[] {
  return COLLECTIONS.map((c) => toSection(c.name));
}

/** Section untuk satu koleksi (undefined jika tak terdaftar). */
export function getSectionByCollection(name: string): SidebarSection | undefined {
  return getCollectionMeta(name) ? toSection(name) : undefined;
}

export interface NavItem {
  description?: string;
  title: string;
  emoji: string;
  icon?: string;
  id: string;
  category?: string;
  owner?: string;
  /** Semua field frontmatter primitif (untuk data-* & filter client-side) */
  values: Record<string, string>;
  href: string;
}

export interface NavGroup {
  label: string;
  count: number;
  items: NavItem[];
}

export interface NavSection {
  label: string;
  /** Nama koleksi (dipakai konsumen untuk DOM id) */
  collection: string;
  href: string;
  total: number;
  groups: NavGroup[];
}

/** Bentuk entri generik — berlaku untuk koleksi mana pun */
interface NavEntry {
  id: string;
  data: {
    title: string;
    emoji?: string;
    icon?: string;
    description?: string;
    order?: number;
  };
}

/** Mengubah daftar entri flat menjadi data sidebar terkelompok & terurut. */
export function buildNavSection(
  section: SidebarSection,
  entries: readonly NavEntry[]
): NavSection {
  // Urut: alfabetis A–Z berdasarkan title (case-insensitive, locale-aware)
  const sorted = [...entries].sort(
    (a, b) =>
      a.data.title.localeCompare(b.data.title, undefined, { sensitivity: 'base' })
  );

  const byGroup = new Map<string, NavItem[]>();
  for (const entry of sorted) {
    const raw = section.groupField
      ? (entry.data as Record<string, unknown>)[section.groupField]
      : undefined;
    const label =
      typeof raw === 'string' && raw.length > 0
        ? raw
        : section.fallbackGroup ?? 'All';

    const bucket = byGroup.get(label);
    // Bawa semua field primitif frontmatter — dipakai untuk data-* filter
    const values: Record<string, string> = {};
    for (const [k, v] of Object.entries(entry.data as Record<string, unknown>)) {
      if (typeof v === 'string' || typeof v === 'number') values[k] = String(v);
    }
    const item: NavItem = {
      title: entry.data.title,
      emoji: entry.data.emoji ?? '\u{1F4C4}',
      icon: resolveIcon({
        collection: section.collection,
        slug: entry.id,
        icon: entry.data.icon,
      }),
      description:
        (entry.data as Record<string, unknown>).description as string ?? '',
      id: entry.id,
      category:
        typeof (entry.data as Record<string, unknown>).category === 'string'
          ? ((entry.data as Record<string, unknown>).category as string)
          : undefined,
      owner:
        typeof (entry.data as Record<string, unknown>).owner === 'string'
          ? ((entry.data as Record<string, unknown>).owner as string)
          : undefined,
      values,
      href: withBase(`${section.href}${entry.id}/`),
    };
    if (bucket) bucket.push(item);
    else byGroup.set(label, [item]);
  }

  // Urutan preferensi dulu, grup tak dikenal setelahnya (alfabetis)
  const rank = (label: string): number => {
    const i = section.groupOrder?.indexOf(label) ?? -1;
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };

  const groups: NavGroup[] = [...byGroup.entries()]
    .map(([label, items]) => ({ label, count: items.length, items }))
    .sort(
      (a, b) => rank(a.label) - rank(b.label) || a.label.localeCompare(b.label)
    );

  return {
    label: section.label,
    collection: section.collection,
    href: section.href,
    total: entries.length,
    groups,
  };
}
