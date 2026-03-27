import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: any) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    carregarTema();
  }, []);

  async function carregarTema() {
    const tema = await AsyncStorage.getItem("tema");
    setDark(tema === "dark");
  }

  async function toggleTheme() {
    const novo = !dark;
    setDark(novo);
    await AsyncStorage.setItem("tema", novo ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}