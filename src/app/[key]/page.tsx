"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import OtpDisplay from "@/components/OtpDisplay";
import CountdownTimer from "@/components/CountdownTimer";
import ThemeToggle from "@/components/ThemeToggle";
import {
  validateBase32,
  generateTOTP,
  getRemainingSeconds,
  getProgress,
} from "@/lib/otp";

export default function FixedKeyPage() {
  const params = useParams<{ key: string }>();
  const secretKey = (params.key ?? "").replace(/[\s-]/g, "").toUpperCase();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [progress, setProgress] = useState(0);

  const updateOtp = useCallback(() => {
    if (!secretKey) return;

    const validation = validateBase32(secretKey);
    if (!validation.isValid) {
      setError(validation.error);
      setCode("");
      return;
    }

    setError(undefined);
    try {
      setCode(generateTOTP(secretKey));
      setRemainingSeconds(getRemainingSeconds());
      setProgress(getProgress());
    } catch {
      setError("OTP 생성에 실패했습니다. 2FA Key를 확인해주세요.");
      setCode("");
    }
  }, [secretKey]);

  useEffect(() => {
    if (!secretKey) return;

    const interval = setInterval(updateOtp, 1000);
    const initial = setTimeout(updateOtp, 0);
    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [secretKey, updateOtp]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <ThemeToggle />
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900 dark:shadow-zinc-800/20">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            2FA OTP 생성기
          </h1>
          <p className="break-all font-mono text-sm text-zinc-400 dark:text-zinc-500">
            {secretKey}
          </p>
        </div>

        {error ? (
          <div className="mt-8 flex justify-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : code ? (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-5">
              <OtpDisplay code={code} />
              <CountdownTimer
                remainingSeconds={remainingSeconds}
                progress={progress}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
