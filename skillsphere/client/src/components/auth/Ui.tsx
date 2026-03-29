import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl bg-white px-4 text-sm text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:ring-offset-0",
        props.className
      )}
    />
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium text-slate-600">{children}</div>;
}

export function Button({
  variant = "primary",
  loading,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
}) {
  const base =
    "inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-500/60 disabled:cursor-not-allowed disabled:opacity-60";

  const styles: Record<string, string> = {
    primary: "bg-[#0B2A4A] hover:bg-[#0A2340] text-white",
    secondary: "bg-white hover:bg-slate-50 text-slate-900 ring-1 ring-slate-200",
    ghost: "bg-transparent hover:bg-slate-50 text-slate-900 ring-1 ring-slate-200",
    danger: "bg-rose-600 hover:bg-rose-500 text-white",
  };

  return (
    <button className={cn(base, styles[variant], className)} disabled={loading || rest.disabled} {...rest}>
      {loading ? "Please wait…" : children}
    </button>
  );
}

