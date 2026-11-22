import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";

export const metadata: Metadata = {
  title: "Projects | Chirag Tank",
  description:
    "Engineering projects by Chirag Tank, with technical highlights, demos, and supporting resources.",
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <nav className="projects-nav" aria-label="Main navigation">
        <Link href="/" className="projects-logo" aria-label="Chirag Tank home">
          CT<span>.</span>
        </Link>

        <div className="projects-nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <span className="active" aria-current="page">
            Projects
          </span>
          <a href="mailto:tankchirag22@gmail.com" className="projects-contact-link">
            Contact ↗
          </a>
        </div>
      </nav>

      <section className="projects-hero">
        <span className="section-label">ENGINEERING / SELECTED WORK</span>
        <h1>
          Projects built to solve
          <br />
          <span>real problems.</span>
        </h1>
        <p>
          A closer look at the systems, experiments, and ideas I&apos;ve built.
          More project stories will be added as their demos are ready to share.
        </p>
      </section>

      <section id="ai-projects" className="ai-projects-section">
        <div className="ai-projects-heading">
          <span className="section-label">01 / AI PROJECTS</span>
          <h2>AI projects, built and explored.</h2>
          <p>
            Technical stories behind the AI systems I&apos;ve worked on, from
            edge computer vision to applied machine learning.
          </p>
        </div>

        <article className="ai-project-feature" id="edge-ai-meter">
          <div className="ai-project-feature-image">
            <Image
              alt="ESP32-CAM prototype mounted in front of a digital electricity meter"
              fill
              sizes="(max-width: 760px) 90vw, 45vw"
              src="/smart-meter-project.png"
            />
            <span>EDGE AI · IIT (BHU)</span>
          </div>
          <div className="ai-project-feature-copy">
            <span className="ai-project-feature-index">01 / COMPUTER VISION</span>
            <h3>Smart Meter Reading System</h3>
            <p>
              An ESP32-CAM meter reader using two recognition approaches:
              YOLOv7 with OCR, and a quantized FOMO model for constrained edge
              hardware.
            </p>
            <div className="ai-work-tags" aria-label="Project technologies">
              <span>ESP32-CAM</span>
              <span>YOLOv7</span>
              <span>FOMO</span>
              <span>MobileNetV2</span>
              <span>INT8</span>
              <span>LoRa</span>
            </div>
            <Link href="/projects/edge-ai-meter">Technical deep dive ↗</Link>
          </div>
        </article>
      </section>

      <section className="project-spotlight-heading">
        <span className="section-label">02 / PROJECT SPOTLIGHT</span>
        <h2>Explore the rest of my work.</h2>
        <p>Browse the systems, experiments, and demos I&apos;ve built.</p>
      </section>

      <ProjectCarousel />

      <div className="projects-page-footer">
        <Link href="/" className="projects-back-link">
          ← Back to home
        </Link>
        <span>Chirag Tank — Portfolio · 2026</span>
      </div>
    </main>
  );
}
