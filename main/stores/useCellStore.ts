// stores/useCellStore.ts
import { create } from "zustand";

export type PageKey = "home" | "productivity" | "wellness" | "creativity" | "companion";

export type Cell = {
  id: string;
  type: string;
  width: 1 | 2;
  height: 1 | 2 | 3 | 4 | 5;
};

type CellState = {
  layout: Record<PageKey, Cell[]>;
  isEditing: boolean;
  toggleEditing: () => void;
  getCells: (page: PageKey) => Cell[];
  setCells: (page: PageKey, cells: Cell[]) => void;
  addCell: (page: PageKey, cell: Omit<Cell, "width" | "height">) => void;
  removeCell: (page: PageKey, cellId: string) => void;
};

export const useCellStore = create<CellState>((set, get) => ({
  layout: {
    home: [
      { id: "todayTasks", type: "Today’s Tasks", width: 2, height: 3 },
      { id: "moodCheck", type: "Mood Check-In", width: 1, height: 3 },
      { id: "quote", type: "Motivational Quote", width: 1, height: 3 },
      { id: "quickJournal", type: "Quick Journal Prompt", width: 2, height: 3 },
      { id: "focusToday", type: "Today’s Focus Timer", width: 1, height: 3 },
      { id: "shortcuts", type: "Shortcut Buttons (Projects, Sleep, Goals)", width: 2, height: 3 },
    ],
    productivity: [
      { id: "task", type: "Task Manager", width: 2, height: 3 },
      { id: "timetable", type: "Timetable", width: 2, height: 3 },
      { id: "project", type: "Project Manager", width: 2, height: 3 },
      { id: "goal", type: "Goal Setter", width: 2, height: 3 },
      { id: "focus", type: "Focus Timer", width: 2, height: 3 },
      { id: "reminder", type: "Smart Event Reminder", width: 2, height: 3 },
    ],
    wellness: [
      { id: "sleep", type: "Sleep Cycle Tracker", width: 2, height: 3 },
      { id: "food", type: "Food Diary", width: 2, height: 3 },
      { id: "mood", type: "Mood Tracker", width: 2, height: 3 },
      { id: "mindfulness", type: "Mindfulness Hub", width: 2, height: 3 },
      { id: "habits", type: "Habit Tracker", width: 2, height: 3 },
      { id: "budget", type: "Budget Tracker", width: 2, height: 3 },
    ],
    creativity: [
      { id: "reading", type: "Reading Tracker", width: 2, height: 3 },
      { id: "media", type: "Media Tracker", width: 2, height: 3 },
      { id: "moment", type: "Moment Logger", width: 2, height: 3 },
      { id: "library", type: "Digital Library", width: 2, height: 3 },
      { id: "reflection", type: "Reflection Prompts", width: 2, height: 3 },
    ],
    companion: [
      { id: "chat", type: "AI Assistant Chat", width: 2, height: 3 },
      { id: "theme", type: "Theme Customizer", width: 2, height: 3 },
      { id: "social", type: "Social Media Dashboard", width: 2, height: 3 },
      { id: "analytics", type: "Personal Analytics", width: 2, height: 3 },
      { id: "settings", type: "App Settings", width: 2, height: 3 },
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
          { ...cell, width: 2, height: 3 }, // default size
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
