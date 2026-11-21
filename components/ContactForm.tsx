"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    if (!apiBaseUrl) {
      setStatus("The message service is unavailable. Please email me directly.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSending(true);
    setStatus("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Could not send your message. Please try again.");
      }

      form.reset();
      setStatus(result.message || "Your message has been sent. Thanks for reaching out!");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not send your message. Please email me directly.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="contact-form-honeypot" aria-hidden="true">
        Leave this field empty
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <div className="contact-form-fields">
        <label>
          <span>Your name</span>
          <input
            autoComplete="name"
            maxLength={100}
            name="name"
            placeholder="Your name"
            required
          />
        </label>
        <label>
          <span>Your email</span>
          <input
            autoComplete="email"
            maxLength={254}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>
        <label className="contact-form-message">
          <span>Your message</span>
          <textarea
            maxLength={5000}
            name="message"
            placeholder="What would you like to talk about?"
            required
            rows={5}
          />
        </label>
      </div>
      <div className="contact-form-submit-row">
        <button className="contact-form-submit" disabled={isSending} type="submit">
          {isSending ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
        </button>
        <p>
          Or email me at <a href="mailto:tankchirag22@gmail.com">tankchirag22@gmail.com</a>
        </p>
      </div>
      <p aria-live="polite" className="contact-form-status" role="status">
        {status}
      </p>
    </form>
  );
}
