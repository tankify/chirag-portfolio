"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  ok?: boolean;
};

export default function BackendStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  );
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  useEffect(() => {
    if (!apiBaseUrl) return;

    const controller = new AbortController();

    fetch(`${apiBaseUrl}/api/health`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Health check failed");
        return (await response.json()) as HealthResponse;
      })
      .then((result) => setStatus(result.ok ? "online" : "offline"))
      .catch(() => {
        if (!controller.signal.aborted) setStatus("offline");
      });

    return () => controller.abort();
  }, [apiBaseUrl]);

  if (!apiBaseUrl) return null;

  return (
    <span className="backend-status" aria-live="polite">
      <span
        aria-hidden="true"
        className={`backend-status-indicator backend-status-indicator--${status}`}
      />
      API {status}
    </span>
  );
}
