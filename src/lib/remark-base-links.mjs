/**
 * Remap root-relative Markdown links & images ("/digimon/x/") onto the
 * configured base ("/project-scavenger/digimon/x/") at build time, so content authors can
 * keep writing clean absolute paths while GitHub Pages serves the site
 * under /project-scavenger/. Wired up in astro.config.mjs:
 *
 *   remarkBaseLinks({ base: BASE })
 *
 * Handles both `image` nodes (![alt](/path)) and `link` nodes ([text](/path)).
 */
export function remarkBaseLinks({ base = '' } = {}) {
  const prefix = String(base).replace(/\/+$/, '');

  const rewrite = (node) => {
    const url = node.url;
    if (typeof url !== 'string') return;
    if (!url.startsWith('/') || url.startsWith('//')) return;
    // Idempotent: skip anything already carrying the prefix
    if (prefix && (url === prefix || url.startsWith(`${prefix}/`))) return;
    node.url = prefix + url;
  };

  const rewriteHtml = (node) => {
    // Raw HTML inside markdown (<img src="/...">) — prefix quoted URLs.
    if (typeof node.value !== 'string' || !node.value.includes('="')) return;
    node.value = node.value.replace(/\b(src|href)="([^"]*)"/g, (full, attr, url) => {
      if (!url.startsWith('/') || url.startsWith('//')) return full;
      if (prefix && (url === prefix || url.startsWith(`${prefix}/`))) return full;
      return `${attr}="${prefix}${url}"`;
    });
  };

  // Manual recursive walk. (unist-util-visit's visitor form proved unreliable
  // inside Astro's MDX-flavored pipeline — it emptied rendered content — so we
  // avoid it entirely here.)
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'link' || node.type === 'image') rewrite(node);
    if (node.type === 'html') rewriteHtml(node);
    if (Array.isArray(node.children)) {
      for (const child of node.children) walk(child);
    }
  };

  let trees = 0;
  return (tree) => {
    walk(tree);
    trees++;
  };
}

// Debug counter — hanya aktif saat DEBUG_BASELINK=1.
// PENTING: jangan aktifkan tanpa guard ini — process.on('exit') di sini membuat
// `astro build` keluar dengan code 1 walau build sukses (hook exit berkonflik
// dengan lifecycle Astro), yang akan menggagalkan CI.
if (typeof process !== 'undefined' && process.env.DEBUG_BASELINK === '1') {
  process.on('exit', () => console.log(`[BASELINK] trees processed: ${trees}`));
}
