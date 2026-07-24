import { useId } from "react";

type ChoiceErrorState = {
  message: string;
};

type ChoiceOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type ChoiceProps<T extends string> = {
  name: string;
  options: ChoiceOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  error?: ChoiceErrorState;
  disabled?: boolean;
};

const Choice = <T extends string>({
  name,
  options,
  onChange,
  value,
  error,
  disabled,
}: ChoiceProps<T>) => {
  const errorId = useId();

  return (
    <div className="w-full">
      <div
        role="radiogroup"
        aria-invalid={error !== undefined}
        aria-describedby={error ? errorId : undefined}
        className="flex flex-col gap-3 w-full"
      >
        {options.map((option) => {
          const optionDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={`flex flex-row items-center gap-3 w-full p-4 rounded-sm cursor-pointer border has-checked:outline-2 has-focus-visible:outline-2 ${
                error
                  ? "border-error outline-error"
                  : "border-main-3 outline-accent-2 has-checked:border-accent-2"
              } ${optionDisabled ? "opacity-60 pointer-events-none" : ""}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                disabled={optionDisabled}
                className="sr-only"
              />
              {option.icon}
              <div className="flex flex-col">
                <span className="text-lg font-semibold leading-5 text-fg-1">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-sm text-fg-2 leading-4">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Choice;
