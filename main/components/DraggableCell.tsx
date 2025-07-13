import { Cell } from "@/stores/useCellStore";
import React from "react";
import { Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  cell: Cell;
  isEditing: boolean;
  onDragEnd: (id: string, newIndex: number) => void;
};

export default function DraggableCell({ cell, isEditing, onDragEnd }: Props) {
  const offsetY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = offsetY.value;
    },
    onActive: (event, ctx: any) => {
      offsetY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      runOnJS(onDragEnd)(cell.id, 0); // For now, just reset to 0
      offsetY.value = withSpring(0);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetY.value }],
  }));

  return (
    <PanGestureHandler enabled={isEditing} onGestureEvent={gestureHandler}>
      <Animated.View
        className={`${
          cell.width === 2 ? "w-full" : "w-1/2"
        } bg-white/10 rounded-xl p-4 items-center justify-center`}
        style={[style, { height: cell.height * 80, marginBottom: 4 }]}
      >
        <Text className="text-white">{cell.type}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}
