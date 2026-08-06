export function withBase(href = '/'): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;

  if (!href || href === '/') {
    return normalizedBase || '/';
  }

  const path = href.startsWith('/') ? href : `/${href}`;
  return `${normalizedBase}${path}`;
}

export function asset(path: string): string {
  const clean = path.replace(/^\//, '');
  return withBase(`/${clean}`);
}
