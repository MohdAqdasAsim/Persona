// stores/useCellStore.ts
import { create } from "zustand";

export type PageKey = "home" | "productivity" | "wellness" | "creativity" | "companion";

type Cell = {
  id: string;
  type: string;
};

type CellState = {
  layout: Record<PageKey, Cell[]>;
  getCells: (page: PageKey) => Cell[];
  setCells: (page: PageKey, cells: Cell[]) => void;
  addCell: (page: PageKey, cell: Cell) => void;
  removeCell: (page: PageKey, cellId: string) => void;
};

export const useCellStore = create<CellState>((set, get) => ({
  layout: {
    home: [
      { id: "todayTasks", type: "Today’s Tasks" },
      { id: "moodCheck", type: "Mood Check-In" },
      { id: "quote", type: "Motivational Quote" },
      { id: "quickJournal", type: "Quick Journal Prompt" },
      { id: "focusToday", type: "Today’s Focus Timer" },
      { id: "shortcuts", type: "Shortcut Buttons (Projects, Sleep, Goals)" },
    ],
    productivity: [
      { id: "task", type: "Task Manager" },
      { id: "timetable", type: "Timetable" },
      { id: "project", type: "Project Manager" },
      { id: "goal", type: "Goal Setter" },
      { id: "focus", type: "Focus Timer" },
      { id: "reminder", type: "Smart Event Reminder" },
    ],
    wellness: [
      { id: "sleep", type: "Sleep Cycle Tracker" },
      { id: "food", type: "Food Diary" },
      { id: "mood", type: "Mood Tracker" },
      { id: "mindfulness", type: "Mindfulness Hub" },
      { id: "habits", type: "Habit Tracker" },
      { id: "budget", type: "Budget Tracker" },
    ],
    creativity: [
      { id: "reading", type: "Reading Tracker" },
      { id: "media", type: "Media Tracker" },
      { id: "moment", type: "Moment Logger" },
      { id: "library", type: "Digital Library" },
      { id: "reflection", type: "Reflection Prompts" },
    ],
    companion: [
      { id: "chat", type: "AI Assistant Chat" },
      { id: "theme", type: "Theme Customizer" },
      { id: "social", type: "Social Media Dashboard" },
      { id: "analytics", type: "Personal Analytics" },
      { id: "settings", type: "App Settings" },
    ],
  },

  getCells: (page) => get().layout[page],

  setCells: (page, cells) =>
    set((state) => ({
      layout: { ...state.layout, [page]: cells },
    })),

  addCell: (page, cell) =>
    set((state) => ({
      layout: {
        ...state.layout,
        [page]: [...state.layout[page], cell],
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
