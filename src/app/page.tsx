"use client";

import { useState, useEffect, useCallback } from "react";
import SecretKeyInput from "@/components/SecretKeyInput";
import OtpDisplay from "@/components/OtpDisplay";
import CountdownTimer from "@/components/CountdownTimer";
import ThemeToggle from "@/components/ThemeToggle";
import {
  validateBase32,
  generateTOTP,
  getRemainingSeconds,
  getProgress,
} from "@/lib/otp";

export default function Home() {
  const [secretKey, setSecretKey] = useState("");
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

  function handleSecretKeyChange(value: string) {
    setSecretKey(value);
    if (!value) {
      setCode("");
      setError(undefined);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <ThemeToggle />
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900 dark:shadow-zinc-800/20">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            2FA OTP 생성기
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            2FA Key를 입력하면 OTP 코드를 생성합니다
          </p>
        </div>

        <div className="mt-6">
          <SecretKeyInput
            value={secretKey}
            onChange={handleSecretKeyChange}
            error={error}
          />
        </div>

        {code && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-5">
              <OtpDisplay code={code} />
              <CountdownTimer
                remainingSeconds={remainingSeconds}
                progress={progress}
              />
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
