import { createI18n } from 'vue-i18n';
import en from '@/langs/en.json';

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en,
  },
  missing: (key: string, item: string) => {
    item = '';
    return item;
  },
});

const loadedLanguages = ['en'];

export function setI18nLanguage(lang: any): string {
  i18n.global.locale.value = lang;
  document.querySelector('html')?.setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang: any): Promise<string> {
  // If the same language
  if (i18n.global.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `@/langs/${lang}.json`).then(
    (messages) => {
      i18n.global.setLocaleMessage(lang, messages.default);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    }
  );
}

export default i18n;
