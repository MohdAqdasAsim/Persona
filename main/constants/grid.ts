import { scalePx } from "@/utils/scale";

const scaled = scalePx({ width: 100, height: 100 });

export const GRID_CELL_WIDTH = scaled.width;
export const GRID_CELL_HEIGHT = scaled.height;
export const GRID_COLUMNS = 4;
export const GRID_GAP = 8;