"use client";

import { ModeToggle } from "@/components/ui/theme-switcher";
import { useDesktopStore } from "@/stores/useDesktopStore";
import Window from "@/components/Window";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";

const buttonData = [
  { buttonText: "About Me", id: "about" },
  { buttonText: "Works", id: "works" },
  { buttonText: "Links", id: "links" },
  { buttonText: "Contact", id: "contact" },
] as const;

export default function Page() {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const openWindows = useDesktopStore((state) => state.openWindows);
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden">
      <ModeToggle />

      <div ref={constraintsRef} className="absolute inset-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto relative min-w-200 min-h-137.5 border bg-white dark:bg-accent border-gray-700 rounded-lg flex flex-col select-none">
            <div className="rounded-t-lg font-mono flex bg-stone-700 text-white text-xl px-6 py-3">
              welcome
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-10">
              <h1 className="font-heading text-5xl font-medium text-gray-800">
                hi, <span className="font-bold">i'm dominic</span>
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                full stack developer, ai automation engineer, illustrator
              </p>
            </div>

            <div className="flex flex-row items-center justify-center gap-3 pb-6">
              {buttonData.map((button) => (
                <button
                  key={button.id}
                  onClick={() => openWindow(button.id)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-300"
                >
                  {button.buttonText}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openWindows.map((id) => (
            <Window key={id} id={id} constraintsRef={constraintsRef} />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
