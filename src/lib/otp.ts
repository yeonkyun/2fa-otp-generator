import * as OTPAuth from "otpauth";
import type { ValidationResult } from "./types";

export function validateBase32(secret: string): ValidationResult {
  if (!secret || secret.trim().length === 0) {
    return { isValid: false, error: "Secret key is required" };
  }

  const cleaned = secret.replace(/\s/g, "").toUpperCase();
  const base32Regex = /^[A-Z2-7=]+$/;

  if (!base32Regex.test(cleaned)) {
    return { isValid: false, error: "Invalid Base32 characters detected" };
  }

  const withoutPadding = cleaned.replace(/=+$/, "");
  if (withoutPadding.length < 1) {
    return { isValid: false, error: "Secret key is too short" };
  }

  return { isValid: true };
}

export function generateTOTP(secret: string): string {
  const totp = new OTPAuth.TOTP({
    issuer: "",
    label: "",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret.replace(/\s/g, "").toUpperCase()),
  });

  return totp.generate();
}

export function getRemainingSeconds(): number {
  return Math.floor(30 - ((Date.now() / 1000) % 30));
}

export function getProgress(): number {
  return (30 - getRemainingSeconds()) / 30;
}
