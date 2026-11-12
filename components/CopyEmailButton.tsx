"use client";

import { useEffect, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

export default function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    if (status === "idle") return;

    const timeout = window.setTimeout(() => setStatus("idle"), 1800);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <button
      aria-label={`Copy ${email} to clipboard`}
      aria-live="polite"
      className="copy-email-button"
      onClick={copyEmail}
      type="button"
    >
      {status === "copied"
        ? "Copied!"
        : status === "failed"
          ? "Copy failed"
          : "Copy email"}
    </button>
  );
}
