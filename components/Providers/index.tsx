"use client";

import CustomDndContext from "@/components/CustomDndContext";
import ThemeProvider from "@/components/ThemeProvider";
import PlayerContextProvider from "@/context/PlayerContext";
import TimerContextProvider from "@/context/TimerContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PlayerContextProvider>
        <TimerContextProvider>
          <CustomDndContext>{children}</CustomDndContext>
        </TimerContextProvider>
      </PlayerContextProvider>
    </ThemeProvider>
  );
}

export default Providers;
