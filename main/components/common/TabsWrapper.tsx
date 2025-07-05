// components/TabsWrapper.tsx
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

const TabsWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  return ({ ...props }: P) => {
    const { theme } = useTheme();

    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: Colors[theme].bg }]}>
        <StatusBar style="light" />
        <Header />
        <WrappedComponent {...(props as P)} />
      </SafeAreaView>
    );
  };
};

export default TabsWrapper;
