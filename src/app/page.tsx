"use client";

import { ModeToggle } from "@/components/ui/theme-switcher";
import { useDesktopStore } from "@/stores/useDesktopStore";
import Window from "@/components/Window";
import { useRef } from "react";

const buttonData = [
  { buttonText: "About Me", icon: "", id: "about" },
  { buttonText: "Works", icon: "", id: "works" },
  { buttonText: "Links", icon: "", id: "links" },
  { buttonText: "Contact", icon: "", id: "contact" },
] as const;

const data = [
  {
    id: "win-profile",
    title: "profile.png",
    initialX: 100,
    initialY: 100,
    borderColor: "border-emerald-500",
    accentColor: "bg-emerald-500",
    imgSrc: "me2.png",
  },
];

export default function Page() {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const openWindows = useDesktopStore((state) => state.openWindows);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="fixed flex mx-auto w-screen h-screen items-center justify-center">
      <ModeToggle />
      <div className="pointer-events-auto group/window">
        <div className="relative min-w-200 min-h-137.5 w-full h-full border bg-white dark:bg-accent border-gray-700 rounded-lg flex flex-col select-none">
          <div className="rounded-t-lg font-mono flex bg-stone-700 dark:border-x-2 dark:border-t-2 text-white dark:text-black dark:bg-white text-xl top-0 left-0 px-6 py-3">
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
            {buttonData.map((button, index) => (
              <button
                onClick={() => openWindow(button.id)}
                key={index}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-300"
              >
                {button.buttonText}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {openWindows.map((id) => (
          <Window
            key={id}
            containerRef={containerRef}
            config={data.map((item) => item)[0]}
            isActive={true}
            onFocus={() => openWindow(id)}
            id={id}
          />
        ))}
      </div>
    </main>
  );
}
