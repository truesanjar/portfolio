import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n";

const AppContext = createContext(null);

const LS_LANG = "site_lang";
const LS_THEME = "site_theme";

// Забонҳои дастгиришаванда
const SUPPORTED_LANGS = ["tj", "ru", "en"];

// Функсия барои гирифтани забони браузер
const getBrowserLanguage = () => {
  // Забони асосии браузерро мегирем
  const browserLang = navigator.language || navigator.userLanguage;
  // Қисмати асосии забонро мегирем (масалан "en-US" -> "en")
  const langCode = browserLang.split("-")[0].toLowerCase();
  
  // Агар забон дастгиришаванда бошад, онро бармегардонем
  if (SUPPORTED_LANGS.includes(langCode)) {
    return langCode;
  }
  
  // Агар забони дастгоҳ "tg" бошад, онро ба "tj" табдил медиҳем
  if (langCode === "tg") {
    return "tj";
  }
  
  // Дар акси ҳол забони англисиро бармегардонем
  return "en";
};

export const AppProvider = ({ children }) => {
  // Функсия барои гирифтани забони ибтидоӣ
  const getInitialLang = () => {
    // Аввал забони дар localStorage нигоҳдошташударо месанҷем
    const savedLang = localStorage.getItem(LS_LANG);
    if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      return savedLang;
    }
    
    // Агар забони нигоҳдошташуда набошад, забони браузерро месанҷем
    const browserLang = getBrowserLanguage();
    
    // Агар забони браузер дар рӯйхати забонҳои дастгиришаванда бошад
    if (SUPPORTED_LANGS.includes(browserLang)) {
      return browserLang;
    }
    
    // Агар забони браузер "tg" бошад, "tj"-ро бармегардонем
    if (browserLang === "tg") {
      return "tj";
    }
    
    // Дар акси ҳол забони англисиро ҳамчун default бармегардонем
    return "en";
  };
  
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(() => localStorage.getItem(LS_THEME) || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(LS_THEME, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LS_LANG, lang);
    document.documentElement.lang = lang === "tj" ? "tg" : lang;
  }, [lang]);

  const t = translations[lang] || translations.tj;

  const value = { lang, setLang, theme, setTheme, t };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};