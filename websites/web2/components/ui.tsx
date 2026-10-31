import type { ComponentProps, ReactNode } from "react";

export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-[calc(100%-32px)] max-w-[1104px]", className)} {...props} />;
}

type ButtonVariant = "primary" | "secondary";

const buttonBase =
  "inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 font-mono text-sm leading-5 font-semibold uppercase transition-[background-color,border-color,color] duration-150";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "border-indigo-600 bg-indigo-500 text-stone-50 hover:bg-indigo-600",
  secondary: "border-stone-200 bg-white text-stone-800 hover:bg-stone-100",
};

export function ButtonLink({
  variant = "secondary",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return <a className={cx(buttonBase, buttonVariants[variant], className)} {...props} />;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("font-mono text-sm leading-4 font-medium uppercase", className)}>{children}</p>
  );
}

/** Mock app window used for the product illustrations. */
export function AppWindow({
  className,
  bodyClassName,
  children,
}: {
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_24px_48px_-16px_rgba(28,25,23,0.35),0_0_0_1px_rgba(28,25,23,0.04)]",
        className,
      )}
    >
      <div className="flex h-[33px] shrink-0 items-center gap-1.5 bg-stone-100 px-3">
        <span className="size-2.5 rounded-full bg-stone-300" />
        <span className="size-2.5 rounded-full bg-stone-300" />
        <span className="size-2.5 rounded-full bg-stone-300" />
      </div>
      <div className={cx("relative min-h-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  );
}
