import type { NextRequest } from 'next/server';

const locales = ['zh', 'en'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/dev') ||
    pathname.includes('.')
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const cookieLocale = request.cookies.get('locale')?.value;
  const locale = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : 'zh';

  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  return Response.redirect(newUrl);
}