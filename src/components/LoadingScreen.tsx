"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

// Reusable sketched box component with dynamic pathLength sketching animations
interface SketchedBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
  activeColor: string;
  delayOffset: number;
  imgSrc: string;
}

function SketchedBox({
  x,
  y,
  width,
  height,
  label,
  color,
  activeColor,
  delayOffset,
  imgSrc,
}: SketchedBoxProps) {
  const [localProgress, setLocalProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Trigger drawing start after the box outlines are drawn
  useEffect(() => {
    let delayTimer = setTimeout(
      () => {
        setIsDrawing(true);
      },
      (delayOffset + 0.3) * 1000,
    );

    return () => clearTimeout(delayTimer);
  }, [delayOffset]);

  // Handle local drawing speed ticks (from 0 to 100 over 1.2 seconds)
  useEffect(() => {
    if (!isDrawing) return;

    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setLocalProgress(p);
    }, 40); // Ticks every 40ms, total 1.0s sketch reveal

    return () => clearInterval(interval);
  }, [isDrawing]);

  // Calculate the y-coordinate of the wiggling pen as a zig-zag that wiggles back and forth
  const penY = useMemo(() => {
    if (localProgress <= 0 || localProgress >= 100) return 0;

    // Zig-zag up and down across the viewport height as it travels left-to-right
    const totalHeightRange = height - 48;
    const isMovingUp = Math.floor(localProgress / 10) % 2 === 0;
    const baseVal = isMovingUp
      ? (localProgress % 10) * (totalHeightRange / 10)
      : totalHeightRange - (localProgress % 10) * (totalHeightRange / 10);

    // Add rapid sine wiggles
    return 16 + baseVal + Math.sin(localProgress * 1.5) * 5;
  }, [localProgress, height]);

  // Pen x progress tracking
  const penX = (localProgress / 100) * (width - 16);

  return (
    <motion.div
      className="absolute flex flex-col font-mono text-[10px] select-none"
      style={{ left: x, top: y, width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delayOffset }}
    >
      {/* SVG Outline and hatching */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 overflow-visible z-10 pointer-events-none"
        style={{ filter: "url(#rough-sketch-filter)" }}
      >
        {/* Outlines */}
        <g stroke={color} strokeWidth="1.5" fill="none">
          {/* Top border */}
          <motion.path
            d={`M -6,3 Q ${width / 2},-1 ${width + 8},2`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d={`M -3,1.5 Q ${width / 2},1.5 ${width + 5},2.5`}
            strokeWidth="0.8"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          />
          {/* Right border */}
          <motion.path
            d={`M ${width - 1.5},-5 Q ${width + 2},${height / 2} ${width},${height + 8}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d={`M ${width + 0.5},-2 Q ${width - 1},${height / 2} ${width - 1.5},${height + 5}`}
            strokeWidth="0.8"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          />
          {/* Bottom border */}
          <motion.path
            d={`M ${width + 8},${height - 2} Q ${width / 2},${height + 1.5} -8,${height}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d={`M ${width + 5},${height + 1} Q ${width / 2},${height - 0.5} -5,${height - 1}`}
            strokeWidth="0.8"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
          />
          {/* Left border */}
          <motion.path
            d={`M 1.5,${height + 6} Q -2.5,${height / 2} -2,-8`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d={`M -0.5,${height + 3} Q 0.5,${height / 2} 0.5,-5`}
            strokeWidth="0.8"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />
        </g>
      </svg>

      {/* Sketched Window Title Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between font-handwritten text-xs z-20 text-[var(--eco-ink)] select-none bg-[var(--eco-mist)]/85 border-b border-[var(--eco-sand)]/60">
        <span>{label}</span>
        <div className={`w-2 h-2 rounded-full ${activeColor} opacity-75`} />
      </div>

      {/* Viewport Frame with drawing images, pencil mask and drawing pen! */}
      <div className="relative flex-1 overflow-hidden bg-[var(--eco-base)] border border-[var(--eco-sand)]/35 rounded-b-sm m-[1px] z-0">
        {localProgress > 0 && (
          <>
            {/* The Actual Drawing Image */}
            <img
              src={imgSrc}
              alt="Sketched portfolio component representation"
              className="absolute inset-0 w-full h-full object-cover opacity-85 filter contrast-125 saturate-75 select-none"
              style={{
                filter: "url(#rough-sketch-filter) grayscale(30%) sepia(20%)",
              }}
              draggable="false"
            />

            {/* Scribble Mask Cover Shield (matches warm background and shrinks as pen draws it!) */}
            {localProgress < 100 && (
              <div
                className="absolute inset-y-0 right-0 bg-[var(--eco-base)] border-l border-dashed border-[var(--eco-ink)]/20"
                style={{ left: `${localProgress}%` }}
              >
                {/* Wobbly scribble overlay to simulate active coloring/shading lines on the boundary! */}
                <svg className="absolute top-0 left-0 w-4 h-full overflow-visible text-[var(--eco-ink)]/15">
                  <path
                    d={`M 0,0 L 5,20 L 0,40 L 5,60 L 0,80 L 5,100 L 0,120 L 5,140 L 0,160 L 5,180`}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {/* Wiggling Drawing Pen tracking the edge */}
            {isDrawing && localProgress < 100 && (
              <div
                className="absolute transition-all duration-75 ease-out pointer-events-none z-30"
                style={{
                  left: `${penX}px`,
                  top: `${penY}px`,
                  transform: "translate(-6px, -24px)", // tip align
                }}
              >
                {/* Bouncing pen body with rapid rotation wiggle */}
                <div
                  className="animate-bounce"
                  style={{ animationDuration: "0.15s" }}
                >
                  <div
                    className="origin-bottom-left filter"
                    style={{
                      filter: "url(#rough-sketch-filter)",
                      transform: `rotate(${Math.sin(localProgress * 2) * 12 - 8}deg)`,
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--eco-ink)]"
                    >
                      <path
                        d="M17 3 L21 7 L9 19 L4 19 L4 14 Z"
                        fill="var(--eco-moss)"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 15 L10 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17 3 L19 1"
                        stroke="var(--eco-sand)"
                        strokeWidth="3"
                      />
                      <path
                        d="M16 4.5 L19.5 8"
                        stroke="var(--eco-mist)"
                        strokeWidth="2"
                      />
                      <path
                        d="M4 14 L2 22 L10 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Drafting matrix overlay...");

  // Set descriptive handwriting status messages
  useEffect(() => {
    if (progress < 20) setStatusText("[1/6] Drafting dashboard outline...");
    else if (progress < 40) setStatusText("[2/6] Sketching grid layout...");
    else if (progress < 60)
      setStatusText("[3/6] Projecting profile viewport sketch...");
    else if (progress < 80)
      setStatusText("[4/6] Projecting detail viewport sketch...");
    else if (progress < 95)
      setStatusText("[5/6] Projecting system database sketch...");
    else setStatusText("[6/6] Compiling live overlay elements... ready!");
  }, [progress]);

  // Organic, non-linear progress timer simulation
  useEffect(() => {
    let currentProgress = 0;
    let timer: NodeJS.Timeout;

    const tick = () => {
      let increment = 0;
      let nextDelay = 35;

      if (currentProgress < 20) {
        // Fast start
        increment = Math.random() * 5 + 3;
        nextDelay = Math.random() * 70 + 30;
      } else if (currentProgress < 40) {
        // Grid build
        increment = Math.random() * 3 + 1;
        nextDelay = Math.random() * 100 + 40;
      } else if (currentProgress < 75) {
        // Asset pause (drawing pictures on layout!)
        increment = Math.random() * 1.5 + 0.2;
        nextDelay = Math.random() * 180 + 70;
      } else if (currentProgress < 96) {
        // Pre-final push
        increment = Math.random() * 6 + 2;
        nextDelay = Math.random() * 60 + 30;
      } else {
        // Finish it
        increment = 1;
        nextDelay = 250;
      }

      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(Math.floor(currentProgress));

      if (currentProgress < 100) {
        timer = setTimeout(tick, nextDelay);
      } else {
        timer = setTimeout(() => {
          onComplete();
        }, 800);
      }
    };

    timer = setTimeout(tick, 50);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Layout sizing parameters downscaled to 70% of real layout
  const gridWidth = 716;
  const gridHeight = 420;

  // Progress Bar dimension settings
  const boxWidth = 440;
  const boxHeight = 44;
  const barPadding = 5;
  const maxFillWidth = boxWidth - barPadding * 2;
  const currentFillWidth = (progress / 100) * maxFillWidth;

  // Generate dynamic highlighted zig-zag colored scribble paths
  const scribblePath = useMemo(() => {
    if (currentFillWidth <= 0) return "";
    let path = "M 0,18";
    const segmentWidth = 6;
    const steps = Math.floor(currentFillWidth / segmentWidth);
    for (let i = 1; i <= steps; i++) {
      const x = i * segmentWidth;
      const y = 8 + (i % 2 === 0 ? 18 : 0) + Math.sin(i * 1.7) * 2.5;
      path += ` L ${x},${y}`;
    }
    if (currentFillWidth % segmentWidth !== 0) {
      const isEven = steps % 2 === 0;
      path += ` L ${currentFillWidth},${8 + (isEven ? 0 : 18)}`;
    }
    return path;
  }, [currentFillWidth]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--eco-base)] text-[var(--eco-ink)] p-6 overflow-hidden font-mono select-none">
      {/* Background wobbly tech blueprint grid lines in warm graphite style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,42,36,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,42,36,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(231,220,196,0.18)_100%)] pointer-events-none" />

      {/* SVG filter system for generating hand-sketched lines */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter
            id="rough-sketch-filter"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Warm ink/sand hatching pattern */}
          <pattern
            id="chalk-hatch"
            width="12"
            height="12"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="var(--eco-sand)"
              strokeWidth="1.5"
              opacity="0.75"
            />
            <line
              x1="6"
              y1="0"
              x2="6"
              y2="12"
              stroke="var(--eco-rust)"
              strokeWidth="1"
              opacity="0.35"
            />
          </pattern>
        </defs>
      </svg>

      {/* The Central Blueprint Drawing Board */}
      <div className="w-full max-w-4xl flex flex-col gap-4 relative ">
        {/* Dynamic Chalkboard Header */}
        <div className="flex justify-between items-end border-b border-dashed border-[var(--eco-sand)] pb-2.5">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--eco-moss)] font-semibold font-mono block mb-1">
              SYSTEM DRAFTING CONSOLE
            </span>
            <h1 className="text-xl md:text-2xl font-handwritten text-[var(--eco-ink)] filter select-none drop-shadow-[0_1px_2px_rgba(31,42,36,0.12)]">
              28:01 // multi-lens_overlay.blueprint
            </h1>
          </div>
          <p className="text-[10px] text-[var(--eco-sand)] font-mono font-semibold tracking-wider">
            SCALE: 0.70 // PLOTTER ACTIVE
          </p>
        </div>

        {/* Blueprint Masking Container Sketched Box */}
        <div className="relative w-full h-[460px] bg-[var(--eco-base)] border border-dashed border-[var(--eco-sand)]/60 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
          {/* Main Dashboard Sketched Box (progress >= 0) */}
          <svg
            width={gridWidth}
            height={gridHeight}
            viewBox={`0 0 ${gridWidth} ${gridHeight}`}
            fill="none"
            style={{ filter: "url(#rough-sketch-filter)" }}
            className="absolute inset-0 m-auto text-[var(--eco-ink)]/70 overflow-visible"
          >
            {/* Outer Box Outlines */}
            <path
              d={`M -6,4 Q ${gridWidth / 2},1.5 ${gridWidth + 8},3`}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M -3,2 Q ${gridWidth / 2},4.5 ${gridWidth + 5},2`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />

            <path
              d={`M ${gridWidth - 2},-5 Q ${gridWidth + 2.5},${gridHeight / 2} ${gridWidth},${gridHeight + 8}`}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M ${gridWidth + 1},-2 Q ${gridWidth - 1.5},${gridHeight / 2} ${gridWidth - 1.5},${gridHeight + 5}`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />

            <path
              d={`M ${gridWidth + 8},${gridHeight - 3} Q ${gridWidth / 2},${gridHeight + 2} -8,${gridHeight - 1}`}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M ${gridWidth + 5},${gridHeight} Q ${gridWidth / 2},${gridHeight - 1} -5,${gridHeight - 2.5}`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />

            <path
              d={`M 2.5,${gridHeight + 6} Q -2,${gridHeight / 2} -2,-8`}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M -0.5,${gridHeight + 3} Q 0.5,${gridHeight / 2} 0.5,-5`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Sketched Tech Grid (progress >= 20) */}
            {progress >= 20 && (
              <g
                stroke="var(--eco-sand)"
                strokeWidth="0.8"
                opacity="0.3"
                fill="none"
              >
                {/* Horizontal Grid lines */}
                {Array.from({ length: 9 }).map((_, i) => {
                  const y = (i + 1) * 42;
                  return (
                    <motion.path
                      key={`h-${i}`}
                      d={`M 0,${y} L ${gridWidth},${y}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  );
                })}
                {/* Vertical Grid lines */}
                {Array.from({ length: 15 }).map((_, i) => {
                  const x = (i + 1) * 44.5;
                  return (
                    <motion.path
                      key={`v-${i}`}
                      d={`M ${x},0 L ${x},${gridHeight}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  );
                })}
              </g>
            )}
          </svg>

          {/* Draggable Window Blueprint Sketched Outlines in exact downscaled coordinates */}
          {/* Viewport 1 (Profile): x=0, y=28, w=224, h=168 (progress >= 40) - renders drawing1.jpg */}
          {progress >= 40 && (
            <SketchedBox
              x={40}
              y={40}
              width={224}
              height={168}
              label="profile.png"
              color="rgba(47, 107, 79, 0.8)" /* Moss Green */
              activeColor="bg-[var(--eco-moss)]"
              delayOffset={0}
              imgSrc="drawing1.jpg"
            />
          )}

          {/* Viewport 2 (Detail): x=140, y=196, w=224, h=168 (progress >= 60) - renders drawing2.jpg */}
          {progress >= 60 && (
            <SketchedBox
              x={420}
              y={120}
              width={224}
              height={168}
              label="detail.png"
              color="rgba(185, 122, 90, 0.8)" /* Terracotta Rust */
              activeColor="bg-[var(--eco-rust)]"
              delayOffset={0}
              imgSrc="drawing2.jpg"
            />
          )}

          {/* Viewport 3 (System): x=0, y=364, w=224, h=168 (progress >= 80) - renders drawing3.jpg */}
          {progress >= 80 && (
            <SketchedBox
              x={180}
              y={230}
              width={224}
              height={168}
              label="system.sys"
              color="rgba(31, 42, 36, 0.7)" /* Charcoal Ink */
              activeColor="bg-[var(--eco-ink)]"
              delayOffset={0}
              imgSrc="drawing3.jpg"
            />
          )}
        </div>

        {/* Blueprint Drafting Progress Bar at the bottom */}
        <div className="flex flex-col items-center mt-4 w-full animate-sketchy-wiggle">
          <div className="relative w-full max-w-[440px] h-[68px] flex items-center justify-center">
            {/* Hand-Drawn Blueprint Outline for Loading Container */}
            <svg
              width={boxWidth}
              height={boxHeight}
              viewBox={`0 0 ${boxWidth} ${boxHeight}`}
              fill="none"
              style={{ filter: "url(#rough-sketch-filter)" }}
              className="text-[var(--eco-ink)]"
            >
              {/* Box Background */}
              <rect
                x={barPadding}
                y={barPadding}
                width={maxFillWidth}
                height={boxHeight - barPadding * 2}
                fill="rgba(31, 42, 36, 0.03)"
              />

              {/* Shaded Hatch Fill */}
              <rect
                x={barPadding}
                y={barPadding}
                width={currentFillWidth}
                height={boxHeight - barPadding * 2}
                fill="url(#chalk-hatch)"
              />

              {/* Dynamic Highlighter Scribble */}
              {currentFillWidth > 0 && (
                <g transform={`translate(${barPadding}, ${barPadding})`}>
                  <path
                    d={scribblePath}
                    stroke="var(--eco-rust)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d={scribblePath}
                    stroke="rgba(47, 107, 79, 0.45)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    transform="translate(1, -0.8)"
                  />
                </g>
              )}

              {/* Double-stroke Outer Frame */}
              <path
                d="M -5,4 Q 220,1.5 445,3"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M -2,2 Q 220,4.5 442,1.8"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
              />

              <path
                d="M 435,-3 Q 438,22 434,47"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M 437.5,-1 Q 434.5,22 437.5,45"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
              />

              <path
                d="M 445,40 Q 220,42.5 -5,39"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M 442,42 Q 220,38 -2,40.5"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
              />

              <path
                d="M 5,-4 Q 1,22 6,47"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M 2,-2 Q 4,22 1.5,45"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </svg>

            {/* Hyperactive Wiggling Drawing Pencil Cursor */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 ease-out pointer-events-none"
              style={{
                left: `${barPadding + currentFillWidth}px`,
                transform: `translate(-12px, -30px)`,
              }}
            >
              <div
                className="animate-bounce"
                style={{ animationDuration: "0.22s" }}
              >
                <div
                  className="origin-bottom-left filter"
                  style={{
                    filter: "url(#rough-sketch-filter)",
                    transform: `rotate(${Math.sin(progress * 1.5) * 15 - 5}deg)`,
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--eco-ink)]"
                  >
                    <path
                      d="M17 3 L21 7 L9 19 L4 19 L4 14 Z"
                      fill="var(--eco-rust)"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 15 L10 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M17 3 L19 1"
                      stroke="var(--eco-sand)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M16 4.5 L19.5 8"
                      stroke="var(--eco-mist)"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 14 L2 22 L10 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Status Indicators */}
          <div className="mt-3.5 flex justify-between items-center w-full max-w-[430px]">
            <div className="text-left w-3/4">
              <span className="font-handwritten text-[var(--eco-ink)] text-lg inline-block filter select-none">
                {statusText}
              </span>
            </div>

            {/* Percentage Badge */}
            <div
              className="relative flex items-center justify-center w-12 h-12 font-handwritten text-lg border border-[var(--eco-sand)] rounded-full select-none cursor-default filter p-2"
              style={{ filter: "url(#rough-sketch-filter)" }}
            >
              <svg
                className="absolute inset-0 w-full h-full text-[var(--eco-forest)]"
                viewBox="0 0 50 50"
              >
                <path
                  d="M 25,2 C 38,2 48,12 48,25 C 48,38 38,48 25,48 C 12,48 2,38 2,25 C 2,12 12,2 25,2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="200"
                  strokeDashoffset={200 - (progress / 100) * 200}
                  className="transition-all duration-100 ease-out"
                />
              </svg>
              <span className="text-[var(--eco-ink)]">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
