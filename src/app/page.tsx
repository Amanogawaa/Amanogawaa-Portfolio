"use client";

import DraggableWindow from "@/components/DraggableWindow";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export interface WindowConfig {
  id: string;
  title: string;
  initialX: number;
  initialY: number;
  borderColor: string;
  accentColor: string;
  imgSrc?: string; // Optional custom secret reveal image
}

// Windows configurations for Section 1 (Introduction)
const INTRO_WINDOWS: WindowConfig[] = [
  {
    id: "win-profile",
    title: "profile.png",
    initialX: 20,
    initialY: 40,
    borderColor: "border-emerald-500",
    accentColor: "bg-emerald-500",
    imgSrc: "me2.png",
  },
  {
    id: "win-detail",
    title: "detail.png",
    initialX: 150,
    initialY: 220,
    borderColor: "border-cyan-500",
    accentColor: "bg-cyan-500",
    imgSrc: "me2.png",
  },
  {
    id: "win-system",
    title: "system.sys",
    initialX: 20,
    initialY: 540,
    borderColor: "border-fuchsia-500",
    accentColor: "bg-fuchsia-500",
    imgSrc: "me2.png",
  },
];

// Windows configurations for Section 2 (Projects)
const PROJECTS_WINDOWS: WindowConfig[] = [
  {
    id: "proj-course",
    title: "coursecraft.app",
    initialX: 30,
    initialY: 60,
    borderColor: "border-emerald-500",
    accentColor: "bg-emerald-500",
    imgSrc: "drawing3.jpg",
  },
  {
    id: "proj-ecochain",
    title: "ecochain.app",
    initialX: 200,
    initialY: 260,
    borderColor: "border-cyan-500",
    accentColor: "bg-cyan-500",
    imgSrc: "drawing1.jpg",
  },
  {
    id: "proj-attend",
    title: "attendease.sys",
    initialX: 30,
    initialY: 520,
    borderColor: "border-fuchsia-500",
    accentColor: "bg-fuchsia-500",
    imgSrc: "me1.jpg",
  },
];

// Windows configurations for Section 3 (Experience)
const EXPERIENCE_WINDOWS: WindowConfig[] = [
  {
    id: "exp-kloud",
    title: "kloudtech.sys",
    initialX: 30,
    initialY: 50,
    borderColor: "border-emerald-500",
    accentColor: "bg-emerald-500",
    imgSrc: "me3.jpg",
  },
  {
    id: "exp-aws",
    title: "aws_club.sys",
    initialX: 180,
    initialY: 240,
    borderColor: "border-cyan-500",
    accentColor: "bg-cyan-500",
    imgSrc: "me3.jpg",
  },
  {
    id: "exp-edu",
    title: "education.sys",
    initialX: 30,
    initialY: 510,
    borderColor: "border-fuchsia-500",
    accentColor: "bg-fuchsia-500",
    imgSrc: "me3.jpg",
  },
];

interface ProjectItem {
  title: string;
  role: string;
  period: string;
  tags: string[];
  bullets: string[];
}

const PROJECTS_LIST: ProjectItem[] = [
  {
    title: "CourseCraft",
    role: "Full-Stack Project Developer",
    period: "Personal Project",
    tags: [
      "React/Next.js",
      "FastAPI",
      "PostgreSQL",
      "Firebase Auth",
      "Socket.io",
    ],
    bullets: [
      "Built an AI-assisted course authoring platform with outlines generation, quiz flows, coding practice, and capstones.",
      "Constructed a persistent relational schema in PostgreSQL saving user profile tokens and detailed conversation trails.",
    ],
  },
  {
    title: "EcoChain",
    role: "Web3 & Next.js Developer",
    period: "Community Platform",
    tags: [
      "Next.js",
      "Convex",
      "Mapbox GL",
      "Avalanche Fuji",
      "ethers.js",
      "Solidity",
    ],
    bullets: [
      "Built a sustainable community resource-sharing platform with realtime backend subscriptions and live listings/requests on Mapbox GL.",
      "Designed a claim-handoff verification lifecycle using geofence checking (GPS coordinates) to auto-verify exchanges or flag for manual review.",
      "Wrote and deployed a custom Solidity smart contract on Avalanche Fuji testnet using ethers.js to record immutable proof metadata for handoffs.",
    ],
  },
  {
    title: "AttendEase",
    role: "Angular & PHP Developer",
    period: "Coursework Project",
    tags: ["Angular", "PHP", "MySQL", "QR Code Generation", "Role access"],
    bullets: [
      "Created an event management and attendance tracking platform with role-based dashboard metrics for Students, Organizers, and Admins.",
      "Implemented automated QR ticket registers enabling rapid check-ins and attendance image approvals.",
    ],
  },
  {
    title: "CommunityCare",
    role: "Django & Leaflet Developer",
    period: "Local Government Census",
    tags: ["Django REST API", "React", "Leaflet Map", "JWT Auth", "MySQL"],
    bullets: [
      "Developed a full-stack community census and geographic barangay profiling system using coordinate markers on Leaflet maps.",
      "Exposed JWT-protected CRUD APIs managing citizen data reference tables, educational statuses, and household incomes.",
    ],
  },
  {
    title: "POM-QM Modern",
    role: "Next.js 15 & PuLP Solver Architect",
    period: "Decision Support System",
    tags: ["Next.js 15", "FastAPI", "PuLP Solver Engine", "Recharts", "ShadCN"],
    bullets: [
      "Redesigned the classic POM-QM desktop software into a modern, responsive web app featuring interactive charts and PDF report logs.",
      "Deployed high-performance operations research solvers in FastAPI (PuLP + HiGHS) resolving Linear Programming and Transportation problems.",
    ],
  },
];

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    company: "Kloudtech — Intern / AI Automation Developer",
    role: "AI Automation & Full-Stack Intern",
    period: "Apr 2025 – Apr 2026",
    bullets: [
      "Built an end-to-end n8n workflow covering data validation, AI captioning (Groq), parallel logging, and automated Telegram publishing.",
      "Developed a Next.js dashboard that pulls live Open-Meteo weather stats for 11 stations and exports visual templates via html2canvas.",
      "Implemented Human-in-the-Loop workflows with email-based approval triggers and timeout pausings.",
      "Redesigned frontend dashboards for climate event monitors and deployed parallel Google Drive/Sheets audit logs.",
    ],
  },
  {
    company: "AWS Cloud Club — Vice Chief of Creatives",
    role: "Creative Community Member",
    period: "Sep 2023 – Present",
    bullets: [
      "Create visual content strategies for club gatherings, and coordinate serverless cloud workshop panels.",
    ],
  },
  {
    company: "Ryzenation — Computer Hardware Specialist",
    role: "On-the-Job Training Specialist",
    period: "Jun 2023 – Aug 2023",
    bullets: [
      "Diagnosed and troubleshot software errors and network operational diagnostics for local retail client machines.",
    ],
  },
  {
    company: "Gordon College — Student Developer",
    role: "Undergraduate Computer Scientist",
    period: "Aug 2022 – Present",
    bullets: [
      "Developed multiple full-stack React, Next.js, and Angular platforms for advanced systems coursework.",
      "Pursuing a Bachelor of Science in Computer Science (Gordon College — Aug 2022 – Present).",
    ],
  },
];

export default function Home() {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const containerRef3 = useRef<HTMLDivElement>(null);

  const [activeWindowId, setActiveWindowId] = useState<string>("win-profile");
  const [activeProjWindowId, setActiveProjWindowId] =
    useState<string>("proj-course");
  const [activeExpWindowId, setActiveExpWindowId] =
    useState<string>("exp-kloud");
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0); // 0 = Intro, 1 = Projects, 2 = Experience
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global scroll gesture detection (trackpad horizontal swipe & vertical scroll on grid background)
  useEffect(() => {
    if (isLoading) return;

    let lastScrollTime = 0;
    const scrollCooldown = 900; // Cooldown to slide exactly one section per swipe

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;

      // Check if mouse cursor is hover over the scrollable ledger
      const isInsideScrollableLedger = (e.target as HTMLElement)?.closest(
        ".overflow-y-auto",
      );

      const deltaX = e.deltaX;
      const deltaY = e.deltaY;

      // 1. Detect horizontal trackpad swipe
      if (Math.abs(deltaX) > 35) {
        if (deltaX > 0 && currentSection < 2) {
          setCurrentSection((prev) => prev + 1);
          lastScrollTime = now;
        } else if (deltaX < 0 && currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
          lastScrollTime = now;
        }
      }
      // 2. Detect vertical scroll wheel if NOT scrolling inside the scrollable ledger
      else if (!isInsideScrollableLedger && Math.abs(deltaY) > 45) {
        if (deltaY > 0 && currentSection < 2) {
          setCurrentSection((prev) => prev + 1);
          lastScrollTime = now;
        } else if (deltaY < 0 && currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
          lastScrollTime = now;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLoading, currentSection]);

  // Global Keyboard Arrow Key navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    if (isLoading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if user is typing in an input
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (e.key === "ArrowRight" && currentSection < 2) {
        setCurrentSection((prev) => prev + 1);
      } else if (e.key === "ArrowLeft" && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, currentSection]);

  // Global Mobile Touch Swipe gesture detection
  useEffect(() => {
    if (isLoading) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant and exceeds swipe length threshold
      if (Math.abs(diffX) > 70 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0 && currentSection < 2) {
          setCurrentSection((prev) => prev + 1);
        } else if (diffX > 0 && currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isLoading, currentSection]);

  if (!mounted) {
    return (
      <div
        style={{
          backgroundColor: "#f7f3ea",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
        }}
      />
    );
  }

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
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Viewport-wide Hand-Drawn Screen Border Frame (Not constrained by max-w-7xl) */}
      <AnimatePresence>
        {!isLoading && (
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            style={{ filter: "url(#rough-sketch-filter)" }}
            className="fixed inset-0 z-50 text-[var(--eco-moss)] pointer-events-none overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <g stroke="currentColor" fill="none">
              {/* Top outline (Double stroke) */}
              <path
                d="M -0.5,0.6 Q 50,0.2 100.5,0.6"
                strokeWidth="2.2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M -0.2,0.3 Q 50,-0.1 100.2,0.3"
                strokeWidth="0.8"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Right outline (Double stroke) */}
              <path
                d="M 99.4,-0.5 Q 99.8,50 99.4,100.5"
                strokeWidth="2.2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 99.7,-0.2 Q 100.1,50 99.7,100.2"
                strokeWidth="0.8"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Bottom outline (Double stroke) */}
              <path
                d="M 100.5,99.4 Q 50,99.8 -0.5,99.4"
                strokeWidth="2.2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 100.2,99.7 Q 50,100.1 -0.2,99.7"
                strokeWidth="0.8"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Left outline (Double stroke) */}
              <path
                d="M 0.6,-0.5 Q 0.2,50 0.6,100.5"
                strokeWidth="2.2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 0.3,-0.2 Q -0.1,50 0.3,100.2"
                strokeWidth="0.8"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Sketched Floating Navigation menu Dock */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ y: 60, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3.5 px-4 py-2.5 bg-[var(--eco-mist)] border border-[var(--eco-sand)] shadow-[0_4px_12px_rgba(31,42,36,0.06)] rounded-lg select-none filter font-mono text-[10px] font-bold tracking-wider"
            style={{ filter: "url(#rough-sketch-filter)" }}
          >
            <button
              onClick={() => setCurrentSection(0)}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSection === 0
                  ? "bg-[var(--eco-moss)] text-[var(--eco-base)] shadow-sm font-bold"
                  : "text-[var(--eco-ink)] hover:bg-[var(--eco-sand)]/50"
              }`}
            >
              <span>01 //</span>
              <span>INTRO</span>
            </button>

            <div className="w-[1px] h-3 bg-[var(--eco-sand)]/80" />

            <button
              onClick={() => setCurrentSection(1)}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentSection === 1
                  ? "bg-[var(--eco-moss)] text-[var(--eco-base)] shadow-sm font-bold"
                  : "text-[var(--eco-ink)] hover:bg-[var(--eco-sand)]/50"
              }`}
            >
              <span>02 //</span>
              <span>PROJECTS</span>
            </button>

            <div className="w-[1px] h-3 bg-[var(--eco-sand)]/80" />

            <button
              onClick={() => setCurrentSection(2)}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSection === 2
                  ? "bg-[var(--eco-moss)] text-[var(--eco-base)] shadow-sm font-bold"
                  : "text-[var(--eco-ink)] hover:bg-[var(--eco-sand)]/50"
              }`}
            >
              <span>03 //</span>
              <span>EXPERIENCE</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 01: INTRODUCTION */}
      <motion.main
        className="fixed inset-0 z-40 flex flex-row items-stretch justify-between text-[var(--eco-ink)] select-none overflow-hidden font-sans w-full max-w-7xl mx-auto p-10 pb-24"
        initial={{ opacity: 0, x: 0 }}
        animate={
          !isLoading
            ? {
                opacity: currentSection === 0 ? 1 : 0,
                x:
                  currentSection === 0
                    ? 0
                    : currentSection > 0
                      ? "-100vw"
                      : "100vw",
                pointerEvents: currentSection === 0 ? "auto" : "none",
              }
            : {}
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* LEFT COLUMN: Widescreen Typography & Portfolio Info */}
        <div className="flex-1 flex flex-col justify-between items-center p-12 md:p-16 text-[var(--eco-ink)] max-h-screen relative text-center">
          {/* Subtle placeholder to push card to center */}
          <div className="hidden md:block h-12" />

          {/* Centered Sketched Dossier Card Wrapper */}
          <div className="relative w-full flex flex-col items-start justify-center p-8 select-none my-auto">
            {/* Sketched Title Name */}
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--eco-moss)] font-semibold font-mono block mb-1">
              hi!, i'm
            </span>
            <h1 className="font-handwritten text-4xl md:text-5xl text-[var(--eco-ink)] tracking-wide filter select-none drop-shadow-[0_1px_2px_rgba(31,42,36,0.12)] z-10 mt-2">
              DOMINIC L. MOLINO
            </h1>

            {/* Sketched divider stroke line */}
            <svg
              width="220"
              height="12"
              viewBox="0 0 220 12"
              fill="none"
              style={{ filter: "url(#rough-sketch-filter)" }}
              className="text-[var(--eco-rust)] my-3.5 z-10 overflow-visible"
            >
              <path
                d="M -5,6 Q 110,2 225,5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M -2,4 Q 110,5 222,3"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </svg>

            {/* Centered Role */}
            <div className="text-lg text-[var(--eco-rust)] font-bold uppercase tracking-[0.22em] leading-relaxed z-10">
              Full-Stack Developer &<br />
              AI Automation Engineer
            </div>

            <div className="text-sm text-[var(--eco-ink)]/85 tracking-wide z-10 text-left mt-5 max-w-lg leading-relaxed select-text">
              Full-Stack Developer and AI Automation Engineer with expertise in
              modern frontend technologies (React, Next.js, TypeScript,
              Tailwind) and backend development (FastAPI, Node.js). Experienced
              in building complete web applications, AI-powered tools, and
              end-to-end automation workflows using n8n, LLM APIs, and
              webhook-driven pipelines with Human-in-the-Loop design.
            </div>

            {/* Hand-Drawn Contact Badges */}
            <div className="flex flex-wrap gap-2.5 mt-6 z-10 font-mono text-xs uppercase tracking-wider">
              <a
                href="mailto:dommolino28@gmail.com"
                className="px-3 py-2 border border-dashed border-[var(--eco-sand)] bg-[var(--eco-mist)]/55 hover:bg-[var(--eco-sand)]/80 hover:border-[var(--eco-rust)] rounded text-[var(--eco-ink)] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>📬</span>
                <span>dommolino28@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/dominic-molino-1366452b1/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 border border-dashed border-[var(--eco-sand)] bg-[var(--eco-mist)]/55 hover:bg-[var(--eco-sand)]/80 hover:border-[var(--eco-moss)] rounded text-[var(--eco-ink)] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <div className="px-3 py-2 border border-dashed border-[var(--eco-sand)] bg-[var(--eco-mist)]/30 rounded text-[var(--eco-ink)]/75 flex items-center gap-2 select-none shadow-sm">
                <span>📍</span>
                <span>Olongapo, PH</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Full-Height side-docked Canvas Panel */}
        <div
          ref={containerRef1}
          className="relative h-full aspect-[614/1091] bg-slate-900/40 border border-slate-300 shadow-2xl overflow-hidden cursor-crosshair select-none flex-shrink-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,ransparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <img
            src="drawing2.png"
            alt="Sketch Background"
            draggable="false"
            className="absolute top-0 left-0 max-w-none h-full aspect-[614/1091] origin-top-left pointer-events-none"
            width={614}
            height={1091}
          />

          {INTRO_WINDOWS.map((win) => (
            <DraggableWindow
              key={win.id}
              config={win}
              containerRef={containerRef1}
              isActive={activeWindowId === win.id}
              onFocus={() => setActiveWindowId(win.id)}
            />
          ))}
        </div>
      </motion.main>

      {/* SECTION 02: PROJECTS */}
      <motion.section
        className="fixed inset-0 z-40 flex flex-row items-stretch justify-between text-[var(--eco-ink)] select-none overflow-hidden font-sans w-full max-w-7xl mx-auto p-10 pb-24"
        initial={{ opacity: 0, x: "100vw" }}
        animate={
          !isLoading
            ? {
                opacity: currentSection === 1 ? 1 : 0,
                x:
                  currentSection === 1
                    ? 0
                    : currentSection > 1
                      ? "-100vw"
                      : "100vw",
                pointerEvents: currentSection === 1 ? "auto" : "none",
              }
            : {}
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* LEFT COLUMN: Scrollable works ledger */}
        <div className="flex-1 flex flex-col justify-start items-stretch p-6 md:p-12 text-[var(--eco-ink)] max-h-full overflow-y-auto z-10 text-left select-none pr-4">
          <div className="flex justify-between items-center border-b border-dashed border-[var(--eco-sand)] pb-4 mb-6 select-none">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--eco-moss)] font-semibold font-mono block mb-1">
                LEDGER_SEC_02
              </span>
              <h2 className="text-3xl font-handwritten text-[var(--eco-ink)] select-none">
                Featured Projects
              </h2>
            </div>
            <span className="text-[9px] font-mono text-[var(--eco-rust)] font-bold uppercase tracking-wider select-none">
              Dominic L. Molino
            </span>
          </div>

          {/* Projects Sub-ledger */}
          <div className="flex flex-col gap-6 select-none">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--eco-rust)] font-bold mb-1">
              [I. CHRONICLES OF BUILDS]
            </h3>

            {PROJECTS_LIST.map((proj, idx) => (
              <div
                key={idx}
                className="relative bg-[var(--eco-mist)]/45 p-5 border border-dashed border-[var(--eco-sand)] rounded-lg hover:bg-[var(--eco-mist)]/80 transition-all duration-200"
              >
                <div className="flex justify-between items-start gap-4 mb-2 select-none">
                  <div>
                    <h4 className="font-handwritten text-xl text-[var(--eco-ink)]">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {proj.role}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-[var(--eco-sand)] px-2 py-0.5 rounded text-[var(--eco-ink)] select-none">
                    {proj.period}
                  </span>
                </div>

                <ul className="list-disc pl-4 space-y-1.5 text-xs text-[var(--eco-ink)]/85 mb-3 leading-relaxed select-text select-none">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 font-mono text-[9px] select-none">
                  {proj.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="border border-[var(--eco-rust)]/30 text-[var(--eco-rust)] px-2 py-0.5 rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Full-Height side-docked Canvas Panel (Second Layer) */}
        <div
          ref={containerRef2}
          className="relative h-full aspect-[614/1091] bg-slate-900/40 border border-slate-300 shadow-2xl overflow-hidden cursor-crosshair select-none flex-shrink-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <img
            src="drawing3.jpg"
            alt="Sketch Background Projects"
            draggable="false"
            className="absolute top-0 left-0 max-w-none h-full aspect-[614/1091] origin-top-left pointer-events-none"
            width={614}
            height={1091}
          />

          {PROJECTS_WINDOWS.map((win) => (
            <DraggableWindow
              key={win.id}
              config={win}
              containerRef={containerRef2}
              isActive={activeProjWindowId === win.id}
              onFocus={() => setActiveProjWindowId(win.id)}
            />
          ))}
        </div>
      </motion.section>

      {/* SECTION 03: EXPERIENCE */}
      <motion.section
        className="fixed inset-0 z-40 flex flex-row items-stretch justify-between text-[var(--eco-ink)] select-none overflow-hidden font-sans w-full max-w-7xl mx-auto p-10 pb-24"
        initial={{ opacity: 0, x: "100vw" }}
        animate={
          !isLoading
            ? {
                opacity: currentSection === 2 ? 1 : 0,
                x:
                  currentSection === 2
                    ? 0
                    : currentSection > 2
                      ? "-100vw"
                      : "100vw",
                pointerEvents: currentSection === 2 ? "auto" : "none",
              }
            : {}
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* LEFT COLUMN: Scrollable experience ledger */}
        <div className="flex-1 flex flex-col justify-start items-stretch p-6 md:p-12 text-[var(--eco-ink)] max-h-full overflow-y-auto z-10 text-left select-none pr-4">
          <div className="flex justify-between items-center border-b border-dashed border-[var(--eco-sand)] pb-4 mb-6 select-none">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--eco-moss)] font-semibold font-mono block mb-1">
                LEDGER_SEC_03
              </span>
              <h2 className="text-3xl font-handwritten text-[var(--eco-ink)] select-none">
                Timeline & Experience
              </h2>
            </div>
            <span className="text-[9px] font-mono text-[var(--eco-rust)] font-bold uppercase tracking-wider select-none">
              Dominic L. Molino
            </span>
          </div>

          {/* Experience Sub-ledger */}
          <div className="flex flex-col gap-6 select-none">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--eco-rust)] font-bold mb-1">
              [II. COGNITIVE TIMELINE]
            </h3>

            {EXPERIENCE_LIST.map((exp, idx) => (
              <div
                key={idx}
                className="bg-[var(--eco-mist)]/30 p-5 border border-dashed border-[var(--eco-sand)] rounded-lg hover:bg-[var(--eco-mist)]/60 transition-colors duration-200"
              >
                <div className="flex justify-between items-start gap-4 mb-2 select-none">
                  <div>
                    <h4 className="font-handwritten text-lg text-[var(--eco-ink)]">
                      {exp.company}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {exp.role}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-[var(--eco-sand)] px-2 py-0.5 rounded text-[var(--eco-ink)] select-none">
                    {exp.period}
                  </span>
                </div>

                <ul className="list-disc pl-4 space-y-1.5 text-xs text-[var(--eco-ink)]/85 leading-relaxed select-text select-none">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Full-Height side-docked Canvas Panel (Third Layer) */}
        <div
          ref={containerRef3}
          className="relative h-full aspect-[614/1091] bg-slate-900/40 border border-slate-300 shadow-2xl overflow-hidden cursor-crosshair select-none flex-shrink-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <img
            src="drawing1.jpg"
            alt="Sketch Background Experience"
            draggable="false"
            className="absolute top-0 left-0 max-w-none h-full aspect-[614/1091] origin-top-left pointer-events-none"
            width={614}
            height={1091}
          />

          {EXPERIENCE_WINDOWS.map((win) => (
            <DraggableWindow
              key={win.id}
              config={win}
              containerRef={containerRef3}
              isActive={activeExpWindowId === win.id}
              onFocus={() => setActiveExpWindowId(win.id)}
            />
          ))}
        </div>
      </motion.section>
    </>
  );
}
