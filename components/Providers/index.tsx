import { useRouter } from "next/navigation";
import { RecoilRoot } from "recoil";
import { PullToRefresh } from "react-js-pull-to-refresh";

import CustomDndContext from "@/components/CustomDndContext";
import ThemeProvider from "@/components/ThemeProvider";
import PlayerContextProvider from "@/context/PlayerContext";

function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function onRefresh() {
    router.refresh();
  }

  return (
    <RecoilRoot>
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
            <CustomDndContext>{children}</CustomDndContext>
          </PlayerContextProvider>
        </PullToRefresh>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default Providers;
