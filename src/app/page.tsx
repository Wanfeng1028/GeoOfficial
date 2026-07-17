import { redirect } from 'next/navigation';

/**
 * Root page — redirect to default locale.
 *
 * The site uses locale-prefixed routes (/zh, /en).
 * Visiting / redirects to the default locale (zh).
 */
export default function RootPage() {
  redirect('/zh');
}
