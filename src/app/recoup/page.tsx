import type { Metadata } from 'next';
import AppDetailPage from '@/components/AppDetailPage';
import { APP_PAGES } from '@/lib/appPages';
import { pageMeta } from '@/lib/metadata';

const app = APP_PAGES.recoup;

export const metadata: Metadata = pageMeta({ path: '/recoup', title: app.seoTitle, description: app.description });

export default function Page() {
  return <AppDetailPage app={app} />;
}
