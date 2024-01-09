import NavMenu from '@/components/UI/NavMenu';
import { getDictionary } from '@/i18n/getDictionary';
import { ILocaleProps } from '@/types';

const LayoutNavbar = ({ locale }: ILocaleProps) => {
  const { navbar } = getDictionary(locale);
  const { title } = navbar;

  return (
    <header className="bg-black bg-opacity-60 h-20 flex items-center fixed z-50 w-full">
      <div className="container flex justify-between">
        <h4 className="font-pacifico text-2xl">{title}</h4>
        <NavMenu locale={locale} />
      </div>
    </header>
  );
};

export default LayoutNavbar;
