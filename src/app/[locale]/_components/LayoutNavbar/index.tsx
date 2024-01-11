import Link from 'next/link';

import NavMenu from '@/components/UI/NavMenu';
import { urls } from '@/constants';
import { getDictionary } from '@/i18n/getDictionary';
import { ILocaleProps } from '@/types';

const { home } = urls;

const LayoutNavbar = ({ locale }: ILocaleProps) => {
  const { navbar } = getDictionary(locale);
  const { title } = navbar;

  return (
    <header className="bg-black bg-opacity-60 h-20 flex items-center fixed z-20 w-full">
      <div className="container flex justify-between">
        <Link className="font-pacifico text-2xl" href={`/${locale}${home}`}>
          {title}
        </Link>
        <NavMenu locale={locale} />
      </div>
    </header>
  );
};

export default LayoutNavbar;
