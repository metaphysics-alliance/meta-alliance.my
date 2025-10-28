import { redirect } from 'next/navigation';

import type { Locale } from '@/lib/i18n';

export function generateMetadata() {
  return {};
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const locale = params.locale || 'EN';
  redirect(`/${locale}/vip-report/supreme`);
}
