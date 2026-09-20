/**
 * BASE-PATH HELPERS — GitHub Pages sub-path safety net.
 *
 * The site deploys as a GitHub Pages PROJECT site:
 *   https://andrynzyh.github.io/project-scavenger/   (repo: andrynzyh/project-scavenger)
 * so every root-relative URL ("/digimon/") must be prefixed with the
 * configured base ("/project-scavenger"). Astro exposes that base to client code as
 * import.meta.env.BASE_URL — keep ALL internal links going through
 * withBase() and they keep working no matter what `base` is set to
 * (root domain / Vercel → BASE_URL becomes "/" → prefix becomes "").
 */
const RAW_BASE: string = import.meta.env.BASE_URL ?? '/';

/** Base without the trailing slash: "/project-scavenger" (or "" when deployed at root). */
export const BASE = RAW_BASE === '/' ? '' : RAW_BASE.replace(/\/+$/, '');

/**
 * Prefix a root-relative path with the site base.
 * Idempotent: paths that already start with the base are returned unchanged.
 * Non-root-relative values pass through untouched (external URLs,
 * protocol-relative "//host/x", icon-library names like "lucide:swords").
 */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) return path;
  return `${BASE}${path}`;
}
