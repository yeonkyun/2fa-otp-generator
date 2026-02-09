"use client";

interface CountdownTimerProps {
  remainingSeconds: number;
  progress: number;
}

const RADIUS = 35;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CountdownTimer({ remainingSeconds, progress }: CountdownTimerProps) {
  const isUrgent = remainingSeconds <= 5;
  const strokeColor = isUrgent ? "#ef4444" : "#10b981";
  const textColor = isUrgent ? "text-red-500" : "text-emerald-500";
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full">
        {/* Background circle */}
        <circle
          cx={40}
          cy={40}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          className="text-zinc-200 dark:text-zinc-700"
        />
        {/* Progress circle */}
        <circle
          cx={40}
          cy={40}
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-mono text-xl font-bold ${textColor}`}
      >
        {remainingSeconds}
      </span>
    </div>
  );
}
