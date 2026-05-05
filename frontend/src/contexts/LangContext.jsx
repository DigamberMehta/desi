import React, { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem("desi_lang") || "en",
  );

  useEffect(() => {
    localStorage.setItem("desi_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const t = (obj) =>
    obj && typeof obj === "object" ? obj[lang] || obj.en : obj;
  const formatAED = (aedVal) => {
    const aedNum =
      typeof aedVal === "number"
        ? Math.round(aedVal)
        : Math.round(parseFloat(aedVal) || 0);
    return lang === "ar"
      ? `${aedNum.toLocaleString("en-US")} د.إ`
      : `AED ${aedNum.toLocaleString("en-US")}`;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t, formatAED }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
