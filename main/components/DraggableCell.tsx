// components/DraggableCell.tsx
import { Cell } from "@/stores/useCellStore";
import { scalePx } from "@/utils/scale";
import React from "react";
import { Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { runOnJS } from "react-native-reanimated";

const GRID_CELL = scalePx({ width: 100, height: 100 });

type Props = {
  cell: Cell;
  onDrop: (id: string, x: number, y: number) => void;
};

export default function DraggableCell({ cell, onDrop }: Props) {
  const safeX = cell.x ?? 0;
  const safeY = cell.y ?? 0;
  const safeWidth = cell.width ?? 1;
  const safeHeight = cell.height ?? 1;

  const translateX = useSharedValue(safeX * GRID_CELL.width);
  const translateY = useSharedValue(safeY * GRID_CELL.height);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      const snappedX = Math.round(translateX.value / GRID_CELL.width);
      const snappedY = Math.round(translateY.value / GRID_CELL.height);

      translateX.value = withSpring(snappedX * GRID_CELL.width);
      translateY.value = withSpring(snappedY * GRID_CELL.height);

      // Inside onEnd handler
      runOnJS(onDrop)(cell.id, snappedX, snappedY);
    },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  try {
    return (
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            animStyle,
            {
              position: "absolute",
              width: safeWidth * GRID_CELL.width,
              height: safeHeight * GRID_CELL.height,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 12,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ color: "white" }}>{cell.type}</Text>
        </Animated.View>
      </PanGestureHandler>
    );
  } catch (e) {
    console.error("🚨 DraggableCell render crash", e);
    return <Text style={{ color: "red" }}>Crash</Text>;
  }
}
