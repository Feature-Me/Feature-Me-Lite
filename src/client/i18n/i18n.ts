import i18n from "i18next";
import { initReactI18next,useTranslation } from "react-i18next";

import en from "./en-us/en-us";
import ja from "./ja/ja"


try {
    const language: string = (localStorage.getItem("environment") && JSON.parse(localStorage.getItem("environment")!).language) || navigator.language.toLowerCase().slice(0,2);
    console.log("language:", language);
    
    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: en },
            ja: { translation: ja },
        },
        lng: language,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

} catch (error) {
    console.error(error);
    
}