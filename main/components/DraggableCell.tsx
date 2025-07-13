import { Cell } from "@/stores/useCellStore";
import React from "react";
import { ScrollView, Text } from "react-native";
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
  onDragEnd: (id: string, offsetY: number) => void;
  scrollRef: React.RefObject<ScrollView>;
};

export default function DraggableCell({
  cell,
  isEditing,
  onDragEnd,
  scrollRef,
}: Props) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = offsetX.value;
      ctx.startY = offsetY.value;
    },
    onActive: (event, ctx: any) => {
      offsetX.value = ctx.startX + event.translationX;
      offsetY.value = ctx.startY + event.translationY;

      if (event.absoluteY && scrollRef?.current) {
        runOnJS(() => {
          scrollRef.current?.scrollTo({
            y: event.absoluteY - 300,
            animated: false,
          });
        })();
      }
    },
    onEnd: () => {
      runOnJS(onDragEnd)(cell.id, offsetY.value);

      // Animate back to aligned position
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    zIndex: 10,
  }));

  return (
    <PanGestureHandler enabled={isEditing} onGestureEvent={gestureHandler}>
      <Animated.View
        className={`${
          cell.width === 2 ? "w-full" : "w-1/2"
        } bg-white/10 rounded-xl p-4 items-center justify-center`}
        style={[style, { height: cell.height * 80 }]}
      >
        <Text className="text-white">{cell.type}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}
