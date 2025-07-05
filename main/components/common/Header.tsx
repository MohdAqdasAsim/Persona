import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  const router = useRouter();
  const segments = useSegments();
  const { theme } = useTheme();
  const { isLoggedIn, name, profileImage } = useAuth();

  const currentPage = segments[segments.length - 1] || "home";

  const handleCellEdit = () => {
    router.push(`/common/edit-cell?page=${currentPage}`);
  };

  return (
    <View className="w-full flex flex-row items-center justify-between px-6 h-20">
      <Text
        style={{ color: Colors[theme].header.text }}
        className="font-bold text-2xl"
      >
        Hi {!name ? "User" : name}!
      </Text>

      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCellEdit}
          className="p-2 rounded-full"
        >
          <Feather name="edit" size={20} color={Colors[theme].header.text} />
        </TouchableOpacity>

        {isLoggedIn ? (
          <Image
            source={{
              uri: profileImage || "https://example.com/default-avatar.png",
            }}
            className="w-10 h-10 rounded-full bg-white"
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/auth/login")}
            className="px-4 py-2 rounded-full border"
            style={{
              backgroundColor: Colors[theme].header.background,
              borderColor: Colors[theme].header.border,
            }}
          >
            <Text
              className="font-medium"
              style={{ color: Colors[theme].header.text }}
            >
              Log In
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
