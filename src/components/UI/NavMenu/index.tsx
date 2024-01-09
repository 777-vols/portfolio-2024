'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { getLinks, isActivePath } from '@/helpers';
import { getDictionary } from '@/i18n/getDictionary';
import { ILocaleProps } from '@/types';

const NavMenu = ({ locale }: ILocaleProps) => {
  const { navbar } = getDictionary(locale);
  const { linksNames } = navbar;

  const pathname = usePathname();

  const links = useMemo(
    () =>
      getLinks(locale, linksNames).map(({ name, path }) => (
        <li
          key={path}
          className={
            isActivePath(pathname, path)
              ? 'mx-5 scale-125 font border-b-2'
              : 'mx-5 hover:scale-x-105 duration-100'
          }>
          <Link href={path} className="font-poppins">
            {name}
          </Link>
        </li>
      )),
    [linksNames, locale, pathname],
  );

  return (
    <nav className="flex items-center">
      <ul className="flex items-center">{links}</ul>
    </nav>
  );
};

export default NavMenu;
