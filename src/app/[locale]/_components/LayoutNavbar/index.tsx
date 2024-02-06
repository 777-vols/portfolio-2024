'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import NavMenu from '@/components/UI/NavMenu';
import { themeIcons } from '@/constants';
import { useThemeSwitcher } from '@/hooks';
import { i18n } from '@/i18n/i18n.config';
import { ILocaleProps } from '@/types';

const { lightThemeIcon, darkThemeIcon } = themeIcons;

const LayoutNavbar = ({ locale }: ILocaleProps) => {
  const pathname = usePathname();
  const [, currentLanguage, ...restUrl] = pathname.split('/');

  const [mode, setThemeMode] = useThemeSwitcher();

  const router = useRouter();

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
      className="bg-slate-500 bg-opacity-50 h-20 flex items-center fixed z-20 w-full px-7
    after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r from-transparent via-slate-400 to-transparent after:transform after:-translate-x-full after:-z-10 transition ease-in-out after:duration-500
    hover:after:left-[200%] dark:bg-indigo-900 dark:bg-opacity-50">
      <div className="container flex justify-between w-full">
        <button type="button" className="relative group md:hidden">
          <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all ring-0 ring-blue-950 dark:ring-white dark:ring-opacity-50 hover:ring-8 group-focus:ring-4 ring-opacity-50 duration-200 shadow-lg">
            <div className="transform transition-all duration-150 overflow-hidden -translate-y-5 group-focus:translate-y-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-9 animate-bounce text-blue-950 dark:text-white"
                fill="none"
                viewBox="0 0 26 28"
                stroke="currentColor"
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>

            <div className="flex flex-col justify-between w-[23px] h-[23px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-3">
              <div className="bg-blue-950 dark:bg-white mb-[5px] h-[3px] w-full rounded transform transition-all duration-300 origin-left group-focus:translate-y-6" />
              <div className="bg-blue-950 dark:bg-white mb-[5px] h-[3px] w-full rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75" />
              <div className="bg-blue-950 dark:bg-white h-[3px] w-full rounded transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100" />
            </div>
          </div>
        </button>

        <NavMenu locale={locale} />

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
            className="rounded-full p-0.5 filter: invert sepia saturate-100 hue-rotate-77 brightness-128 contrast-120 w-[30px] h-[30px]"
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
