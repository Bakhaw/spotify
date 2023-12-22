import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  pointerWithin,
} from "@dnd-kit/core";

import DragOverlayWrapper from "@/components/DragOverlayWrapper";

interface CustomDndContextProps {
  children: React.ReactNode;
}

const CustomDndContext: React.FC<CustomDndContextProps> = ({ children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin}>
      {children}
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default CustomDndContext;
