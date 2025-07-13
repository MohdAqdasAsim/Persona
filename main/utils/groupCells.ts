import { Cell } from "@/stores/useCellStore";

// Groups half-width cells into pairs, keeps full-width separate
export function groupCells(cells: Cell[]): Cell[][] {
  const groups: Cell[][] = [];
  let row: Cell[] = [];

  for (const cell of cells) {
    if (cell.width === 2) {
      if (row.length > 0) {
        groups.push(row);
        row = [];
      }
      groups.push([cell]); // Full width on its own
    } else if (cell.width === 1) {
      row.push(cell);
      if (row.length === 2) {
        groups.push(row);
        row = [];
      }
    }
  }

  if (row.length > 0) groups.push(row);
  return groups;
}
