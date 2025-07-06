import { Header, TabBar } from "@/components";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[theme].bg }}>
      <StatusBar style="light" />
      <Header />

      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          lazy: false,
          headerTitleAlign: "left",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors[theme].bg,
          },
          sceneStyle: {
            backgroundColor: Colors[theme].bg,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
          }}
        />

        <Tabs.Screen
          name="productivity"
          options={{
            title: "Productivity",
          }}
        />

        <Tabs.Screen
          name="wellness"
          options={{
            title: "Wellness",
          }}
        />

        <Tabs.Screen
          name="creativity"
          options={{
            title: "Creativity",
          }}
        />

        <Tabs.Screen
          name="companion"
          options={{
            title: "Companion",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
