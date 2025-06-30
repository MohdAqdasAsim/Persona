import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type Theme = keyof typeof Colors;
export type ThemeMode = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}>({
  theme: "dark",
  themeMode: "system",
  setThemeMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme(); // 'light' or 'dark'
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [loaded, setLoaded] = useState(false);

  const resolvedTheme: Theme =
    themeMode === "system"
      ? (systemColorScheme as Theme) || "light"
      : themeMode;

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem("themeMode", mode);
  };

  useEffect(() => {
    const loadSettings = async () => {
      const savedThemeMode = await AsyncStorage.getItem("themeMode");

      if (
        savedThemeMode === "light" ||
        savedThemeMode === "dark" ||
        savedThemeMode === "system"
      ) {
        setThemeModeState(savedThemeMode);
      }

      setLoaded(true);
    };

    if (!loaded) {
      loadSettings();
    }
  }, [loaded]);

  return (
    <ThemeContext.Provider
      value={{ theme: resolvedTheme, themeMode, setThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
