import { useDroppable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

interface DroppableProps {
  children: React.ReactNode;
  id: string;
  name: string;
}

const Droppable: React.FC<DroppableProps> = ({ children, id, name }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      id,
      name,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-md",
        isOver && "ring ring-green-primary/80 scale-105 transition-all"
      )}
    >
      {children}
    </div>
  );
};

export default Droppable;
