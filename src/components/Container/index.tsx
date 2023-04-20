interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="w-full h-screen border-2overflow-x-hidden overflow-y-scroll scrollbar-hide">
    {children}
  </div>
);

export default Container;
