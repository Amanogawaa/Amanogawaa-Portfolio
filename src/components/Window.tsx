"use client";

import { useDesktopStore } from "@/stores/useDesktopStore";
import {
  motion,
  useMotionValue,
  animate,
  useDragControls,
} from "framer-motion";
import { useEffect, useRef } from "react";
import AboutMe from "./cards/AboutMe";

type WindowId = "about" | "works" | "links" | "contact";

interface WindowProps {
  id: WindowId;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

const windowContent = {
  about: {
    title: "About Me",
    content: <AboutMe />,
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

export default function Window({ id, constraintsRef }: WindowProps) {
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const setPosition = useDesktopStore((state) => state.setPosition);
  const position = useDesktopStore((state) => state.positions[id]);
  const zIndex = useDesktopStore((state) => state.zIndexes[id] ?? 50);
  const dragControls = useDragControls();

  const { title, content } = windowContent[id];

  const x = useMotionValue(position?.x ?? 100);
  const y = useMotionValue(position?.y ?? 100);
  const rotate = useMotionValue(0); // ← tilt value

  const hasOpened = useRef(false);

  useEffect(() => {
    if (position) {
      x.set(position.x);
      y.set(position.y);
    }
  }, []);

  return (
    <motion.div
      style={{ x, y, zIndex, rotate }}
      drag
      dragListener={false}
      dragConstraints={constraintsRef}
      dragControls={dragControls}
      dragElastic={0.05}
      dragMomentum={false}
      onPointerDown={() => focusWindow(id)}
      onDrag={(_, info) => {
        const tilt = Math.max(-12, Math.min(12, info.velocity.x / 80));
        rotate.set(tilt);
      }}
      onDragEnd={() => {
        setPosition(id, { x: x.get(), y: y.get() });

        animate(rotate, 0, {
          type: "spring",
          stiffness: 300,
          damping: 20,
        });
      }}
      initial={hasOpened.current ? false : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onAnimationComplete={() => {
        hasOpened.current = true;
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      whileDrag={{
        scale: 1.02,
        cursor: "grabbing",
      }}
      className="absolute w-96 bg-white dark:bg-accent border border-gray-700 rounded-lg shadow-xl cursor-grab pointer-events-auto  min-w-200 min-h-137.5 flex flex-col select-none"
    >
      <div
        onPointerDown={(e) => {
          focusWindow(id);
          dragControls.start(e);
        }}
        className="flex items-center justify-between px-4 py-2 bg-stone-700 text-white rounded-t-lg"
      >
        <span className="font-medium select-none">{title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeWindow(id);
          }}
          className="hover:bg-red-500 px-2 rounded transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-4">{content}</div>
    </motion.div>
  );
}
