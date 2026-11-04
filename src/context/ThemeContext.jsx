import { createContext, useContext, useEffect, useState } from 'react';
const Context = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme); }, [theme]);
  return <Context.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>{children}</Context.Provider>;
}
export const useTheme = () => useContext(Context);
