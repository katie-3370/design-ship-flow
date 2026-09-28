import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** Shared field chrome, so Input, Textarea and Select trigger look identical. */
export const fieldBase =
  "w-full rounded-sm bg-field text-sm text-text shadow-xs transition-shadow placeholder:text-text-subtle hover:shadow-sm focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:outline-2 aria-invalid:outline-offset-0 aria-invalid:outline-danger";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(fieldBase, "h-10 px-3", className)} {...props} />;
}

export function Textarea({ className, rows = 4, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea rows={rows} className={cn(fieldBase, "min-h-20 px-3 py-2.5", className)} {...props} />
  );
}
