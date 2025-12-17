import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  to: string;
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
}

const ButtonLink = ({ to, variant = "primary", children, className }: ButtonLinkProps) => {
  const baseStyles =
    "inline-flex items-center justify-center px-7 py-3.5 font-semibold text-center rounded-lg transition-all duration-300 min-h-[48px]";

  const variants = {
    primary:
      "bg-gold-hover text-accent-foreground -translate-y-0.5 shadow-[0_10px_25px_-5px_hsl(var(--gold)/0.35)] hover:shadow-[0_14px_30px_-5px_hsl(var(--gold)/0.45)]",
    secondary:
      "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground",
    outline:
      "bg-transparent text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground hover:text-primary",
  };

  return (
    <Link to={to} className={cn(baseStyles, variants[variant], className)}>
      {children}
    </Link>
  );
};

export default ButtonLink;
