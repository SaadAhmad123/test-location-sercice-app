import React, { useRef, useState } from "react";
import { AppContextType, ThemeType } from "./types";
import AppContext from "./Context";
import useTheme from "../hooks/useTheme";

interface IAppContextProvider {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: IAppContextProvider) => {
  const [theme, setTheme] = useState<ThemeType>("light");
  const mainRef = useRef<HTMLElement>(null);
  const { toggleTheme } = useTheme(mainRef, {
    themeLocalStorageKey: "appTheme",
    onChange: (theme) => setTheme(theme),
  });

  const value = {
    theme,
    toggleTheme,
  } as AppContextType;

  return (
    <AppContext.Provider value={value}>
      <main ref={mainRef}>{children}</main>
    </AppContext.Provider>
  );
};
