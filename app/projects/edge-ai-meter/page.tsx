import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Meter Reading System | Chirag Tank",
  description:
    "Technical deep dive into an ESP32-CAM smart meter reader, its YOLOv7 and OCR approach, FOMO model quantization, and LoRa data pipeline.",
};

const metrics = [
  { value: "760", label: "curated meter images" },
  { value: "3,396", label: "digit bounding-box labels" },
  { value: "96.69%", label: "reported training accuracy" },
  { value: "97.1", label: "reported training F1 score" },
];

export default function EdgeAiMeterPage() {
  return (
    <main className="projects-page case-study-page">
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
            <span className="section-label">EDGE AI / B.TECH PROJECT / 2024</span>
            <h1>A wireless smart metering solution.</h1>
            <p>
              Building a camera based meter reader around constrained hardware:
              detect digits at the edge, reconstruct a reading, then send the
              result over a long range radio link.
            </p>
            <div className="case-study-tags" aria-label="Project technologies">
              {["ESP32-CAM", "YOLOv7", "FOMO", "MobileNetV2", "INT8", "OCR", "LoRa"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="case-study-photo">
            <Image
              alt="ESP32-CAM mounted in front of a digital electricity meter during testing"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              src="/smart-meter-project.png"
            />
            <figcaption>ESP32-CAM prototype mounted at the meter</figcaption>
          </figure>
        </header>

        <section className="case-study-metrics" aria-label="Dataset and reported model results">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="case-study-section case-study-intro">
          <div>
            <span className="section-label">01 / THE PROBLEM</span>
            <h2>Read the meter reliably on a tiny device.</h2>
          </div>
          <p>
            The project targeted automatic reading of digital electricity
            meters where the camera, memory, compute, and radio bandwidth are
            limited. The ESP32-CAM platform provides 4 MB of flash and 520 KB
            of RAM, so the vision pipeline had to account for a small hardware
            budget as well as changing capture conditions.
          </p>
        </section>

        <section className="case-study-section">
          <div className="case-study-section-heading">
            <span className="section-label">02 / RECOGNITION APPROACHES</span>
            <h2>Two approaches used in the project.</h2>
            <p>
              The project used both approaches for meter digit recognition.
              They are presented separately because they represent distinct
              model and processing paths.
            </p>
          </div>
          <div className="case-study-approaches">
            <article>
              <span className="case-study-index">A</span>
              <h3>YOLOv7 + OCR</h3>
              <p>
                A computer vision and optical character recognition approach
                for locating meter digits and turning the captured display
                into a reading.
              </p>
              <ul>
                <li>YOLOv7 for digit detection</li>
                <li>OCR for reading the meter display</li>
                <li>OpenCV in the image processing stack</li>
              </ul>
            </article>
            <article>
              <span className="case-study-index">B</span>
              <h3>FOMO + MobileNetV2 0.35</h3>
              <p>
                A compact Edge Impulse model configured for on-device use. The
                INT8 profile reduced the model footprint for the ESP32-CAM
                deployment path.
              </p>
              <ul>
                <li>240 × 240 image input</li>
                <li>INT8 quantized model with Arduino library export</li>
                <li>Reported 96.69% accuracy and 97.1 F1 during training</li>
              </ul>
            </article>
          </div>
          <p className="case-study-footnote">
            The accuracy and F1 values are the report’s model training results;
            they are not presented as field accuracy.
          </p>
        </section>

        <section className="case-study-section case-study-data">
          <div>
            <span className="section-label">03 / DATA &amp; TRAINING</span>
            <h2>Build a dataset for the actual meter task.</h2>
          </div>
          <div className="case-study-data-copy">
            <p>
              The manually curated dataset contains 760 images and 3,396
              bounding-box labels across the ten digit classes. It combines
              GTFRC images with captures from residential apartments at IIT
              (BHU). Curation addressed ambiguity in existing datasets, which
              mixed meter types and could include irrelevant digit detections.
            </p>
            <p>
              The reported FOMO training configuration used 240 × 240 input,
              120 training cycles, a 0.005 learning rate, batch size 32, and
              no data augmentation.
            </p>
          </div>
        </section>

        <section className="case-study-section">
          <div className="case-study-section-heading">
            <span className="section-label">04 / EDGE-TO-RECEIVER PIPELINE</span>
            <h2>Capture. Interpret. Transmit.</h2>
          </div>
          <ol className="case-study-pipeline">
            <li><strong>Capture</strong><span>ESP32-CAM images the meter with a stabilized mount.</span></li>
            <li><strong>Recognize</strong><span>Vision processing detects digit regions; the reading is ordered by horizontal position.</span></li>
            <li><strong>Send</strong><span>Meter data and image payloads travel to a receiver over LoRa.</span></li>
            <li><strong>Reassemble</strong><span>Payloads are sent in 250-byte chunks and saved with the reading by a PC-side Python serial receiver.</span></li>
          </ol>
        </section>

        <section className="case-study-links">
          <div>
            <span className="section-label">PROJECT RESOURCES</span>
            <h2>See the project in action.</h2>
          </div>
          <div className="project-resource-links">
            <a href="https://www.youtube.com/watch?v=LwrLxajTQgY" rel="noopener noreferrer" target="_blank">Watch demo video ↗</a>
            <a href="https://lnkd.in/p/gGTM5Nu6" rel="noopener noreferrer" target="_blank">Professor’s appreciation ↗</a>
            <a href="https://ieee-dataport.org/documents/dataset-electricity-meter-readings-across-diverse-conditions#files" rel="noopener noreferrer" target="_blank">IEEE DataPort dataset ↗</a>
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
