import assets from "@/assets/assets";
import { BasicWrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: Colors[theme].onboarding.bg }}
    >
      <Image
        source={assets.logos.appIcon}
        className="absolute w-[512px] h-[512px] opacity-10 aspect-square"
        resizeMode="contain"
      />
      <View className="w-4/5 flex items-center justify-center">
        <Text
          style={{ color: Colors[theme].onboarding.text }}
          className="text-7xl font-bold mb-2"
        >
          Meet Persona.
        </Text>
        <Text
          style={{ color: Colors[theme].onboarding.text }}
          className="text-6xl font-semibold mb-2 opacity-65"
        >
          Your life, reflected.
        </Text>
        <LinearGradient
          colors={[
            Colors[theme].onboarding.btnGradient[0],
            Colors[theme].onboarding.btnGradient[1],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl h-12 overflow-hidden my-2 mt-4 w-full"
        >
          <Pressable
            android_ripple={{ color: Colors[theme].onboarding.btnRipple }}
            className="w-full h-full flex items-center justify-center"
            onPress={() => router.replace("/auth/signup")}
          >
            <Text
              className="text-2xl text-center font-bold"
              style={{ color: Colors[theme].onboarding.btnText }}
            >
              Start Your Journey
            </Text>
          </Pressable>
        </LinearGradient>
      </View>

      <View className="w-full flex flex-row items-center justify-center">
        <Text
          className="opacity-60"
          style={{ color: Colors[theme].onboarding.text }}
        >
          Already have an account?{" "}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.replace("/auth/login");
          }}
        >
          <Text
            className="opacity-85"
            style={{ color: Colors[theme].textPrimary }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasicWrapper(OnBoarding);
