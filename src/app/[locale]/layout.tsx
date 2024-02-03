import './globals.css';

import type { Metadata } from 'next';
import { Suspense } from 'react';

import { pacifico, poppins } from '@/constants/fonts';

import Loading from './loading';

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
      <body className={`${pacifico.variable} ${poppins.variable} bg-slate-200 dark:bg-black`}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
