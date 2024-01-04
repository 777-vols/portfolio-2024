'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { getLinks } from '@/helpers';
import { getDictionary } from '@/i18n/getDictionary';
import { ILocaleProps } from '@/types';

const NavMenu = ({ locale }: ILocaleProps) => {
  const { navbar } = getDictionary(locale);
  const { linksNames } = navbar;

  const links = useMemo(
    () =>
      getLinks(locale, linksNames).map(({ name, path }) => (
        <li key={path}>
          <Link href={path}>{name}</Link>
        </li>
      )),
    [linksNames, locale],
  );

  return (
    <nav>
      <ul>{links}</ul>
    </nav>
  );
};

export default NavMenu;
