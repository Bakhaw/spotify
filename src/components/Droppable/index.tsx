import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";

interface DroppableProps {
  children: React.ReactNode;
  id: string;
}

const Droppable: React.FC<DroppableProps> = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames("rounded-md", isOver && "border")}
    >
      {children}
    </div>
  );
};

export default Droppable;
