import { useRouter } from "next/navigation";
import { PullToRefresh } from "react-js-pull-to-refresh";

import CustomDndContext from "@/components/CustomDndContext";
import ThemeProvider from "@/components/ThemeProvider";
import PlayerContextProvider from "@/context/PlayerContext";
import TimerContextProvider from "@/context/TimerContext";

function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function onRefresh() {
    router.refresh();
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PullToRefresh
        pullDownContent={<div className="text-center">❤</div>}
        releaseContent={<div />}
        refreshContent={<div />}
        onRefresh={onRefresh}
        pullDownThreshold={200}
        startInvisible
        triggerHeight={50}
      >
        <PlayerContextProvider>
          <TimerContextProvider>
            <CustomDndContext>{children}</CustomDndContext>
          </TimerContextProvider>
        </PlayerContextProvider>
      </PullToRefresh>
    </ThemeProvider>
  );
}

export default Providers;
