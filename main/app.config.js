export default {
  expo: {
    name: "persona",
    slug: "persona",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logos/app_icon.png",
    scheme: "persona",
    deepLinking: true,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.mohdaqdasasim.persona",
    },

    android: {
      package: "com.mohdaqdasasim.persona",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.mohdaqdasasim.persona",
      adaptiveIcon: {
        foregroundImage: "./assets/logos/app_icon.png",
        backgroundColor: "#000",
      },
      splash: {
        image: "./assets/logos/splash_icon.png",
        resizeMode: "contain",
        backgroundColor: "#000",
      },
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/logos/app_icon.png",
    },

    plugins: ["expo-router"],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      eas: {
        projectId: "4a00bc9a-6754-4776-8f2f-b50fe08d57e1",
      },
    },
  },
};
