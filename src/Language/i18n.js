import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Women": "Women",
            "Kid's": "Kid's",
            "Garbha Sanskar": "Garbha Sanskar",
            "Food & Fitness": "Food & Fitness",
            "Growth & Changes": "Growth & Changes",
            "List of Women's": "List of Women's",
            "New Registration": "New Registration",
            "List of Kid's": "List of Kid's"
        }
    },
    hi: {
        translation: {
            "Women": "औरत",
            "Kid's": "बच्चे",
            "Garbha Sanskar": "गर्भ संस्कार",
            "Food & Fitness": "भोजन और स्वास्थ्य",
            "Growth & Changes": "विकास और परिवर्तन",
            "List of Women's": "महिलाओं की सूची",
            "New Registration": "नया पंजीकरण",
            "List of Kid's": "बच्चों की सूची"
        }
    },
    ma: {
        translation: {
            "Women": "महिला",
            "Kid's": "लहान मुलांचे",
            "Garbha Sanskar": "गर्भसंस्कार",
            "Food & Fitness": "अन्न आणि योग्यता",
            "Growth & Changes": "वाढ आणि बदल",
            "List of Women's": "महिलांची यादी",
            "New Registration": "नवीन नोंदणी",
            "List of Kid's": "मुलांची यादी"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;