import { useEffect, useState } from "react";

const TIME_ZONE = "America/New_York";

export function DateTimeInline({ value }) {
  const [date, setDate] = useState(value ? new Date(value) : null);

  useEffect(() => {
    setDate(value ? new Date(value) : null);
  }, [value]);

  if (!date || isNaN(date)) return <span className="dt-inline">--</span>; // safe fallback

  // Extract EST/EDT-safe parts
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value || "";

  const hours24 = Number(get("hour")) || 0;
  const minutes = Number(get("minute")) || 0;

  const hourAngle = (hours24 % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const ampm = hours24 >= 12 ? "P" : "A";

  const formattedDate = `${get("month")} ${get("day")}, ${get("year")}`;

  return (
    <span className="dt-inline">
      <span className="dt-date">{formattedDate}</span>

      {/* <span className="dt-clock">
        <svg viewBox="0 0 100 100" className="dt-svg">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          />

          <line
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${hourAngle} 50 50)`}
          />

          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle} 50 50)`}
          />

          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>

        <span className="dt-ampm">{ampm}</span>
      </span> */}
    </span>
  );
}
