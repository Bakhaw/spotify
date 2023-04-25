import { useRecoilValue } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";

interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  const currentTrackId = useRecoilValue(currentTrackIdState);

  return (
    <div
      className="w-full  overflow-x-hidden overflow-y-scroll scrollbar-hide"
      style={{
        // 144px = Navigation (64px) + Player (80px) height
        height: currentTrackId ? "calc(100vh - 144px)" : "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
