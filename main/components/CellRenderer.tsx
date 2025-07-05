// components/CellRenderer.tsx
import { Text, View } from "react-native";

export default function CellRenderer({ type }: { type: string }) {
  return (
    <View className="bg-white/10 border border-white/10 rounded-xl p-4 mb-4">
      <Text className="text-white text-base">{type}</Text>
    </View>
  );
}
