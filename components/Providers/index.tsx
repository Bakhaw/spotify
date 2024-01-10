import CustomDndContext from "@/components/CustomDndContext";
import QueryProvider from "@/components/QueryProvider";
import ThemeProvider from "@/components/ThemeProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CustomDndContext>{children}</CustomDndContext>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default Providers;
