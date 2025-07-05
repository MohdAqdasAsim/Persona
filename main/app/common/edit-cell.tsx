import { PageKey, useCellStore } from "@/stores/useCellStore";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

// AvailableCells.ts (or just above your component)
export const availableCellsByPage: Record<
  PageKey,
  { id: string; type: string }[]
> = {
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
  home: [
    // home-specific cells
    { id: "todayTasks", type: "Today’s Tasks" },
    { id: "moodCheck", type: "Mood Check-In" },
    { id: "quote", type: "Motivational Quote" },
    { id: "quickJournal", type: "Quick Journal Prompt" },
    { id: "focusToday", type: "Today’s Focus Timer" },
    { id: "shortcuts", type: "Shortcut Buttons" },
    // all others will be added below 👇
  ],
};

const allNonHomeCells = Object.entries(availableCellsByPage)
  .filter(([key]) => key !== "home")
  .flatMap(([_, cells]) => cells);

availableCellsByPage.home = [...availableCellsByPage.home, ...allNonHomeCells];

export default function EditCell() {
  const { page } = useLocalSearchParams();

  const pageKey = useMemo(() => {
    const validPages: PageKey[] = [
      "home",
      "productivity",
      "wellness",
      "creativity",
      "companion",
    ];
    return validPages.includes(page as PageKey) ? (page as PageKey) : "home";
  }, [page]);

  const cells = useCellStore((s) => s.getCells(pageKey));
  const setCells = useCellStore((s) => s.setCells);
  const addCell = useCellStore((s) => s.addCell);
  const removeCell = useCellStore((s) => s.removeCell);

  const currentIds = new Set(cells.map((c) => c.id));

  const handleAdd = (cell) => addCell(pageKey, cell);
  const handleRemove = (cellId: string) => removeCell(pageKey, cellId);

  const pageAvailableCells = availableCellsByPage[pageKey];

  return (
    <View className="bg-black flex-1 px-4 py-6">
      <Text className="text-white text-xl mb-4 capitalize">{page} Cells</Text>

      <DraggableFlatList
        data={cells}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setCells(pageKey, data)}
        renderItem={({ item, drag, isActive }) => (
          <ScaleDecorator>
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              className="bg-white/10 p-4 mb-4 rounded-xl flex-row items-center justify-between"
            >
              <Text className="text-white">{item.type}</Text>
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <Text className="text-red-400">Remove</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </ScaleDecorator>
        )}
      />

      <Text className="text-white text-xl my-4">Add More</Text>

      {pageAvailableCells
        .filter((c) => !currentIds.has(c.id))
        .map((cell) => (
          <View
            key={cell.id}
            className="bg-white/5 p-4 mb-4 rounded-xl flex-row items-center justify-between"
          >
            <Text className="text-white">{cell.type}</Text>
            <TouchableOpacity onPress={() => handleAdd(cell)}>
              <Text className="text-green-400">Add</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}
