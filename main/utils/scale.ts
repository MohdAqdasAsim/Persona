// utils/scale.ts
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

// Define grid in terms of screen width
const GRID_COLUMNS = 2; // You can change this to 3 or 4 if you want more columns
const CELL_WIDTH = screenWidth / GRID_COLUMNS;
const CELL_HEIGHT = 120; // Fixed height in pixels (can also be dynamic if needed)

export const GRID_LAYOUT = {
  columns: GRID_COLUMNS,
  cellWidth: CELL_WIDTH,
  cellHeight: CELL_HEIGHT,
};

// For backward compatibility if needed
type ScaleRect = { width: number; height: number };

export function scalePx({ width, height }: ScaleRect) {
  return {
    width,
    height,
  };
}
