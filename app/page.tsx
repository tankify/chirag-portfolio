
import Link from "next/link";

const links = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:your-email@example.com" },
];

export default function Home() {
  return (
    <main className="portfolio">
      <nav className="navbar">
        <Link href="/" className="logo">
          CT<span>.</span>
        </Link>

        <span className="nav-status">
          <span className="status-dot" />
          Available for opportunities
        </span>

        <a href="#contact" className="nav-contact">
          Let's connect ↗
        </a>
      </nav>

      <section className="hero">
        <div className="hero-label">
          <span>SOFTWARE ENGINEER</span>
          <span>BASED IN INDIA</span>
        </div>

        <h1>
          Building things
          <br />
          that <span className="accent">matter.</span>
        </h1>

        <div className="hero-bottom">
          <p className="intro">
            Hi, I'm Chirag.
            <br />
            I build software, explore AI, and turn
            complex problems into elegant solutions.
          </p>

          <div className="hero-symbol" aria-hidden="true">
            <span>01</span>
            <div className="symbol-ring">
              <div className="symbol-core" />
            </div>
            <span>ENGINEERING / CREATIVITY</span>
          </div>
        </div>

        <div className="hero-actions">
          <a href="#projects" className="primary-button">
            Explore my work <span>↘</span>
          </a>

          <a href="#about" className="secondary-button">
            More about me ↗
          </a>
        </div>
      </section>

      <section className="ticker" aria-label="Areas of interest">
        <span>SOFTWARE ENGINEERING</span>
        <span>✳</span>
        <span>ARTIFICIAL INTELLIGENCE</span>
        <span>✳</span>
        <span>SYSTEM DESIGN</span>
        <span>✳</span>
      </section>

      <section id="about" className="about-section">
        <span className="section-label">01 / ABOUT</span>
        <h2>
          Curious by nature.
          <br />
          <span>Engineer by choice.</span>
        </h2>
        <p>
          I enjoy building reliable systems, solving challenging
          engineering problems, and exploring the intersection
          of software and artificial intelligence.
        </p>
      </section>

      <section id="projects" className="projects-section">
        <span className="section-label">02 / SELECTED WORK</span>
        <h2>Things I've built.</h2>
        <p>Interesting problems deserve thoughtful solutions.</p>
      </section>

      <footer id="contact" className="footer">
        <div>
          <span className="section-label">03 / CONTACT</span>
          <h2>Have something<br />interesting in mind?</h2>
          <a href="mailto:your-email@example.com">
            Let's talk ↗
          </a>
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

        <p className="copyright">
          © 2026 Chirag Tank
        </p>
      </footer>
    </main>
  );
}
