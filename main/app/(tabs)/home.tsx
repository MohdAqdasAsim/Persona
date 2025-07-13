import DraggableCell from "@/components/DraggableCell";
import { useCellStore } from "@/stores/useCellStore";
import { groupCells } from "@/utils/groupCells";
import React, { useRef } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { availableCellsByPage } from "../common/edit-cell";

function Home() {
  const cells = useCellStore((s) => s.getCells("home"));
  const isEditing = useCellStore((s) => s.isEditing);
  const toggleEditing = useCellStore((s) => s.toggleEditing);
  const addCell = useCellStore((s) => s.addCell);
  const setCells = useCellStore((s) => s.setCells);

  const scrollRef = useRef<ScrollView>(null);

  const currentIds = new Set(cells.map((c) => c.id));
  const availableCells = availableCellsByPage["home"].filter(
    (c) => !currentIds.has(c.id)
  );

  const onDragEnd = (id: string, offsetY: number) => {
    const index = cells.findIndex((c) => c.id === id);
    if (index === -1) return;

    const cellHeight = 80 * 3 + 16; // Max height + margin
    const newIndex = Math.min(
      Math.floor((index * cellHeight + offsetY) / cellHeight),
      cells.length - 1
    );

    const updated = [...cells];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    setCells("home", updated);
  };

  const grouped = groupCells(cells);

  return (
    <View className="flex-1 bg-black">
      {!isEditing && (
        <TouchableWithoutFeedback onLongPress={toggleEditing}>
          <View className="absolute inset-0 z-10" />
        </TouchableWithoutFeedback>
      )}

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 160,
          gap: 12,
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {grouped.map((row, index) => (
          <View
            key={`row-${index}`}
            className="flex-row justify-center gap-4 mb-3"
          >
            {row.map((cell) => (
              <DraggableCell
                key={cell.id}
                cell={cell}
                isEditing={isEditing}
                onDragEnd={onDragEnd}
                scrollRef={scrollRef}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      {isEditing && (
        <View className="absolute bottom-0 w-full h-40 px-3 py-2 bg-black/90 z-20">
          <FlatList
            horizontal
            data={availableCells}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => addCell("home", item)}
                className="bg-white/10 rounded-xl px-4 py-3 mr-3"
              >
                <Text className="text-white">{item.type}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

export default Home;
