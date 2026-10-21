"use client";

import { useDesktopStore } from "@/stores/useDesktopStore";
import { motion, useMotionValue, useDragControls } from "framer-motion";
import { useRef } from "react";

export interface WindowConfig {
  id: string;
  title: string;
  initialX: number;
  initialY: number;
  borderColor: string;
  accentColor: string;
  imgSrc?: string;
}

type WindowId = "about" | "works" | "links" | "contact";

interface DraggableWindowProps {
  config: WindowConfig;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  onFocus: () => void;
  id: WindowId;
}

const windowContent = {
  about: {
    title: "About Me",
    content: <p>This is the about content...</p>,
  },
  works: {
    title: "Works",
    content: <p>This is the works content...</p>,
  },
  links: {
    title: "Links",
    content: <p>This is the links content...</p>,
  },
  contact: {
    title: "Contact",
    content: <p>This is the contact content...</p>,
  },
};

export default function Window({ id, containerRef }: DraggableWindowProps) {
  const dragControls = useDragControls();
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const { title, content } = windowContent[id];
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <motion.div
        drag
        whileTap={{
          scale: 0.9,
        }}
        whileDrag={{
          scale: 1,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          rotate: 10,
        }}
        ref={ref}
        className="absolute top-20 left-20 w-96 bg-white dark:bg-accent border border-gray-700 rounded-lg shadow-xl z-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-stone-700 text-white rounded-t-lg">
          <span className="font-medium">{title}</span>
          <button
            onClick={() => closeWindow(id)}
            className="hover:bg-red-500 px-2 rounded"
          >
            ✕
          </button>
        </div>

        <div className="p-4">{content}</div>
      </motion.div>
    </div>
  );
}
