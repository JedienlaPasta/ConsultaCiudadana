"use client";

export function Spinner() {
  return (
    <svg
      className="spin-once spin-restart size-8 rotate-12"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="#e5e7eb"
        strokeWidth="4"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="#3b82f6"
        strokeWidth="4"
        fill="none"
        strokeDasharray="12.5"
        strokeDashoffset="16"
        strokeLinecap="round"
      />
    </svg>
  );
}
