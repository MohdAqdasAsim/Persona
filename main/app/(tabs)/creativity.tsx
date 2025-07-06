import CellRenderer from "@/components/CellRenderer";
import { useCellStore } from "@/stores/useCellStore";
import React from "react";
import { ScrollView } from "react-native";

function Creativity() {
  const cells = useCellStore((s) => s.getCells("creativity"));

  return (
    <ScrollView className="flex-1 px-4 py-6 space-y-4">
      {cells.map((cell) => (
        <CellRenderer key={cell.id} type={cell.type} />
      ))}
    </ScrollView>
  );
}

export default Creativity;
