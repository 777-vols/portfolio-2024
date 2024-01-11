'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { getLinks } from '@/helpers';
import { getDictionary } from '@/i18n/getDictionary';
import { ILocaleProps } from '@/types';

const NavMenu = ({ locale }: ILocaleProps) => {
  const { navbar } = getDictionary(locale);
  const { linksNames } = navbar;

  const pathname = usePathname();

  const links = useMemo(
    () =>
      getLinks(locale, linksNames).map(({ name, path }) => (
        <li key={path}>
          <Link href={path} className="font-poppins relative group">
            {name}
            <span
              className={`h-[2px] inline-block bg-white absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
                pathname === path ? 'w-full' : 'w-0'
              }`}>
              &nbsp;
            </span>
          </Link>
        </li>
      )),
    [linksNames, locale, pathname],
  );

  return (
    <nav className="flex items-center">
      <ul className="flex items-center gap-5">{links}</ul>
    </nav>
  );
};

export default NavMenu;
