
import Link from "next/link";

const journey = [
  {
    organization: "IIT (BHU), Varanasi",
    role: "Computer Science & Engineering",
    period: "The foundations",
  },
  {
    organization: "Salesforce",
    role: "Software Engineering",
    period: "Building at scale",
  },
  {
    organization: "Visa",
    role: "Software Engineering",
    period: "Building what comes next",
  },
];

const engineeringDNA = [
  "System design",
  "Problem solving",
  "Backend engineering",
  "Distributed systems",
  "Artificial intelligence",
  "Continuous learning",
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <nav className="about-nav">
        <Link href="/" className="about-logo">
          CT.
        </Link>

        <div className="about-nav-links">
          <Link href="/">Home</Link>
          <span className="active">About me</span>
          <Link href="/#projects">Projects</Link>
          <a href="mailto:tankchirag22@gmail.com" className="contact-link">
            Contact ↗
          </a>
        </div>
      </nav>

      <section className="about-hero">
        <div className="about-label">
          A LITTLE MORE ABOUT ME
        </div>

        <h1>
          THE PERSON
          <br />
          BEHIND THE
          <br />
          <span>ENGINEERING.</span>
        </h1>

        <p className="about-subtitle">
          Software engineer. Curious by nature. Builder by choice.
        </p>
      </section>

      <section className="about-layout">
        <div className="journey-card">
          <h2>MY JOURNEY</h2>

          <div className="timeline">
            {journey.map((item) => (
              <div className="timeline-item" key={item.organization}>
                <div className="timeline-dot" />

                <div>
                  <h3>{item.organization}</h3>
                  <p>{item.role}</p>
                  <span>{item.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="portrait-area">
          <div className="portrait-placeholder">
            <span>CT.</span>
            <p>Your portrait goes here</p>
          </div>

          <div className="portrait-caption">
            CHIRAG TANK
            <span>SOFTWARE ENGINEER</span>
          </div>
        </div>

        <div className="engineering-card">
          <h2>ENGINEERING DNA</h2>

          <div className="engineering-skills">
            {engineeringDNA.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>

          <p className="engineering-note">
            Curious about how things work.
            Driven to make them work better.
          </p>
        </div>

        <div className="philosophy-card">
          <h2>HOW I THINK</h2>

          <p>
            I believe the best engineering turns complex
            problems into elegant, meaningful solutions.
          </p>

          <p>
            For me, engineering is about curiosity,
            thoughtful decisions, and building things
            that matter.
          </p>
        </div>

        <div className="about-github">
          <span className="github-mark">GH</span>

          <div>
            <h2>LET'S BUILD SOMETHING.</h2>
            <Link
              href="https://github.com/tankify"
              target="_blank"
            >
              Explore my GitHub ↗
            </Link>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <span>Chirag Tank — Portfolio</span>
        <span>2026</span>
      </footer>
    </main>
  );
}
