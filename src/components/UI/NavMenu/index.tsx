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

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.15,
      staggerDirection: 1,
    },
  },
};

const NavMenu = ({ locale }: ILocaleProps) => {
  const { navbar } = getDictionary(locale);
  const { linksNames } = navbar;

  const pathname = usePathname();

  const links = useMemo(
    () =>
      getLinks(locale, linksNames).map(({ name, path }) => (
        <motion.li
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          key={path}
          className="text-[17px]">
          <Link href={path} className="font-poppins relative group">
            {name}
            <span
              className={`h-[2px] inline-block bg-white absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
                pathname === path ? 'w-full' : 'w-0'
              }`}>
              &nbsp;
            </span>
          </Link>
        </motion.li>
      )),
    [linksNames, locale, pathname],
  );

  return (
    <motion.nav
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: '100%',
        opacity: 1,
      }}
      exit={{
        width: 0,
        opacity: 0,
        transition: { delay: 0.5, duration: 0.2 },
      }}
      className={`flex items-center justify-between w-full mr-10 
      max-md:p-6 max-md:absolute max-md:top-full max-md:left-0 max-md:flex-col max-md:bg-slate-500 max-md:bg-opacity-45 max-md:dark:bg-indigo-600 max-md:dark:bg-opacity-25`}>
      <motion.ul
        initial="closed"
        animate="open"
        exit="closed"
        variants={sideVariants}
        className="flex items-center gap-6 max-md:flex-col max-md:w-full">
        {links}
      </motion.ul>
      <div className="flex gap-5 items-center max-lg:hidden max-md:flex max-md:mt-7 max-md:gap-7">
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
    </motion.nav>
  );
};

export default NavMenu;
