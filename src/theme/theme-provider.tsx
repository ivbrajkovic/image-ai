import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export const ThemeProvider = ({ children, ...other }: ThemeProviderProps) => {
  return <NextThemesProvider {...other}>{children}</NextThemesProvider>;
};
