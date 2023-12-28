import CustomDndContext from "@/components/CustomDndContext";
import ThemeProvider from "@/components/ThemeProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CustomDndContext>{children}</CustomDndContext>
    </ThemeProvider>
  );
}

export default Providers;
