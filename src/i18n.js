import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json"; // Arquivo de tradução para inglês
import pt from "./locales/pt.json"; // Arquivo de tradução para português
import es from "./locales/es.json"; // Arquivo de tradução para espanhol

i18n
  .use(initReactI18next) // Passando o i18next para o react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      pt: {
        translation: pt,
      },
      es: {
        translation: es,
      },
    },
    lng: "en", // idioma padrão
    fallbackLng: "en", // idioma de fallback caso não encontre a tradução
    interpolation: {
      escapeValue: false, // React já escapa as variáveis
    },
  });

export default i18n;
