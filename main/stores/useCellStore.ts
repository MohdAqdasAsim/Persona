// stores/useCellStore.ts
import { create } from "zustand";

export type PageKey = "home" | "productivity" | "wellness" | "creativity" | "companion";

export type Cell = {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type CellState = {
  layout: Record<PageKey, Cell[]>;
  isEditing: boolean;
  toggleEditing: () => void;
  getCells: (page: PageKey) => Cell[];
  setCells: (page: PageKey, cells: Cell[]) => void;
  addCell: (page: PageKey, cell: Omit<Cell, "x" | "y" | "width" | "height">) => void;
  removeCell: (page: PageKey, cellId: string) => void;
};

export const useCellStore = create<CellState>((set, get) => ({
  layout: {
    home: [
      { id: "todayTasks", type: "Today’s Tasks", x: 0, y: 0, width: 1, height: 1 },
      { id: "moodCheck", type: "Mood Check-In", x: 1, y: 0, width: 1, height: 1 },
      { id: "quote", type: "Motivational Quote", x: 2, y: 0, width: 1, height: 1 },
      { id: "quickJournal", type: "Quick Journal Prompt", x: 0, y: 1, width: 2, height: 1 },
      { id: "focusToday", type: "Today’s Focus Timer", x: 2, y: 1, width: 2, height: 1 },
      { id: "shortcuts", type: "Shortcut Buttons (Projects, Sleep, Goals)", x: 0, y: 2, width: 3, height: 1 },
    ],
    productivity: [
      { id: "task", type: "Task Manager", x: 0, y: 0, width: 2, height: 1 },
      { id: "timetable", type: "Timetable", x: 2, y: 0, width: 2, height: 1 },
      { id: "project", type: "Project Manager", x: 0, y: 1, width: 2, height: 1 },
      { id: "goal", type: "Goal Setter", x: 2, y: 1, width: 2, height: 1 },
      { id: "focus", type: "Focus Timer", x: 0, y: 2, width: 4, height: 1 },
      { id: "reminder", type: "Smart Event Reminder", x: 0, y: 3, width: 4, height: 1 },
    ],
    wellness: [
      { id: "sleep", type: "Sleep Cycle Tracker", x: 0, y: 0, width: 1, height: 1 },
      { id: "food", type: "Food Diary", x: 1, y: 0, width: 1, height: 1 },
      { id: "mood", type: "Mood Tracker", x: 2, y: 0, width: 1, height: 1 },
      { id: "mindfulness", type: "Mindfulness Hub", x: 3, y: 0, width: 1, height: 1 },
      { id: "habits", type: "Habit Tracker", x: 0, y: 1, width: 2, height: 1 },
      { id: "budget", type: "Budget Tracker", x: 2, y: 1, width: 2, height: 1 },
    ],
    creativity: [
      { id: "reading", type: "Reading Tracker", x: 0, y: 0, width: 1, height: 1 },
      { id: "media", type: "Media Tracker", x: 1, y: 0, width: 1, height: 1 },
      { id: "moment", type: "Moment Logger", x: 2, y: 0, width: 1, height: 1 },
      { id: "library", type: "Digital Library", x: 0, y: 1, width: 2, height: 1 },
      { id: "reflection", type: "Reflection Prompts", x: 2, y: 1, width: 2, height: 1 },
    ],
    companion: [
      { id: "chat", type: "AI Assistant Chat", x: 0, y: 0, width: 2, height: 1 },
      { id: "theme", type: "Theme Customizer", x: 2, y: 0, width: 2, height: 1 },
      { id: "social", type: "Social Media Dashboard", x: 0, y: 1, width: 2, height: 1 },
      { id: "analytics", type: "Personal Analytics", x: 2, y: 1, width: 2, height: 1 },
      { id: "settings", type: "App Settings", x: 0, y: 2, width: 4, height: 1 },
    ],
  },

  isEditing: false,
  toggleEditing: () =>
    set((state) => ({ isEditing: !state.isEditing })),

  getCells: (page) => get().layout[page],

  setCells: (page, cells) =>
    set((state) => ({
      layout: { ...state.layout, [page]: cells },
    })),

  addCell: (page, cell) =>
    set((state) => ({
      layout: {
        ...state.layout,
        [page]: [
          ...state.layout[page],
          { ...cell, x: 0, y: 0, width: 1, height: 1 }, // default position and size
        ],
      },
    })),

  removeCell: (page, cellId) =>
    set((state) => ({
      layout: {
        ...state.layout,
        [page]: state.layout[page].filter((cell) => cell.id !== cellId),
      },
    })),
}));
