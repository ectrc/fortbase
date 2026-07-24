type HeaderProps = {
  title: string;
  subtitle?: string;
};

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <span className="text-fg-2">{subtitle}</span>}
    </div>
  );
};

export default Header;
