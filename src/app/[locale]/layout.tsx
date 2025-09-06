import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // 지원하지 않는 언어인 경우 404 처리
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 메시지 로드
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      {children}
    </NextIntlClientProvider>
  );
}