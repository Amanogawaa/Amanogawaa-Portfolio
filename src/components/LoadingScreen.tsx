"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = useMemo(
    () => [
      "Sharpening graphite pencils...",
      "Drafting UI wireframes...",
      "Tracing viewport borders...",
      "Shading draggable layers...",
      "Adding neon ink details...",
      "Polishing hand-drawn renders...",
      "Sketch complete! Entering...",
    ],
    [],
  );

  useEffect(() => {
    if (progress < 15) setStatusIndex(0);
    else if (progress < 35) setStatusIndex(1);
    else if (progress < 55) setStatusIndex(2);
    else if (progress < 75) setStatusIndex(3);
    else if (progress < 90) setStatusIndex(4);
    else if (progress < 100) setStatusIndex(5);
    else setStatusIndex(6);
  }, [progress]);

  useEffect(() => {
    let currentProgress = 0;
    let timer: NodeJS.Timeout;

    const tick = () => {
      let increment = 0;
      let nextDelay = 50;

      if (currentProgress < 20) {
        increment = Math.random() * 5 + 3;
        nextDelay = Math.random() * 80 + 30;
      } else if (currentProgress < 50) {
        increment = Math.random() * 3 + 1;
        nextDelay = Math.random() * 120 + 60;
      } else if (currentProgress < 70) {
        increment = Math.random() * 1.5 + 0.2;
        nextDelay = Math.random() * 200 + 100;
      } else if (currentProgress < 92) {
        increment = Math.random() * 6 + 2;
        nextDelay = Math.random() * 60 + 40;
      } else if (currentProgress < 99) {
        increment = 0.5;
        nextDelay = Math.random() * 300 + 150;
      } else {
        increment = 1;
        nextDelay = 500;
      }

      currentProgress = Math.min(100, currentProgress + increment);

      setProgress(Math.floor(currentProgress));

      if (currentProgress < 100) {
        timer = setTimeout(tick, nextDelay);
      } else {
        timer = setTimeout(() => {
          onComplete();
        }, 600);
      }
    };

    timer = setTimeout(tick, 100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const boxWidth = 460;
  const boxHeight = 46;
  const barPadding = 5;
  const maxFillWidth = boxWidth - barPadding * 2;
  const currentFillWidth = (progress / 100) * maxFillWidth;

  const scribblePath = useMemo(() => {
    if (currentFillWidth <= 0) return "";

    let path = "M 0,18";
    const segmentWidth = 6;
    const steps = Math.floor(currentFillWidth / segmentWidth);

    for (let i = 1; i <= steps; i++) {
      const x = i * segmentWidth;
      const y = 8 + (i % 2 === 0 ? 20 : 0) + Math.sin(i * 1.7) * 3;
      path += ` L ${x},${y}`;
    }

    if (currentFillWidth % segmentWidth !== 0) {
      const isEven = steps % 2 === 0;
      path += ` L ${currentFillWidth},${8 + (isEven ? 0 : 20)}`;
    }

    return path;
  }, [currentFillWidth]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-[var(--eco-ink)] bg-[var(--eco-base)] bg-sketch-grid select-none overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(231, 220, 196, 0)_100%)] pointer-events-none" />

      {/* background of the loading bar */}
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

          <pattern
            id="sketch-hatch-pattern"
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

      <div className="relative flex flex-col items-center max-w-md w-full px-6 text-center animate-sketchy-wiggle">
        <div className="mb-12">
          <motion.h1
            className="text-4xl uppercase tracking-[0.2em] text-[var(--eco-ink)] font-bold block mb-1 font-handwritten"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            Loading
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="relative w-full max-w-[460px] h-[70px] flex items-center justify-center"
        >
          {progress >= 25 && (
            <motion.div
              className="absolute -top-7 left-[25%] -translate-x-1/2 text-[var(--eco-rust)] font-handwritten text-xl filter"
              style={{ filter: "url(#rough-sketch-filter)" }}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                width="28"
                height="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M11.8114 6.7267C12.8247 4.9089 13.3314 4 14.0889 4C14.8464 4 15.353 4.9089 16.3663 6.7267L16.6285 7.19699C16.9164 7.71355 17.0604 7.97183 17.2849 8.14225C17.5094 8.31266 17.789 8.37592 18.3482 8.50244L18.8572 8.61762C20.825 9.06284 21.8089 9.28545 22.0429 10.0382C22.277 10.7909 21.6063 11.5753 20.2648 13.1439L19.9177 13.5498C19.5365 13.9955 19.3459 14.2184 19.2602 14.4942C19.1744 14.7699 19.2032 15.0673 19.2609 15.662L19.3133 16.2035C19.5162 18.2965 19.6176 19.343 19.0047 19.8082C18.3919 20.2734 17.4707 19.8492 15.6283 19.0009L15.1517 18.7815C14.6281 18.5404 14.3664 18.4199 14.0889 18.4199C13.8114 18.4199 13.5496 18.5404 13.0261 18.7815L12.5494 19.0009C10.707 19.8492 9.78581 20.2734 9.17299 19.8082C8.56016 19.343 8.66157 18.2965 8.86438 16.2035L8.91685 15.662C8.97449 15.0673 9.0033 14.7699 8.91756 14.4942C8.83181 14.2184 8.64121 13.9955 8.26 13.5498L7.91295 13.1439C6.57147 11.5753 5.90073 10.7909 6.1348 10.0382C6.36888 9.28545 7.35275 9.06284 9.3205 8.61762L9.82958 8.50244C10.3887 8.37592 10.6683 8.31266 10.8928 8.14225C11.1173 7.97183 11.2613 7.71355 11.5492 7.19699L11.8114 6.7267Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.74549 5.20241C6.76387 4.63138 4.63821 4.933 2.58729 6.13407L2.37913 6.25598C2.0217 6.4653 1.56226 6.34523 1.35293 5.9878C1.14361 5.63037 1.26368 5.17092 1.62111 4.9616L1.82927 4.8397C4.18969 3.45737 6.73702 3.0626 9.16083 3.76106L9.36871 3.82096C9.76673 3.93566 9.99641 4.35129 9.88171 4.74931C9.76702 5.14733 9.35139 5.37701 8.95337 5.26231L8.74549 5.20241ZM4.83628 9.93646C4.87144 10.3492 4.56537 10.7123 4.15265 10.7474C3.99949 10.7605 3.88206 10.7679 3.78365 10.7742C3.60627 10.7854 3.49069 10.7928 3.33902 10.8219C3.14253 10.8596 2.8874 10.9394 2.4244 11.1709C2.05391 11.3562 1.60341 11.206 1.41817 10.8355C1.23293 10.465 1.38309 10.0145 1.75358 9.8293C2.29057 9.5608 2.68032 9.42092 3.05627 9.34876C3.30317 9.30137 3.55804 9.28477 3.78724 9.26984C3.87053 9.26441 3.95043 9.25921 4.02533 9.25283C4.43804 9.21767 4.80112 9.52374 4.83628 9.93646ZM5.91788 15.8561C4.73392 15.5786 3.48653 15.8538 2.55316 16.5892C2.22781 16.8456 1.75624 16.7896 1.49988 16.4643C1.24353 16.1389 1.29946 15.6674 1.62482 15.411C2.92261 14.3884 4.63911 14.0158 6.2601 14.3956C6.66339 14.4901 6.91371 14.8937 6.81921 15.297C6.72471 15.7003 6.32117 15.9506 5.91788 15.8561Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </motion.div>
          )}

          {progress >= 50 && (
            <motion.div
              className="absolute -bottom-9 left-[50%] -translate-x-1/2 text-[var(--eco-moss)] font-handwritten filter"
              style={{ filter: "url(#rough-sketch-filter)" }}
              initial={{ scale: 0, rotate: 60 }}
              animate={{ scale: 1, rotate: -15 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#000000"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12,12 C13,10 11,8 9,9 C6,10 7,14 10,15 C14,16 17,12 15,8 C13,5 7,6 6,11 C5,16 11,19 16,17" />
              </svg>
            </motion.div>
          )}

          {progress >= 75 && (
            <motion.div
              className="absolute -top-8 left-[75%] -translate-x-1/2 text-[var(--eco-rust)] font-handwritten text-lg filter"
              style={{ filter: "url(#rough-sketch-filter)" }}
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <svg
                fill="#000000"
                viewBox="-2.4 -2.4 28.80 28.80"
                id="thunder"
                data-name="Flat Color"
                width="28"
                height="28"
                xmlns="http://www.w3.org/2000/svg"
                className="icon flat-color"
                stroke="#000000"
                transform="matrix(1, 0, 0, 1, 0, 0)rotate(-45)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="primary"
                    d="M18.82,9.18A2,2,0,0,0,17,8H15.19l1.33-3.26a2,2,0,0,0-.19-1.84A2.06,2.06,0,0,0,14.62,2H10.28A2,2,0,0,0,8.37,3.27l-3.23,8a2,2,0,0,0,.2,1.83,2.06,2.06,0,0,0,1.71.9H9.81L8,20.74a1,1,0,0,0,.5,1.15A1.12,1.12,0,0,0,9,22a1,1,0,0,0,.76-.35l8.8-10.37A2,2,0,0,0,18.82,9.18Z"
                    className="fill: #000000;"
                  ></path>
                </g>
              </svg>
            </motion.div>
          )}

          {progress >= 100 && (
            <motion.div
              className="absolute -top-9 left-[98%] -translate-x-1/2 text-[var(--eco-forest)] filter"
              style={{ filter: "url(#rough-sketch-filter)" }}
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {/* <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4 L5 12 L12 6 L19 12 L22 4 L18 20 L6 20 Z" />
              </svg> */}
            </motion.div>
          )}

          <svg
            width={boxWidth}
            height={boxHeight}
            viewBox={`0 0 ${boxWidth} ${boxHeight}`}
            fill="none"
            style={{ filter: "url(#rough-sketch-filter)" }}
            className="text-[var(--eco-ink)]"
          >
            <rect
              x={barPadding}
              y={barPadding}
              width={maxFillWidth}
              height={boxHeight - barPadding * 2}
              fill="rgba(31, 42, 36, 0.03)"
            />

            <rect
              x={barPadding}
              y={barPadding}
              width={currentFillWidth}
              height={boxHeight - barPadding * 2}
              fill="url(#sketch-hatch-pattern)"
              className="transition-all duration-100 ease-out"
            />

            {currentFillWidth > 0 && (
              <g transform={`translate(${barPadding}, ${barPadding})`}>
                <path
                  d={scribblePath}
                  stroke="var(--eco-rust)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="transition-all duration-100 ease-out"
                />
                <path
                  d={scribblePath}
                  stroke="rgba(47, 107, 79, 0.45)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  transform="translate(1, -1)"
                  className="transition-all duration-100 ease-out"
                />
              </g>
            )}

            <path
              d="M -5,4 Q 230,1 465,3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M -2,2.5 Q 230,5.5 462,2"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
            />

            <path
              d="M 455,-3 Q 458,23 454,49"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M 457.5,-1 Q 454.5,23 458.5,47"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
            />

            <path
              d="M 465,42 Q 230,44.5 -5,41"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M 462,44.5 Q 230,39.5 -2,42.5"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
            />

            <path
              d="M 5.5,-4 Q 1.5,23 6.5,49"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M 2.5,-2 Q 4.5,23 2,47"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>

          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 ease-out pointer-events-none"
            style={{
              left: `${barPadding + currentFillWidth}px`,
              transform: `translate(-12px, -32px)`,
            }}
          >
            <div
              className="animate-bounce"
              style={{ animationDuration: "0.2s" }}
            >
              <div
                className="origin-bottom-left filter"
                style={{
                  filter: "url(#rough-sketch-filter)",
                  transform: `rotate(${Math.sin(progress * 1.5) * 15 - 5}deg)`,
                }}
              >
                <svg
                  viewBox="0 0 64 64"
                  width="28"
                  height="28"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--emojione"
                  preserveAspectRatio="xMidYMid meet"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#ffce31"
                      d="M7.934 41.132L39.828 9.246l14.918 14.922l-31.895 31.886z"
                    ></path>
                    <path
                      d="M61.3 4.6l-1.9-1.9C55.8-.9 50-.9 46.3 2.7l-6.5 6.5l15 15l6.5-6.5c3.6-3.6 3.6-9.5 0-13.1"
                      fill="#ed4c5c"
                    ></path>
                    <path
                      fill="#93a2aa"
                      d="M35.782 13.31l4.1-4.102l14.92 14.92l-4.1 4.101z"
                    ></path>
                    <path
                      fill="#c7d3d8"
                      d="M37.338 14.865l4.1-4.101l11.739 11.738l-4.102 4.1z"
                    ></path>
                    <path
                      fill="#fed0ac"
                      d="M7.9 41.1l-6.5 17l4.5 4.5l17-6.5z"
                    ></path>
                    <path
                      d="M.3 61.1c-.9 2.4.3 3.5 2.7 2.6l8.2-3.1l-7.7-7.7l-3.2 8.2"
                      fill="#333"
                    ></path>
                    <path
                      fill="#ffdf85"
                      d="M7.89 41.175l27.86-27.86l4.95 4.95l-27.86 27.86z"
                    ></path>
                    <path
                      fill="#ff8736"
                      d="M17.904 51.142l27.86-27.86l4.95 4.95l-27.86 27.86z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* lower part  */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="mt-14 flex gap-6 items-center w-full max-w-[450px]"
        >
          <div className="text-left w-full">
            <span className="font-handwritten whitespace-nowrap font-semibold text-[var(--eco-ink)] text-lg  inline-block filter select-none tracking-[0.2em]">
              {statuses[statusIndex]}
            </span>
          </div>

          <div
            className="relative flex items-center justify-center w-14 h-14 font-handwritten text-xl border-2 border-[var(--eco-sand)] rounded-full select-none cursor-default filter p-2"
            style={{ filter: "url(#rough-sketch-filter)" }}
          >
            <svg
              className="absolute inset-0 w-full h-full text-[var(--eco-rust)]"
              viewBox="0 0 50 50"
            >
              <path
                d="M 25,2 C 38,2 48,12 48,25 C 48,38 38,48 25,48 C 12,48 2,38 2,25 C 2,12 12,2 25,2 C 27,2 29,2 31,3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="200"
                strokeDashoffset={200 - (progress / 100) * 200}
                className="transition-all duration-100 ease-out"
              />
            </svg>
            <span className="text-[var(--eco-ink)] text-base md:text-lg">
              {progress}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
