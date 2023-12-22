import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@/lib/utils";

interface DraggableProps {
  children: React.ReactNode;
  id: string;
}

const Draggable: React.FC<DraggableProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `draggable-${id}`,
      data: {
        id,
      },
    });

  const style = transform
    ? {
        // opacity: 0.2,
        // transform: CSS.Transform.toString(transform),
      }
    : undefined;

  return (
    <div
      className={cn(
        "hidden sm:block border-none outline-none rounded-md",
        isDragging && "bg-[#66677070] text-white"
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
