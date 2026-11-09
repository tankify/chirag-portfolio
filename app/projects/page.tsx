import type { Metadata } from "next";
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
