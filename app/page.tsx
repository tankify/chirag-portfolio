import Image from "next/image";
import Link from "next/link";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/tankify",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chirag-tank-a64072205/",
  },
  {
    label: "Email",
    href: "mailto:tankchirag22@gmail.com",
  },
];

const projectPreviews = [
  "EDGE AI / SMART METER",
  "PROJECT 02 · COMING SOON",
  "PROJECT 03 · COMING SOON",
];

export default function Home() {
  return (
    <main className="portfolio">
      <nav className="about-nav" aria-label="Main navigation">
        <Link href="/" className="about-logo" aria-label="Chirag Tank home">
          CT.
        </Link>

        <div className="about-nav-links">
          <span className="active" aria-current="page">
            Home
          </span>
          <Link href="/about">About me</Link>
          <Link href="/projects">Projects</Link>
          <a href="#contact" className="contact-link">
            Contact ↗
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-label">
            <span>SOFTWARE ENGINEER</span>
            <span>BASED IN INDIA</span>
          </div>

          <h1>
            Building things
            <br />
            that <span className="accent">matter.</span>
          </h1>

          <p className="intro">
            Hi, I&apos;m Chirag. I build software, explore AI, and turn complex
            problems into elegant solutions.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-button">
              Explore my work <span>↘</span>
            </a>

            <Link href="/about" className="secondary-button">
              More about me ↗
            </Link>
          </div>
        </div>

        <div className="hero-portrait">
          <div className="hero-portrait-frame">
            <Image
              src="/chirag-portrait.png"
              alt="Portrait of Chirag Tank"
              fill
              priority
              sizes="(max-width: 700px) 90vw, 38vw"
              className="hero-portrait-image"
            />
            <div className="hero-portrait-overlay">
              <span>CHIRAG TANK</span>
              <p>SOFTWARE ENGINEER</p>
            </div>
          </div>
          <p className="hero-portrait-caption">BUILDING WHAT COMES NEXT</p>
        </div>
      </section>

      <section className="ticker" aria-label="Areas of interest">
        <span>SOFTWARE ENGINEERING</span>
        <span>✳</span>
        <span>ARTIFICIAL INTELLIGENCE</span>
        <span>✳</span>
        <span>SYSTEM DESIGN</span>
      </section>

      <section id="about" className="about-section">
        <div className="about-heading">
          <span className="section-label">01 / ABOUT</span>
          <h2>
            Curious by nature.
            <br />
            <span>Engineer by choice.</span>
          </h2>
        </div>
        <p>
          I enjoy building reliable systems, solving challenging engineering
          problems, and exploring the intersection of software and artificial
          intelligence.
        </p>
      </section>

      <section id="projects" className="projects-section">
        <span className="section-label">02 / SELECTED WORK</span>
        <h2>Things I&apos;ve built.</h2>
        <p className="projects-intro">
          Interesting problems deserve thoughtful solutions.
        </p>

        <div className="project-placeholders" aria-label="Project previews">
          {projectPreviews.map((project, index) => {
            const card = (
              <article
                className={`project-preview project-preview-${index + 1}`}
                key={project}
              >
                <div className="project-art" aria-hidden="true">
                  {index === 0 ? (
                    <Image
                      alt=""
                      className="project-preview-image"
                      fill
                      sizes="(max-width: 650px) 90vw, 30vw"
                      src="/smart-meter-project.png"
                    />
                  ) : (
                    <>
                      <span />
                      <span />
                      <span />
                    </>
                  )}
                </div>
                <div className="project-preview-label">
                  <span>{project}</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </article>
            );

            return index === 0 ? (
              <Link
                aria-label="View the Edge AI Smart Meter Reading System project"
                className="project-preview-link"
                href="/projects#edge-ai-meter"
                key={project}
              >
                {card}
              </Link>
            ) : (
              card
            );
          })}
        </div>
        <Link href="/projects" className="projects-more-link">
          Explore all projects ↗
        </Link>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-message">
          <span className="section-label">03 / CONTACT</span>
          <h2>
            Have something
            <br />
            interesting in mind?
          </h2>
          <a href="mailto:tankchirag22@gmail.com">Let&apos;s talk ↗</a>
        </div>

        <div className="footer-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.label} ↗
            </a>
          ))}
        </div>

        <p className="copyright">© 2026 Chirag Tank</p>
      </footer>
    </main>
  );
}
