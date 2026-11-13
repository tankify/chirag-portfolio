"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: "edge-ai-meter",
    eyebrow: "01 / EDGE AI · ACADEMIC PROJECT",
    title: "Edge AI Smart Meter Reading System",
    displayTitle: "Smart Meter Reading System",
    summary:
      "An ESP32-CAM uses YOLOv7 and OCR to read electricity meters at the edge, then sends readings over LoRa.",
    technologies: ["ESP32-CAM", "YOLOv7", "OpenCV", "OCR", "LoRa"],
    visual: "meter",
    links: [
      {
        label: "Watch demo video ↗",
        href: "https://www.youtube.com/watch?v=LwrLxajTQgY",
      },
      {
        label: "Professor’s appreciation ↗",
        href: "https://lnkd.in/p/gGTM5Nu6",
      },
      {
        label: "IEEE DataPort dataset ↗",
        href: "https://ieee-dataport.org/documents/dataset-electricity-meter-readings-across-diverse-conditions#files",
      },
    ],
  },
  {
    id: "lifelink",
    eyebrow: "02 / DJANGO · FULL-STACK DEMO",
    title: "LifeLink — Blood Donation Coordination Demo",
    displayTitle: "LifeLink",
    summary:
      "A Django app for exploring fictional blood donors, requests, blood banks, and camps by blood group and city.",
    highlights: [
      "Donor search by blood group and city",
      "Account-gated donor and request forms",
      "City-based centres, camps, and map",
    ],
    technologies: ["Python", "Django", "SQLite", "HTML/CSS", "OpenStreetMap"],
    disclaimer:
      "Demo only: fictional records. Local submissions reset when the server stops.",
    visual: "lifelink",
    links: [
      {
        label: "View source code ↗",
        href: "https://github.com/tankify/blood-bank-management",
      },
    ],
  },
  {
    id: "project-three",
    eyebrow: "03 / PROJECT",
    title: "More work, coming soon.",
    summary:
      "This placeholder will become a full project story when the next demo is ready to share.",
    technologies: ["COMING SOON"],
    visual: "signal",
    links: [],
  },
];

const ROTATION_INTERVAL = 6500;

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [stageHeight, setStageHeight] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  const isPaused =
    isManuallyPaused ||
    prefersReducedMotion ||
    isDocumentHidden;

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionPreference.matches);
    };

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentHidden(document.hidden);

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const activateHashProject = () => {
      const targetId = window.location.hash.slice(1);
      const targetIndex = projects.findIndex((project) => project.id === targetId);

      if (targetIndex >= 0) setActiveIndex(targetIndex);
    };

    activateHashProject();
    window.addEventListener("hashchange", activateHashProject);
    window.addEventListener("popstate", activateHashProject);

    return () => {
      window.removeEventListener("hashchange", activateHashProject);
      window.removeEventListener("popstate", activateHashProject);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [activeIndex, isPaused]);

  useEffect(() => {
    const activeCard = activeCardRef.current;
    if (!activeCard) return;

    const updateStageHeight = () => {
      setStageHeight(Math.ceil(activeCard.getBoundingClientRect().height + 32));
    };

    updateStageHeight();
    const observer = new ResizeObserver(updateStageHeight);
    observer.observe(activeCard);

    return () => observer.disconnect();
  }, [activeIndex]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  return (
    <section
      aria-label="Project spotlight. Use the left and right arrow keys to change projects."
      aria-roledescription="carousel"
      className="project-carousel"
      role="region"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <div
        className="project-carousel-stage"
        style={stageHeight ? { height: `${stageHeight}px` } : undefined}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;

          if (startX === null || endX === undefined) return;

          const swipeDistance = startX - endX;
          if (Math.abs(swipeDistance) < 55) return;

          if (swipeDistance > 0) {
            showNext();
          } else {
            showPrevious();
          }
        }}
      >
        {projects.map((project, index) => {
          const previousIndex = (activeIndex - 1 + projects.length) % projects.length;
          const nextIndex = (activeIndex + 1) % projects.length;
          const position =
            index === activeIndex
              ? "active"
              : index === previousIndex
                ? "previous"
                : "next";

          return (
            <article
              aria-hidden={index !== activeIndex}
              aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
              aria-roledescription="slide"
              className={`project-slide project-slide--${position}${project.id === "edge-ai-meter" ? " project-slide--edge-ai" : project.id === "lifelink" ? " project-slide--lifelink" : ""}`}
              inert={index !== activeIndex}
              id={project.id}
              key={project.id}
              role="group"
            >
              <div
                className="project-slide-card"
                ref={index === activeIndex ? activeCardRef : null}
              >
                <div
                  aria-hidden="true"
                  className={`project-artwork project-artwork--${project.visual}`}
                >
                  {project.visual === "meter" ? (
                    <>
                      <div className="meter-artwork-heading">
                        <span>EDGE COMPUTER VISION</span>
                        <span>ESP32-CAM / YOLOv7</span>
                      </div>
                      <div className="meter-photo-frame">
                        <Image
                          alt="ESP32-CAM mounted in front of a digital electricity meter during a project test"
                          className="meter-project-photo"
                          fill
                          sizes="(max-width: 760px) 90vw, 45vw"
                          src="/smart-meter-project.png"
                        />
                      </div>
                      <div className="meter-artwork-footer">
                        <span>CAPTURE</span>
                        <span>→</span>
                        <span>PROCESS</span>
                        <span>→</span>
                        <span>TRANSMIT</span>
                      </div>
                    </>
                  ) : project.visual === "lifelink" ? (
                    <>
                      <div className="lifelink-photo-frame">
                        <Image
                          alt=""
                          className="lifelink-project-photo"
                          fill
                          sizes="(max-width: 760px) 90vw, 45vw"
                          src="/lifelink-home.png"
                        />
                      </div>
                      <div className="lifelink-logo-badge">
                        <Image
                          alt=""
                          height={134}
                          src="/lifelink-logo.png"
                          width={296}
                        />
                      </div>
                      <div className="lifelink-artwork-footer">
                        PEOPLE HELPING PEOPLE · DJANGO DEMO
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="placeholder-artwork-label">
                        {project.visual === "systems"
                          ? "SYSTEMS / DESIGN"
                          : "SIGNALS / INSIGHTS"}
                      </div>
                      <div className="placeholder-artwork-shape">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="placeholder-artwork-footer">
                        CASE STUDY IN PROGRESS
                      </div>
                    </>
                  )}
                </div>

                <div className="project-slide-content">
                  <div className="project-slide-eyebrow">{project.eyebrow}</div>
                  <h2>{"displayTitle" in project ? project.displayTitle : project.title}</h2>
                  <p className="project-slide-summary">{project.summary}</p>

                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="project-highlights" aria-label="Project features">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  <ul className="project-tech-list" aria-label="Technologies used">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>

                  {"disclaimer" in project && (
                    <p className="project-demo-note">{project.disclaimer}</p>
                  )}

                  {project.links.length > 0 ? (
                    <div className="project-resource-links">
                      {index === activeIndex &&
                        project.links.map((link) => (
                          <a
                            href={link.href}
                            key={link.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {link.label}
                          </a>
                        ))}
                    </div>
                  ) : (
                    <span className="project-coming-soon">MORE DETAILS SOON</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="project-carousel-controls">
        <button
          aria-label="Previous project"
          className="carousel-arrow"
          onClick={showPrevious}
          type="button"
        >
          ←
        </button>

        <div
          className="carousel-pagination"
          role="group"
          aria-label="Choose a project"
        >
          {projects.map((project, index) => (
            <button
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={`Show ${project.title}`}
              className={`carousel-dot${index === activeIndex ? " is-active" : ""}`}
              key={project.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>

        <span className="carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>

        <button
          aria-label="Next project"
          className="carousel-arrow"
          onClick={showNext}
          type="button"
        >
          →
        </button>

        <button
          aria-label={
            prefersReducedMotion
              ? "Automatic rotation disabled by reduced motion preference"
              : isManuallyPaused
                ? "Resume carousel"
                : "Pause carousel"
          }
          className="carousel-pause"
          disabled={prefersReducedMotion}
          onClick={() => {
            if (isManuallyPaused) {
              setIsManuallyPaused(false);
            } else {
              setIsManuallyPaused(true);
            }
          }}
          type="button"
        >
          {prefersReducedMotion
            ? "Motion off"
            : isManuallyPaused
              ? "Play"
              : "Pause"}
        </button>
      </div>
    </section>
  );
}
