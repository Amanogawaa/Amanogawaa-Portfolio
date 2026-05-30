import { WindowConfig } from "@/app/page";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

interface DraggableWindowProps {
  config: WindowConfig;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  onFocus: () => void;
}

export default function DraggableWindow({
  config,
  containerRef,
  isActive,
  onFocus,
}: DraggableWindowProps) {
  const x = useMotionValue(config.initialX);
  const y = useMotionValue(config.initialY);

  const imageX = useTransform(x, (val) => -val - 2);
  const imageY = useTransform(y, (val) => -val - 2);

  // Dynamic warm light mode color mapping matching LoadingScreen.tsx
  const colorMap: Record<string, { border: string; bg: string }> = {
    "win-profile": { border: "var(--eco-moss)", bg: "bg-[var(--eco-moss)]" },
    "win-detail": { border: "var(--eco-rust)", bg: "bg-[var(--eco-rust)]" },
    "win-system": { border: "var(--eco-ink)", bg: "bg-[var(--eco-ink)]" },
    "proj-course": { border: "var(--eco-moss)", bg: "bg-[var(--eco-moss)]" },
    "proj-ecochain": { border: "var(--eco-rust)", bg: "bg-[var(--eco-rust)]" },
    "proj-attend": { border: "var(--eco-ink)", bg: "bg-[var(--eco-ink)]" },
    "exp-kloud": { border: "var(--eco-moss)", bg: "bg-[var(--eco-moss)]" },
    "exp-aws": { border: "var(--eco-rust)", bg: "bg-[var(--eco-rust)]" },
    "exp-edu": { border: "var(--eco-ink)", bg: "bg-[var(--eco-ink)]" },
  };

  const currentColors = colorMap[config.id] || {
    border: "var(--eco-ink)",
    bg: "bg-[var(--eco-ink)]",
  };

  const width = 320;
  const height = 240;

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.05}
      dragMomentum={false}
      style={{ x, y }}
      onPointerDown={onFocus}
      className={`absolute w-80 h-60 bg-[var(--eco-base)] text-[var(--eco-ink)] overflow-visible cursor-grab active:cursor-grabbing flex flex-col transition-opacity duration-200 select-none ${
        isActive ? "z-20 opacity-100 shadow-xl" : ""
      }`}
    >
      {/* Hand-Drawn Wobbly Outline Frame Overlay */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 overflow-visible z-20 pointer-events-none text-slate-700/80"
        style={{ filter: "url(#rough-sketch-filter)" }}
      >
        {/* Double-stroke borders with overshoots */}
        <g stroke={currentColors.border} strokeWidth="1.8" fill="none">
          {/* Top border */}
          <path d={`M -6,3 Q ${width / 2},-1 ${width + 8},2`} />
          <path
            d={`M -3,1.5 Q ${width / 2},1.5 ${width + 5},2.5`}
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Right border */}
          <path
            d={`M ${width - 1.5},-5 Q ${width + 2},${height / 2} ${width},${height + 8}`}
          />
          <path
            d={`M ${width + 0.5},-2 Q ${width - 1},${height / 2} ${width - 1.5},${height + 5}`}
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Bottom border */}
          <path
            d={`M ${width + 8},${height - 2} Q ${width / 2},${height + 1.5} -8,${height}`}
          />
          <path
            d={`M ${width + 5},${height + 1} Q ${width / 2},${height - 0.5} -5,${height - 1}`}
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Left border */}
          <path d={`M 1.5,${height + 6} Q -2.5,${height / 2} -2,-8`} />
          <path
            d={`M -0.5,${height + 3} Q 0.5,${height / 2} 0.5,-5`}
            strokeWidth="0.8"
            opacity="0.5"
          />
        </g>
      </svg>

      {/* Sketched Title Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 px-3 py-2 bg-[var(--eco-mist)]/85 border-b border-[var(--eco-sand)]/60 flex items-center justify-between text-xs font-handwritten select-none z-10">
        <span
          className={
            isActive
              ? "text-[var(--eco-ink)] font-semibold"
              : "text-[var(--eco-ink)]/70"
          }
        >
          {config.title}
        </span>
        <div className={`w-2 h-2 rounded-full ${currentColors.bg}`} />
      </div>

      {/* Viewport content showing scan-through layers */}
      <div className="absolute inset-0.5 overflow-hidden bg-[var(--eco-base)] rounded-b-sm z-0">
        <motion.img
          src={config.imgSrc || "me2.png"}
          alt="Artwork viewport"
          draggable="false"
          style={{
            x: imageX,
            y: imageY,
            height: "calc(100vh - 80px)",
            filter: "url(#rough-sketch-filter) grayscale(30%) sepia(20%)",
          }}
          className="absolute max-w-none aspect-[614/1091] origin-top-left opacity-90 select-none"
          width={614}
          height={1091}
        />
      </div>
    </motion.div>
  );
}
