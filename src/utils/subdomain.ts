export type SubdomainType = 'main' | 'maths';

export interface LocationLike {
  hostname: string;
  search: string;
  hash?: string;
  pathname?: string;
  protocol?: string;
  host?: string;
  port?: string;
}

/**
 * Determines whether the current view should be the 'main' domain (Subjects Hub)
 * or the 'maths' subdomain (MathsMaster 25-Chapter Practice Suite).
 *
 * Rules:
 * 1. Query parameter override: `?sub=maths` or `?subdomain=maths` -> 'maths', `?sub=main` -> 'main'
 * 2. Hash / Path override: `#/maths` or `/maths` -> 'maths'
 * 3. Hostname check: if hostname starts with `maths.` (e.g. `maths.suretysprint.com`, `maths.localhost`) -> 'maths'
 * 4. Default: 'main' (Subjects Hub listing all ICSE subjects)
 */
export function getSubdomain(customLocation?: LocationLike): SubdomainType {
  const loc = customLocation || (typeof window !== 'undefined' ? window.location : undefined);
  if (!loc) return 'main';

  const hostname = loc.hostname ? loc.hostname.toLowerCase() : '';
  const searchParams = new URLSearchParams(loc.search || '');

  // 1. Explicit query parameter override (valuable for local dev, previews, and tests)
  const subParam = searchParams.get('sub') || searchParams.get('subdomain');
  if (subParam === 'maths') return 'maths';
  if (subParam === 'main') return 'main';

  // 2. Hash / Path based fallback
  const hash = (loc.hash || '').toLowerCase();
  const pathname = (loc.pathname || '').toLowerCase();
  if (hash.startsWith('#/maths') || pathname.startsWith('/maths')) {
    return 'maths';
  }
  if (hash.startsWith('#/main') || pathname === '/main') {
    return 'main';
  }

  // 3. Subdomain check from hostname (e.g. maths.suretysprint.com, maths.suretysprint.in, maths.localhost)
  if (hostname.startsWith('maths.') || hostname === 'maths.localhost') {
    return 'maths';
  }

  return 'main';
}

/**
 * Generates the appropriate URL to navigate to the specified target subdomain.
 */
export function getTargetUrl(target: SubdomainType, customLocation?: LocationLike): string {
  const loc = customLocation || (typeof window !== 'undefined' ? window.location : undefined);
  if (!loc) return '/';

  const protocol = loc.protocol || 'http:';
  const host = loc.host || 'localhost';
  const hostname = loc.hostname ? loc.hostname.toLowerCase() : 'localhost';
  const port = loc.port || '';
  const pathname = loc.pathname || '/';
  const portSuffix = port ? `:${port}` : '';

  if (target === 'maths') {
    // In production domain like suretysprint.com
    if (hostname.includes('suretysprint')) {
      const baseDomain = hostname.replace(/^([a-z0-9-]+\.)*suretysprint/, 'suretysprint');
      return `${protocol}//maths.${baseDomain}${portSuffix}${pathname}`;
    }
    // In local development or standalone preview: preserve host and set ?sub=maths
    return `${protocol}//${host}${pathname}?sub=maths`;
  } else {
    // target === 'main'
    if (hostname.includes('suretysprint')) {
      const baseDomain = hostname.replace(/^([a-z0-9-]+\.)*suretysprint/, 'suretysprint');
      return `${protocol}//${baseDomain}${portSuffix}${pathname}`;
    }
    return `${protocol}//${host}${pathname}?sub=main`;
  }
}

/**
 * Switches the current subdomain view. In production domains with real DNS,
 * performs a browser location redirection. In local or preview environments,
 * updates the URL search params and notifies subscribers without losing state.
 */
export function navigateToSubdomain(
  target: SubdomainType,
  onStateChange?: (sub: SubdomainType) => void
): void {
  if (typeof window === 'undefined') return;

  const currentHost = window.location.hostname.toLowerCase();
  const isHostSubdomain = currentHost.startsWith('maths.') || currentHost === 'maths.localhost';

  // If on a real production suretysprint domain and needs cross-host redirection
  if (currentHost.includes('suretysprint')) {
    if (target === 'maths' && !isHostSubdomain) {
      window.location.href = getTargetUrl('maths');
      return;
    }
    if (target === 'main' && isHostSubdomain) {
      window.location.href = getTargetUrl('main');
      return;
    }
  }

  // In local or single-origin mode: update URL query param
  const url = new URL(window.location.href);
  url.searchParams.set('sub', target);
  window.history.pushState({}, '', url.toString());

  if (onStateChange) {
    onStateChange(target);
  }
  window.dispatchEvent(new CustomEvent('subdomainChange', { detail: target }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
