import { urls } from '@/constants';
import { DictionaryType } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/i18n.config';

export const getLinks = (locale: Locale, linksNames: DictionaryType['navbar']['linksNames']) => {
  const { home, about, projects, contacts } = linksNames;

  return [
    {
      name: home,
      path: `/${locale}${urls.home}`,
    },
    {
      name: about,
      path: `/${locale}${urls.about}`,
    },
    {
      name: projects,
      path: `/${locale}${urls.projects}`,
    },
    {
      name: contacts,
      path: `/${locale}${urls.contacts}`,
    },
  ];
};

export const isActivePath = (pathName: string, path: string) => {
  const localeRegExp = /ru(\/)?|en(\/)?/;
  return pathName.replace(localeRegExp, '') === path.replace(localeRegExp, '');
};
