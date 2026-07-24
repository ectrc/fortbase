import { useId } from "react";

type InputErrorState = {
  message: string;
};

type InputProps = {
  label: string;
  grammar?: boolean;
  error?: InputErrorState;
} & Omit<React.ComponentProps<"input">, "className" | "placeholder">;

const Input = ({ label, grammar, error, ...rest }: InputProps) => {
  const error_id = useId();

  return (
    <div className="w-full">
      <label
        className={`relative block w-full cursor-text border px-2.5 pt-5 pb-1.5 rounded-md has-[input:focus]:outline-2 outline-offset-2 has-[input:disabled]:opacity-60 has-[input:disabled]:cursor-not-allowed ${
          error
            ? "border-error outline-error border-2"
            : "border-main-3 outline-accent-2"
        }`}
      >
        <input
          {...rest}
          placeholder=" "
          className="peer font-medium outline-none border-none w-full h-full"
          spellCheck={grammar ?? false}
          aria-invalid={error !== undefined}
          aria-describedby={error ? error_id : undefined}
        />
        <span
          className={`absolute left-2.5 top-2 text-xs pointer-events-none transition-all peer-placeholder-shown:peer-not-focus:top-1/2 peer-placeholder-shown:peer-not-focus:-translate-y-1/2 peer-placeholder-shown:peer-not-focus:text-base ${
            error ? "text-error font-medium" : "text-fg-3"
          }`}
        >
          {label}
        </span>
      </label>
      {error && (
        <p id={error_id} className="mt-1 text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
