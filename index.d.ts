import { type Locale } from '@/i18n/i18n.config';

declare global {
  declare interface ILocaleParams {
    params: { locale: Locale };
  }
}

export {};
