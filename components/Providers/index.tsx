"use client";

import CustomDndContext from "@/components/CustomDndContext";
import ThemeProvider from "@/components/ThemeProvider";
import PlayerContextProvider from "@/context/PlayerContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PlayerContextProvider>
        <CustomDndContext>{children}</CustomDndContext>
      </PlayerContextProvider>
    </ThemeProvider>
  );
}

export default Providers;
