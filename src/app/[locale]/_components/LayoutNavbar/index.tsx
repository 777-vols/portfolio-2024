'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import NavMenu from '@/components/UI/NavMenu';
import { socials, themeIcons } from '@/constants';
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
      className="bg-black bg-opacity-60 h-20 flex items-center fixed z-20 w-full
    after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r from-transparent via-slate-400 to-transparent after:transform after:-translate-x-full after:-z-10 transition ease-in-out after:duration-500
    hover:after:left-[200%]">
      <div className="container flex justify-between w-full">
        <NavMenu locale={locale} />

        <div className="flex gap-5 items-center">
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

          <label htmlFor="switcher" className="ml-2 flex justify-center cursor-pointer">
            <div className="relative flex justify-between w-[80px] h-[24px]">
              <input
                id="switcher"
                onChange={handleChangeLanguage}
                checked={currentLanguage !== i18n.locales[0]}
                type="checkbox"
                className="hidden peer"
              />
              <span className="text-center font-medium flex-grow relative z-20 self-center transition text-white peer-checked:text-blue-800">
                en
              </span>
              <span className="text-center font-medium flex-grow relative z-20 self-center transition text-blue-800 peer-checked:text-white">
                ru
              </span>
              <span className="absolute toggle z-10 bg-blue-800 h-[24px] w-[40px] rounded-full transition-all top-0 left-0 peer-checked:left-[calc(100%-40px)]" />
            </div>
          </label>

          <motion.button
            className="rounded-full p-0.5 filter: invert sepia saturate-100 hue-rotate-77 brightness-128 contrast-120"
            onClick={handleChangeThemeMode}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}>
            {mode === 'dark' ? (
              <Image src={lightThemeIcon} alt="theme-icon" width={22} height={22} />
            ) : (
              <Image src={darkThemeIcon} alt="theme-icon" width={22} height={22} />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default LayoutNavbar;
