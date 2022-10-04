export type ThemeType = "light" | "dark";
export type AppContextType = {
  theme?: ThemeType;
  toggleTheme?: () => void;
};
