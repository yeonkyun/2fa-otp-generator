"use client";

import { useState, useCallback } from "react";

interface OtpDisplayProps {
  code: string;
}

export default function OtpDisplay({ code }: OtpDisplayProps) {
  const [copied, setCopied] = useState(false);

  const formattedCode = code;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative cursor-pointer select-none transition-transform hover:scale-105"
    >
      <p className="whitespace-nowrap font-mono text-4xl font-bold tracking-widest text-zinc-900 dark:text-zinc-100 sm:text-5xl">
        {formattedCode}
      </p>
      <span
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium transition-opacity ${
          copied
            ? "text-emerald-500 opacity-100"
            : "text-zinc-400 opacity-0 group-hover:opacity-100"
        }`}
      >
        {copied ? "복사됨!" : "클릭하여 복사"}
      </span>
    </button>
  );
}
