import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LifeLink Blood Donation Demo | Chirag Tank",
  description:
    "Technical overview of LifeLink, a Django demo for blood donor discovery, requests, blood centres, camps, and city-based map exploration.",
};

const capabilities = [
  {
    number: "01",
    title: "Find donors and requests",
    detail:
      "Filter available donors and open blood requests by blood group and city. The home page also surfaces a small dashboard with donor, request, and centre counts.",
  },
  {
    number: "02",
    title: "Account-gated submissions",
    detail:
      "Django authentication protects donor registration and blood request forms. Django ModelForms validate submissions before records are saved.",
  },
  {
    number: "03",
    title: "Explore local resources",
    detail:
      "Browse blood centres and donation camps, or open a city-centred OpenStreetMap view with related listings for that city.",
  },
];

const models = [
  { name: "Donor", fields: "Blood group · city · availability" },
  { name: "BloodRequest", fields: "Blood group · city · units needed" },
  { name: "BloodBank", fields: "Centre · city · demo inventory" },
  { name: "BloodCamp", fields: "Camp · venue · optional event date" },
];

export default function LifeLinkCaseStudyPage() {
  return (
    <main className="projects-page case-study-page lifelink-case-study">
      <nav className="projects-nav" aria-label="Main navigation">
        <Link href="/" className="projects-logo" aria-label="Chirag Tank home">
          CT<span>.</span>
        </Link>
        <div className="projects-nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects" className="active" aria-current="page">
            Projects
          </Link>
          <a href="mailto:tankchirag22@gmail.com" className="projects-contact-link">
            Contact ↗
          </a>
        </div>
      </nav>

      <article>
        <header className="case-study-hero">
          <div className="case-study-hero-copy">
            <span className="section-label lifelink-label">DJANGO / FULL-STACK DEMO</span>
            <h1>Make a little room for hope.</h1>
            <p>
              LifeLink brings donor discovery, blood requests, centres, and
              community camps into one Django application. It is a server
              rendered project built around a practical workflow and clear demo
              boundaries.
            </p>
            <div className="case-study-tags" aria-label="Project technologies">
              {["Python", "Django", "SQLite", "HTML/CSS", "OpenStreetMap"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="lifelink-source-link"
              href="https://github.com/tankify/blood-bank-management"
              rel="noopener noreferrer"
              target="_blank"
            >
              View source code ↗
            </a>
          </div>
          <figure className="case-study-photo lifelink-case-photo">
            <Image
              alt="LifeLink blood donation demo homepage"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              src="/lifelink-home.png"
            />
            <figcaption>LifeLink · people helping people</figcaption>
          </figure>
        </header>

        <section className="case-study-section lifelink-overview">
          <div>
            <span className="section-label lifelink-label">01 / PRODUCT FLOW</span>
            <h2>Connect people with local resources.</h2>
          </div>
          <div className="lifelink-capabilities">
            {capabilities.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="case-study-section lifelink-data-section">
          <div>
            <span className="section-label lifelink-label">02 / DATA MODEL</span>
            <h2>Four core records keep the workflow organized.</h2>
            <p className="lifelink-data-intro">
              Django models define the app’s main entities, with blood-group
              and city choices reused in forms and search filters.
            </p>
          </div>
          <div className="lifelink-model-grid">
            {models.map((model) => (
              <article key={model.name}>
                <span>MODEL</span>
                <h3>{model.name}</h3>
                <p>{model.fields}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-study-section lifelink-engineering-section">
          <div className="case-study-section-heading">
            <span className="section-label lifelink-label">03 / ENGINEERING NOTES</span>
            <h2>Server rendered, form validated, and deliberately scoped.</h2>
          </div>
          <div className="lifelink-engineering-grid">
            <article>
              <h3>Django request handling</h3>
              <p>
                URL routes connect to focused view functions. QuerySets apply
                valid group and city filters, and templates render the results
                on the server.
              </p>
            </article>
            <article>
              <h3>Validation and access</h3>
              <p>
                ModelForms handle donor and request input, a phone validator
                checks the submitted format, and login protection is applied
                to both submission views. Logout accepts POST requests only.
              </p>
            </article>
            <article>
              <h3>Map context</h3>
              <p>
                The map uses approximate city-centre coordinates to frame an
                OpenStreetMap embed. Sample listings are not represented as
                verified donor or centre locations.
              </p>
            </article>
          </div>
        </section>

        <aside className="lifelink-demo-boundary">
          <span className="lifelink-boundary-mark">DEMO LIMITS</span>
          <div>
            <h2>Fictional records. Volatile local storage.</h2>
            <p>
              The demo uses SQLite shared-cache memory storage in one local
              server process. Restarting the server clears accounts and
              submissions; separate server processes do not share the data.
              It is not intended for real donor details or medical
              coordination.
            </p>
          </div>
        </aside>

        <section className="case-study-links lifelink-case-links">
          <div>
            <span className="section-label lifelink-label">PROJECT LINKS</span>
            <h2>Explore the code and demo.</h2>
          </div>
          <div className="project-resource-links">
            <a href="https://github.com/tankify/blood-bank-management" rel="noopener noreferrer" target="_blank">View source code ↗</a>
          </div>
        </section>
      </article>

      <footer className="projects-page-footer">
        <Link href="/projects" className="projects-back-link">← Back to projects</Link>
        <span>Chirag Tank — Portfolio · 2026</span>
      </footer>
    </main>
  );
}
