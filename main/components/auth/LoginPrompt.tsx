import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LoginPrompt = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <FontAwesome name="lock" size={48} color={Colors[theme].textPrimary} />
      <Text
        className="text-2xl font-semibold text-center"
        style={{ color: Colors[theme].textPrimary }}
      >
        You're not logged in
      </Text>
      <Text
        className="text-base text-center opacity-70"
        style={{ color: Colors[theme].textPrimary }}
      >
        Tap below to unlock your journey and explore the memories!
      </Text>
      <TouchableOpacity
        className="bg-indigo-600 px-6 py-3 rounded-xl shadow-md active:opacity-80"
        activeOpacity={0.8}
        onPress={() => router.push("/auth/login")}
      >
        <Text className="text-white text-base font-bold">🔐 Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPrompt;
