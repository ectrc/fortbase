type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  loading?: boolean;
} & Omit<React.ComponentProps<"button">, "className">;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent-1 text-on-accent",
  secondary: "border-field-border bg-field-bg border-2 text-fg-1",
};

const hoverClasses: Record<ButtonVariant, string> = {
  primary: "cursor-pointer hover:bg-accent-1-hover",
  secondary: "cursor-pointer hover:border-fg-2-hover hover:text-accent-1-hover",
};

const Button = ({
  variant = "primary",
  loading,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      aria-busy={loading}
      {...rest}
      className={`relative font-medium w-full p-2.5 rounded-full disabled:opacity-60 disabled:pointer-events-none ${
        variantClasses[variant]
      } ${loading ? "cursor-default" : hoverClasses[variant]}`}
    >
      <span className={loading ? "invisible" : undefined}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center animate-pop-in">
          <span className="size-5 rounded-full border-3 border-current border-t-transparent animate-spin" />
        </span>
      )}
    </button>
  );
};

export default Button;
