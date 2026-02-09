"use client";

interface SecretKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function SecretKeyInput({ value, onChange, error }: SecretKeyInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.replace(/[\s-]/g, "").toUpperCase();
    onChange(cleaned);
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="secret-key"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        2FA Key
      </label>
      <input
        id="secret-key"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="JBSWY3DPEHPK3PXP"
        className={`w-full rounded-xl px-4 py-3 font-mono text-lg tracking-wider
          bg-zinc-100 dark:bg-zinc-800
          text-zinc-900 dark:text-zinc-100
          placeholder:text-zinc-400 dark:placeholder:text-zinc-500
          outline-none transition-colors
          focus:ring-2 focus:ring-blue-500/40
          ${error
            ? "border-2 border-red-500 focus:ring-red-500/40"
            : "border border-zinc-200 dark:border-zinc-700"
          }`}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
