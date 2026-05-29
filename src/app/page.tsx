"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";

// Configuration for each window
interface WindowConfig {
  id: string;
  title: string;
  initialX: number;
  initialY: number;
  borderColor: string;
  accentColor: string;
}

const WINDOWS_DATA: WindowConfig[] = [
  {
    id: "win-profile",
    title: "profile.jpg",
    initialX: 60,
    initialY: 40,
    borderColor: "border-emerald-500",
    accentColor: "bg-emerald-500",
  },
  {
    id: "win-detail",
    title: "detail.jpg",
    initialX: 380,
    initialY: 180,
    borderColor: "border-cyan-500",
    accentColor: "bg-cyan-500",
  },
  {
    id: "win-system",
    title: "system.sys",
    initialX: 180,
    initialY: 300,
    borderColor: "border-fuchsia-500",
    accentColor: "bg-fuchsia-500",
  },
  {
    id: "win-id",
    title: "id.jpg",
    initialX: 180,
    initialY: 300,
    borderColor: "border-fuchsia-500",
    accentColor: "bg-fuchsia-500",
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWindowId, setActiveWindowId] = useState<string>("win-profile");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main 
        className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={!isLoading ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-5xl flex flex-col gap-4">
          {/* Header Title */}
          <div className="flex justify-between items-end border-b border-slate-800 pb-2">
            <h1 className="font-mono text-xl text-emerald-400">28:01 // multi-lens_overlay</h1>
            <p className="text-xs text-slate-500 font-mono">drag window viewports to scan undercurrent layers</p>
          </div>

          {/* Masking Container */}
          <div
            ref={containerRef}
            className="relative w-full h-[600px] bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden cursor-crosshair select-none"
          >
            {/* Subtle background tech grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Render draggable windows dynamically */}
            {WINDOWS_DATA.map((win) => (
              <DraggableWindow
                key={win.id}
                config={win}
                containerRef={containerRef}
                isActive={activeWindowId === win.id}
                onFocus={() => setActiveWindowId(win.id)}
              />
            ))}
          </div>
        </div>
      </motion.main>
    </>
  );
}


interface DraggableWindowProps {
  config: WindowConfig;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  onFocus: () => void;
}

function DraggableWindow({
  config,
  containerRef,
  isActive,
  onFocus,
}: DraggableWindowProps) {
  // Creating independent MotionValues for this specific window instance
  const x = useMotionValue(config.initialX);
  const y = useMotionValue(config.initialY);

  // Calculate inverse coordinates for the image inside this viewport
  const imageX = useTransform(x, (val) => -val);
  const imageY = useTransform(y, (val) => -val);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.05}
      dragMomentum={false}
      style={{ x, y }}
      onPointerDown={onFocus} // Focuses window on click/touch down
      className={`absolute w-80 h-60 bg-slate-900 border rounded-lg shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing flex flex-col transition-opacity duration-200 ${isActive
        ? `${config.borderColor} z-20 opacity-100`
        : "border-slate-800 z-10 opacity-70 hover:opacity-90"
        }`}
    >
      {/* Retro OS Style Window Title Bar */}
      <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-900/50 flex items-center justify-between text-xs font-mono select-none">
        <span className={isActive ? "text-slate-200" : "text-slate-400"}>
          {config.title}
        </span>
        <div className={`w-2.5 h-2.5 rounded-full ${config.accentColor}`} />
      </div>

      {/* Window Viewport Area */}
      <div className="relative flex-1 overflow-hidden bg-slate-950">
        <motion.img
          src="me.jpg"
          alt="Artwork viewport"
          draggable="false"
          style={{ x: imageX, y: imageY }}
          className="absolute max-none origin-top-left"
          width={976}
          height={600}
        />
      </div>
    </motion.div>
  );
}
