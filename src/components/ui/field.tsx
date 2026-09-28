import { Label as LabelPrimitive } from "radix-ui";
import { useId, type ComponentProps, type ReactElement, cloneElement } from "react";

import { cn } from "@/lib/cn";

export function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root className={cn("text-sm font-medium text-text", className)} {...props} />
  );
}

type FieldProps = {
  label: string;
  /** Helper text under the control */
  hint?: string;
  /** Error message; also marks the control as invalid */
  error?: string;
  /** A single Input, Textarea, Select trigger or similar */
  children: ReactElement<Record<string, unknown>>;
  className?: string;
};

/**
 * Field: label + control + hint or error, wired up for screen readers.
 * Pass one control as the child; Field gives it an id, aria-describedby and aria-invalid.
 */
export function Field({ label, hint, error, children, className }: FieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message && (
        <p id={messageId} className={cn("text-xs", error ? "text-danger" : "text-text-subtle")}>
          {message}
        </p>
      )}
    </div>
  );
}
