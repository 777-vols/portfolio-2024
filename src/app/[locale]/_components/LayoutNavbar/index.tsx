import NavMenu from '@/components/UI/NavMenu';
import { getDictionary } from '@/i18n/getDictionary';
import { ILocaleProps } from '@/types';

const LayoutNavbar = ({ locale }: ILocaleProps) => {
  const { navbar } = getDictionary(locale);
  const { title } = navbar;

  return (
    <header className="flex">
      <h4>{title}</h4>
      <NavMenu locale={locale} />
    </header>
  );
};

export default LayoutNavbar;
