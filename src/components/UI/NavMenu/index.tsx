'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { socials } from '@/constants';
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
    <nav className="flex items-center justify-between w-full max-md:hidden mr-10">
      <ul className="flex items-center gap-6">{links}</ul>
      <div className="flex gap-5 items-center max-lg:hidden">
        {socials.map(({ id, icon, href, target }) => (
          <motion.a
            key={id}
            href={href}
            target={target}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}>
            <Image src={icon} alt="social-icon" width={26} height={26} />
          </motion.a>
        ))}
      </div>
    </nav>
  );
};

export default NavMenu;
