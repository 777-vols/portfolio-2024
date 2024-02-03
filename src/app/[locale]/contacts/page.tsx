'use client';

import { LayoutFooter, LayoutNavbar } from '@/app/[locale]/_components';
import { TransitionEffect } from '@/components';
import { useBubblesTrail } from '@/hooks';

const Contacts = ({ params: { locale } }: ILocaleParams) => {
  useBubblesTrail();

  return (
    <>
      <TransitionEffect />
      <LayoutNavbar locale={locale} />
      <main>
        <canvas className="fixed w-full h-full top-0 left-0 -z-10" />
        <div className="container flex min-h-screen flex-col">Contacts page</div>
      </main>
      <LayoutFooter locale={locale} />
    </>
  );
};

export default Contacts;
