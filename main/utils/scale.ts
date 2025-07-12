// utils/scale.ts
import { PixelRatio } from "react-native";

type ScaleRect = { width: number; height: number };

export function scalePx({ width, height }: ScaleRect) {
  const scale = PixelRatio.get();
  return {
    width: width / scale,
    height: height / scale,
  };
}
