import { useCellStore } from "@/stores/useCellStore";
import { scalePx } from "@/utils/scale";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CellRenderer({
  type,
  size = "small",
  height = 1,
}: {
  type: string;
  size?: "small" | "medium" | "large";
  height?: 1 | 2 | 3 | 4 | 5;
}) {
  const widthMap = {
    small: 100,
    medium: 160,
    large: 240,
  };

  const width = widthMap[size];
  const boxHeight = height * 100; // each height unit = 100px

  const scaled = scalePx({ width, height: boxHeight });

  const removeCell = useCellStore((s) => s.removeCell);

  const isEditing = useCellStore((s) => s.isEditing);

  return (
    <View
      style={[
        styles.cell,
        {
          width: scaled.width,
          height: scaled.height,
        },
      ]}
      className="relative"
    >
      {isEditing && (
        <TouchableOpacity
          onPress={() => removeCell("home", type)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
          className="bg-white rounded-full p-2"
        >
          <Text style={{ color: "#000" }}>X</Text>
        </TouchableOpacity>
      )}
      <Text allowFontScaling={false} style={styles.text}>
        {type}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});
