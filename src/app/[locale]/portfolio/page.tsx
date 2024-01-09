'use client';

import { LayoutFooter, LayoutNavbar } from '@/app/[locale]/_components';
import { useBubblesTrail } from '@/hooks';

import { About, Contacts, Hero, Projects } from './_components';

const Portfolio = ({ params: { locale } }: ILocaleParams) => {
  useBubblesTrail();

  return (
    <>
      <LayoutNavbar locale={locale} />
      <main>
        <canvas className="fixed w-full h-full top-0 left-0 -z-10" />
        <div className="container flex min-h-screen flex-col">
          <Hero />
          <About />
          <Projects />
          <Contacts />
        </div>
      </main>
      <LayoutFooter locale={locale} />
    </>
  );
};

export default Portfolio;
