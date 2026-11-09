import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Chirag Tank",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <nav className="about-nav" aria-label="Main navigation">
        <Link href="/" className="about-logo" aria-label="Chirag Tank home">
          CT.
        </Link>

        <div className="about-nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About me</Link>
          <Link href="/projects">Projects</Link>
          <a href="mailto:tankchirag22@gmail.com" className="contact-link">
            Contact ↗
          </a>
        </div>
      </nav>

      <section className="not-found-content" aria-labelledby="not-found-title">
        <div className="not-found-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <p className="not-found-label">ERROR / PAGE NOT FOUND</p>
        <h1 id="not-found-title">
          <span>404</span>
          <small>This page isn&apos;t here.</small>
        </h1>
        <p className="not-found-description">
          The link may be outdated, or the page may have moved.
        </p>
        <Link href="/" className="not-found-home-link">
          Back to home <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <footer className="not-found-footer">
        <span>Chirag Tank — Portfolio</span>
        <span>404 · Page not found</span>
      </footer>
    </main>
  );
}
