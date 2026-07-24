type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
} & Omit<React.ComponentProps<"button">, "className">;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent-1 text-on-accent hover:bg-accent-1-hover",
  secondary:
    "border-main-3 hover:border-accent-1-hover border-2 text-fg-1 hover:text-accent-1-hover",
};

const Button = ({ variant = "primary", ...rest }: ButtonProps) => {
  return (
    <button
      type="button"
      {...rest}
      className={`font-medium w-full p-2.5 rounded-full cursor-pointer ${variantClasses[variant]}`}
    />
  );
};

export default Button;
