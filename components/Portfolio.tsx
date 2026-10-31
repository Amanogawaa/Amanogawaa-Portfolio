"use client";

import { experience, projects, skills } from "@/lib/data";
import { ArrowUpRight, Mail, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import Lanyard from "./Lanyard";

export function Portfolio() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <main className="relative h-screen w-full overflow-x-clip">
      <header className="sticky top-4 z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <div className="flex h-14 items-center justify-between rounded-full border border-border/60 bg-background/80 px-5 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/70">
            <Link href="/" className="text-sm font-semibold tracking-[-0.02em]">
              Dominic Molino
            </Link>

            <nav
              className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
              aria-label="Main navigation"
            >
              <a
                className="transition-colors hover:text-foreground"
                href="#about"
              >
                About
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href="#experience"
              >
                Experience
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href="#projects"
              >
                Projects
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href="#contact"
              >
                Contact
              </a>
            </nav>

            <button
              type="button"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDark((value) => !value)}
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {dark ? (
                <Sun aria-hidden="true" size={16} />
              ) : (
                <Moon aria-hidden="true" size={16} />
              )}
            </button>
          </div>
        </FadeIn>
      </header>

      <div className="pointer-events-none absolute inset-y-10 right-32 z-0 hidden w-[45%] lg:block">
        <div className="pointer-events-auto h-full w-full">
          <Lanyard
            style={{}}
            frontImage="/me1.jpg"
            backImage=""
            strapImage="/band.png"
            imageFit="cover"
            cardColor="#ffffff"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.3}
            size={0.6}
            anchor="right"
            strapLength={0.5}
            strapColor="#111111"
            strapWidth={0.65}
            metal="silver"
            gravity={1}
            damping={0.5}
            elasticity={0.5}
            breeze={0.5}
            interactive
            intro
          />
        </div>
      </div>

      <div id="top" className="mx-auto max-w-6xl px-4 lg:px-6">
        <section
          id="about"
          className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-24 lg:py-32"
        >
          <FadeIn>
            <p className="mb-7 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Full Stack Developer · Olongapo City, Philippines
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.06em] sm:text-7xl lg:text-[5.5rem]">
              I build systems that turn complex workflows into something people
              can actually use.{" "}
            </h1>
            <div className="mt-10 flex max-w-2xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                I work across the stack — from React and Next.js frontends to
                FastAPI/ExpressJS backends and AI-powered automation workflows
                that actually ship.
              </p>
            </div>
          </FadeIn>
        </section>

        <section
          className="border-t border-border py-24 lg:py-32"
          aria-labelledby="skills-heading"
        >
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <h2
                id="skills-heading"
                className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground"
              >
                01 / Capabilities
              </h2>
              <div className="grid gap-12 sm:grid-cols-3">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="mb-5 text-lg font-medium">{category}</h3>
                    <ul className="flex flex-col gap-3 text-muted-foreground">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <section
          id="projects"
          className="border-t border-border py-24 lg:py-32"
          aria-labelledby="projects-heading"
        >
          <FadeIn>
            <div className="mb-14 flex items-end justify-between gap-4">
              <div>
                <h2
                  id="projects-heading"
                  className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground"
                >
                  02 / Works
                </h2>
                <p className="mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  A few things I&apos;ve built.
                </p>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                2022 — 2026
              </span>
            </div>
            <div className="grid gap-px overflow-hidden  md:grid-cols-6">
              {projects.map((project, index) => (
                <article
                  key={project.number}
                  className={`
        group flex min-h-90 flex-col bg-background p-7 transition-colors border border-border
        hover:bg-muted/40 lg:p-8
        md:col-span-2
        ${index === 3 ? "md:col-start-2" : ""}
        ${index === 4 ? "md:col-start-4" : ""}
      `}
                >
                  {/* Top section */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                      {project.number}
                    </span>

                    {/* Status badge */}
                    <span
                      className={`
            rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide
            ${
              project.status === "Live"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : project.status === "In Progress"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "bg-muted text-muted-foreground"
            }
          `}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-2xl font-medium tracking-[-0.04em]">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom section (always pushed to the bottom) */}
                  <div className="mt-auto pt-8">
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {project.stack}
                    </p>

                    <div className="mt-6 flex gap-5 text-sm">
                      {project.status === "Live" ? (
                        <Link
                          href={project.link}
                          target="_blank"
                          className="inline-flex items-center gap-1 font-medium hover:underline"
                        >
                          Live demo
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          Live demo
                        </span>
                      )}

                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
                      >
                        GitHub <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </section>

        <section
          id="experience"
          className="border-t border-border py-24 lg:py-32"
          aria-labelledby="experience-heading"
        >
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <h2
                id="experience-heading"
                className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground"
              >
                03 / Experience
              </h2>
              <div className="flex flex-col">
                {experience.map((job) => (
                  <article
                    key={job.years}
                    className="grid gap-4 border-b border-border py-8 first:pt-0 sm:grid-cols-[150px_1fr] justify-items-center"
                  >
                    <p className="text-sm text-muted-foreground">{job.years}</p>
                    <div>
                      <h3 className="text-lg font-medium">{job.role}</h3>
                      <p className="mt-1 text-muted-foreground">
                        {job.company}
                      </p>
                      <ul className="mt-5 flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
                        {job.details.map((detail) => (
                          <li key={detail} className="flex gap-3">
                            <span aria-hidden="true">—</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <section
          id="contact"
          className="border-t border-border py-24 lg:py-32"
          aria-labelledby="contact-heading"
        >
          <FadeIn>
            <div className="max-w-3xl">
              <h2
                id="contact-heading"
                className="text-5xl font-medium leading-[1.05] tracking-[-0.06em] sm:text-7xl"
              >
                Let&apos;s build something useful.
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-8 text-muted-foreground">
                Open to roles in software engineering, QA automation, and AI
                automation. Reach out anytime.
              </p>
              <a
                href="mailto:dominic.molino.01@gmail.com"
                className="mt-10 inline-flex items-center gap-2 border-b border-foreground pb-2 font-medium hover:opacity-60"
              >
                dominic.molino.01@gmail.com{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </FadeIn>
        </section>

        <footer className="flex flex-col gap-5 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Dominic Molino. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="dominic.molino.01@gmail.com"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Mail size={17} aria-hidden="true" /> Email
            </Link>
            <Link
              href="https://github.com/Amanogawaa"
              target="_blank"
              className="hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/dominic-molino/"
              className="hover:text-foreground"
            >
              LinkedIn
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
