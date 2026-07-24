import { useId, useRef, useState } from "react";

type CodeInputErrorState = {
  message: string;
};

type CodeInputProps = {
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  length?: number;
  error?: CodeInputErrorState;
  disabled?: boolean;
  autoFocus?: boolean;
};

const CodeInput = ({
  value,
  onChange,
  onComplete,
  length = 6,
  error,
  disabled,
  autoFocus,
}: CodeInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const errorId = useId();

  const handleChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, length);
    onChange(digits);
    if (digits.length === length && digits !== value) onComplete?.(digits);
  };

  const moveCaretToEnd = () => {
    const input = inputRef.current;
    if (input) input.setSelectionRange(input.value.length, input.value.length);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            setFocused(true);
            moveCaretToEnd();
          }}
          onBlur={() => setFocused(false)}
          onSelect={moveCaretToEnd}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-label="Security code"
          aria-invalid={error !== undefined}
          aria-describedby={error ? errorId : undefined}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text"
        />
        <div
          className={`flex gap-2 pointer-events-none ${disabled ? "opacity-60" : ""}`}
        >
          {Array.from({ length }, (_, i) => {
            const active = focused && i === Math.min(value.length, length - 1);
            return (
              <div
                key={i}
                className={`flex-1 h-16 flex items-center justify-center text-xl font-medium text-fg-1 rounded-sm border bg-field-bg ${
                  error
                    ? "border-error outline-2 outline-error -outline-offset-1"
                    : active
                      ? "border-accent-2 outline-2 outline-accent-2 -outline-offset-1"
                      : "border-field-border"
                }`}
              >
                {value[i] ?? ""}
              </div>
            );
          })}
        </div>
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CodeInput;
