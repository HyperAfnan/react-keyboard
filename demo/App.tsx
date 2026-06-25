import { useState } from "react";
import { Keyboard } from "../lib/main";
import type { AccentColor, SoundPack } from "../lib/main";
import { Header } from "./components/Header";
import CopyComponent from "./components/CopyComponent";
import { SoundSelector } from "./components/SoundSelector";

function App() {
  const [accent] = useState<AccentColor>("red");
  const [soundPack, setSoundPack] = useState<SoundPack>("cherry-blue");
  const [soundEnabled] = useState(true);

  return (
    <div className={`flex min-h-screen flex-col font-geist overflow-x-hidden bg-zinc-950 font-sans text-white select-none accent-${accent}`}>
      <Header />

      <div className="mx-auto w-full max-w-[96rem] flex-1 flex flex-col border-b border-zinc-800/80 2xl:border-x">
        <div className="flex flex-col p-4 sm:p-8 items-center justify-center space-y-6 sm:space-y-8 md:space-y-10 border-b border-zinc-800/80">
          <div className="flex max-w-3xl flex-col text-center">
            <h1 className="mb-3 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Interactive mechanical keyboard for React
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-zinc-400">
              Multiple layouts, themes, and authentic typing sounds
            </p>
          </div>

          <CopyComponent />

        </div>
        <div className="flex justify-center px-4 pb-6 pt-6 sm:pb-8 lg:pb-10"><SoundSelector soundPack={soundPack} onChange={setSoundPack} /></div>

        <main className="relative flex flex-1 flex-col items-center justify-start pt-6 sm:justify-center sm:pt-0 overflow-hidden bg-[#09090b] p-4 sm:p-6">
          <div className="w-full flex justify-center overflow-hidden h-[112px] min-[360px]:h-[128px] min-[400px]:h-[145px] min-[480px]:h-[175px] sm:h-[240px] md:h-[290px] lg:h-[330px]">
            <div className="origin-top scale-[0.34] min-[360px]:scale-[0.39] min-[400px]:scale-[0.44] min-[480px]:scale-[0.53] sm:scale-[0.73] md:scale-[0.88] lg:scale-100 flex-shrink-0 transition-all duration-200">
              <Keyboard
                accent={accent}
                soundPack={soundPack}
                soundEnabled={soundEnabled}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
