"use client";

import { useState } from "react";

const journey = [
  {
    id: "salesforce-internship",
    organization: "Salesforce, Hyderabad",
    role: "Software Development Engineer Intern",
    period: "May 2023 – July 2023",
    label: "INTERNSHIP HIGHLIGHTS",
    highlights: [
      "Designed a real-time rule-based engine to catch failure-prone sharing transactions using Apex, SOQL, and PL/SQL.",
      "Achieved a 97% reduction in buffer gets during performance benchmarking.",
    ],
  },
  {
    id: "iit-bhu",
    organization: "IIT (BHU), Varanasi",
    role: "B.Tech. in Computer Science and Engineering",
    period: "Completed May 2024 · GPA 9.00/10",
    label: "ACADEMIC HIGHLIGHTS",
    highlights: [
      "Built an Edge AI smart meter system to automate electricity readings with an ESP32-CAM and computer vision.",
      "Used YOLOv7, OpenCV, OCR, and model compression for on-device seven-segment recognition.",
      "Published a dataset of 570 meter-reading samples on IEEE DataPort.",
    ],
  },
  {
    id: "salesforce-engineer",
    organization: "Salesforce, Hyderabad",
    role: "Software Development Engineer",
    period: "July 2024 – September 2025",
    label: "ROLE HIGHLIGHTS",
    highlights: [
      "Delivered a full-stack Agentic AI action workflow, reducing manual steps from 20+ clicks to 2–4.",
      "Resolved 400+ test failures and helped bring code coverage above 95%.",
      "Worked on security, accessibility, and production reliability improvements.",
    ],
  },
  {
    id: "visa-engineer",
    organization: "Visa, Bangalore",
    role: "Software Development Engineer",
    period: "November 2025 – Present",
    label: "ROLE HIGHLIGHTS",
    highlights: [
      "Developed AI-powered product recommendations using client clustering to identify opportunities across comparable groups.",
      "Built analytics and peer-matching capabilities for explainable payment benchmarking.",
    ],
  },
];

export default function JourneyTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [dismissedId, setDismissedId] = useState<string | null>(null);

  return (
    <div className="timeline">
      {journey.map((item) => {
        const isOpen =
          pinnedId === item.id ||
          ((hoveredId === item.id || focusedId === item.id) &&
            dismissedId !== item.id);
        const detailsId = `journey-details-${item.id}`;

        return (
          <article
            className={`timeline-item${isOpen ? " is-open" : ""}`}
            key={item.id}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setHoveredId(item.id);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") {
                setHoveredId((current) => (current === item.id ? null : current));
                setDismissedId((current) => (current === item.id ? null : current));
              }
            }}
          >
            <span className="timeline-dot" aria-hidden="true" />

            <button
              aria-controls={detailsId}
              aria-expanded={isOpen}
              className="timeline-trigger"
              onBlur={() => {
                setFocusedId((current) => (current === item.id ? null : current));
                setDismissedId((current) => (current === item.id ? null : current));
              }}
              onClick={() => {
                if (pinnedId === item.id) {
                  setPinnedId(null);
                  setDismissedId(item.id);
                } else {
                  setPinnedId(item.id);
                  setDismissedId(null);
                }
              }}
              onFocus={() => setFocusedId(item.id)}
              type="button"
            >
              <span className="timeline-copy">
                <span className="timeline-organization">{item.organization}</span>
                <span className="timeline-role">{item.role}</span>
                <span className="timeline-period">{item.period}</span>
              </span>
              <span className="timeline-chevron" aria-hidden="true">
                ↗
              </span>
            </button>

            <div
              className="timeline-detail"
              hidden={!isOpen}
              id={detailsId}
            >
              <span className="timeline-detail-label">{item.label}</span>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
