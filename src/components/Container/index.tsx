import useTrack from "@/hooks/useTrack";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const track = useTrack();

  return (
    <div
      className="w-full border-2overflow-x-hidden overflow-y-scroll scrollbar-hide"
      style={{
        height: track ? "calc(100vh - 80px)" : "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
