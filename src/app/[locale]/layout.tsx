import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import LayoutNavbar from './_components/LayoutNavbar';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio next app',
  icons: [{ rel: 'icon', url: '/favicon.png' }],
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }] as const;
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
} & ILocaleParams) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <LayoutNavbar locale={locale} />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
