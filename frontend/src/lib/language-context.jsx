import * as React from "react";
import { getTranslations } from "./translations";
const LanguageContext = React.createContext(null);
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("shuruaat_language");
      if (saved) return saved;
    }
    return "hi";
  });
  const [businessName, setBusinessNameState] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("shuruaat_business_name");
      if (saved) return saved;
    }
    return "";
  });
  const setLanguage = React.useCallback((lang) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("shuruaat_language", lang);
    }
  }, []);
  const setBusinessName = React.useCallback((name) => {
    setBusinessNameState(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("shuruaat_business_name", name);
    }
  }, []);
  const t = React.useCallback(
    (key) => {
      const dict = getTranslations(language);
      if (dict && key in dict) {
        return dict[key];
      }
      const engDict = getTranslations("en");
      return engDict[key] || String(key);
    },
    [language]
  );
  const value = React.useMemo(
    () => ({ language, setLanguage, t, businessName, setBusinessName }),
    [language, setLanguage, t, businessName, setBusinessName]
  );
  return <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>;
}
export function useTranslation() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
