import { useId } from "react";
import { useDraggable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

interface DraggableProps {
  children: React.ReactNode;
  className?: string;
  id: string;
}

const Draggable: React.FC<DraggableProps> = ({ children, className, id }) => {
  const uniqueId = useId();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `draggable-${uniqueId}-${id}`,
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
    <>
      <div
        className={cn(
          "hidden sm:block border-none outline-none rounded-md",
          isDragging && "bg-[#66677070] text-white animate-pulse",
          className
        )}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {children}
      </div>

      <div className="block sm:hidden">{children}</div>
    </>
  );
};

export default Draggable;
