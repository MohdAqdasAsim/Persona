import DraggableCell from "@/components/DraggableCell";
import { useCellStore } from "@/stores/useCellStore";
import React from "react";
import {
  FlatList,
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

  const currentIds = new Set(cells.map((c) => c.id));
  const availableCells = availableCellsByPage["home"].filter(
    (c) => !currentIds.has(c.id)
  );

  const handleDrop = (id: string, newX: number, newY: number) => {
    const updated = cells.map((c) =>
      c.id === id
        ? {
            ...c,
            x: newX,
            y: newY,
            width: c.width ?? 1,
            height: c.height ?? 1,
          }
        : c
    );

    // TEMP debug
    const hasIncomplete = updated.some(
      (c) => c.x == null || c.y == null || c.width == null || c.height == null
    );

    if (hasIncomplete) {
      console.error(
        "🚨 Incomplete cell found in update",
        JSON.stringify(updated)
      );
      return;
    }

    setCells("home", updated);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <TouchableWithoutFeedback onLongPress={toggleEditing}>
        <View
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </TouchableWithoutFeedback>

      {/* Render all draggable cells */}
      {cells.map((cell) => (
        <DraggableCell key={cell.id} cell={cell} onDrop={handleDrop} />
      ))}

      {/* Add cell UI */}
      {isEditing && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 160,
            padding: 12,
          }}
        >
          <FlatList
            horizontal
            data={availableCells}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => addCell("home", item)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: 12,
                  marginRight: 12,
                }}
              >
                <Text style={{ color: "white" }}>{item.type}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

export default Home;
