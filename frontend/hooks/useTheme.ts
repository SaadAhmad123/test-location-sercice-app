import { ThemeType } from "../AppContext/types";
import React, { useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useReactiveRef from "./useReactiveRef";

interface IUseThemeOptions {
  themeLocalStorageKey?: string;
  onChange?: (value: ThemeType) => void;
}

const useTheme = (
  layoutRef: React.RefObject<HTMLElement>,
  options?: IUseThemeOptions
) => {
  const { themeLocalStorageKey, onChange } = options || {};
  const { get: theme, set: setTheme } = useReactiveRef<ThemeType>(
    "light",
    onChange
  );
  const { get: localStoredTheme, set: setLocalStoredTheme } =
    useLocalStorage<ThemeType>(themeLocalStorageKey);
  const _setTheme = useCallback(
    (theme: ThemeType) => {
      setTheme(theme);
      setLocalStoredTheme(theme);
      layoutRef.current.className = theme;
    },
    [setTheme, layoutRef]
  );

  const toggleTheme = useCallback(() => {
    if (theme() === "dark") _setTheme("light");
    else _setTheme("dark");
  }, [theme, _setTheme]);

  useEffect(() => {
    let _theme = localStoredTheme();
    if (!_theme) _theme = "light";
    setTheme(_theme);
    layoutRef.current.className = _theme;
  }, []); // eslint-disable-line

  return {
    theme: theme,
    setTheme: _setTheme,
    toggleTheme,
  };
};

export default useTheme;
