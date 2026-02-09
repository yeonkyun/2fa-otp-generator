export interface OtpResult {
  code: string;
  remainingSeconds: number;
  progress: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
