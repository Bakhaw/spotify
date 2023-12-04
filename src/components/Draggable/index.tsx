import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  children: React.ReactNode;
  id: string;
}

const Draggable: React.FC<DraggableProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
    data: {
      id,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;
