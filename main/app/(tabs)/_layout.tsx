import { TabBar } from "@/components";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerTitleAlign: "left",
        headerShown: false,
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
  );
}
