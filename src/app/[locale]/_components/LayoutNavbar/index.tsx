'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import NavMenu from '@/components/UI/NavMenu';
import { themeIcons } from '@/constants';
import { useOnClickOutside, useThemeSwitcher, useWindowSize } from '@/hooks';
import { i18n } from '@/i18n/i18n.config';
import { ILocaleProps } from '@/types';

const { lightThemeIcon, darkThemeIcon } = themeIcons;

const LayoutNavbar = ({ locale }: ILocaleProps) => {
  const pathname = usePathname();
  const [, currentLanguage, ...restUrl] = pathname.split('/');

  const menuRef = useRef(null);

  const [mode, setThemeMode] = useThemeSwitcher();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const router = useRouter();

  const windowSize = useWindowSize();
  const isMobile = windowSize.width! < 768;

  const handleCloseOpenMobileMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useOnClickOutside(menuRef, () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  const handleChangeLanguage = () => {
    router.push(
      currentLanguage === i18n.locales[0]
        ? `/${i18n.locales[1]}/${restUrl.join('/')}`
        : `/${i18n.locales[0]}/${restUrl.join('/')}`,
    );
  };

  const handleChangeThemeMode = () => {
    setThemeMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      ref={menuRef}
      className="bg-slate-700 bg-opacity-50 h-20 flex items-center fixed z-20 w-full px-7
    after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r from-transparent via-blue-950 dark:via-violet-400 to-transparent after:transform after:-translate-x-full after:-z-10 transition ease-in-out after:duration-500
    hover:after:left-[100%] dark:bg-indigo-950 dark:bg-opacity-50 max-md:relative">
      <div className="container flex justify-between w-full">
        <button
          onClick={handleCloseOpenMobileMenu}
          type="button"
          className="relative group md:hidden">
          <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all ring-0 ring-blue-800 dark:ring-white dark:ring-opacity-50 hover:ring-8 group-focus:ring-4 ring-opacity-50 duration-200 shadow-lg shadow-blue-200">
            <div
              className={`transform transition-all duration-150 overflow-hidden ${
                isMenuOpen ? 'translate-y-3' : '-translate-y-5'
              }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[34px] w-9 animate-bounce text-white"
                fill="none"
                viewBox="0 0 26 28"
                stroke="currentColor"
                strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>

            <div
              className={`flex flex-col justify-between w-[23px] h-[25px] transform transition-all duration-300 origin-center overflow-hidden ${
                isMenuOpen ? '' : '-translate-y-3'
              }`}>
              <div
                className={`bg-white mb-[5px] h-[3px] w-full rounded transform transition-all duration-300 origin-left ${
                  isMenuOpen ? 'translate-y-6' : ''
                }`}
              />
              <div
                className={`bg-white mb-[5px] h-[3px] w-full rounded transform transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-6' : ''
                } delay-75`}
              />
              <div
                className={`bg-white h-[3px] w-full rounded transform transition-all duration-300 origin-left ${
                  isMenuOpen ? 'translate-y-6' : ''
                } delay-100`}
              />
            </div>
          </div>
        </button>

        {isMobile ? (
          <AnimatePresence>{isMenuOpen && <NavMenu locale={locale} />}</AnimatePresence>
        ) : (
          <NavMenu locale={locale} />
        )}

        <div className="flex gap-5 items-center">
          <label htmlFor="switcher" className="ml-2 flex justify-center cursor-pointer">
            <div className="relative flex justify-between w-[80px] h-[24px] rounded-full border-stone-50 border-2 border-solid">
              <input
                id="switcher"
                onChange={handleChangeLanguage}
                checked={currentLanguage !== i18n.locales[0]}
                type="checkbox"
                className="hidden peer"
              />
              <span className="text-center font-bold flex-grow relative z-20 self-center leading-6 transition text-white peer-checked:text-blue-500 peer-checked:font-bold">
                en
              </span>
              <span className="text-center font-bold flex-grow relative z-20 self-center leading-6 transition text-blue-500 peer-checked:text-white peer-checked:font-bold">
                ru
              </span>
              <span className="absolute toggle z-10 bg-blue-600 h-[21px] w-[40px] rounded-full transition-all top-0 left-0 peer-checked:left-[calc(100%-40px)]" />
            </div>
          </label>

          <motion.button
            className="rounded-full p-0.5 filter: invert sepia saturate-100 hue-rotate-77 brightness-128 contrast-120 w-[30px] h-[30px] shadow-xl shadow-blue-800 dark:shadow-yellow-500"
            onClick={handleChangeThemeMode}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}>
            {mode === 'dark' ? (
              <Image src={lightThemeIcon} alt="theme-icon" width={26} height={26} />
            ) : (
              <Image src={darkThemeIcon} alt="theme-icon" width={26} height={26} />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default LayoutNavbar;
