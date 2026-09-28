"use client";

import { Check } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { useId, type ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { Label } from "./field";

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  /** Optional label shown to the right; clicking it toggles the box */
  label?: string;
  description?: string;
};

export function Checkbox({ className, label, description, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const boxId = id ?? autoId;

  const box = (
    <CheckboxPrimitive.Root
      id={boxId}
      className={cn(
        "peer flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-xs bg-surface-raised shadow-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-primary data-[state=checked]:text-primary-fg data-[state=checked]:shadow-none",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label) return box;

  return (
    <div className="flex items-start gap-3">
      <div className="pt-px">{box}</div>
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={boxId} className="cursor-pointer font-normal">
          {label}
        </Label>
        {description && <p className="text-xs text-text-subtle">{description}</p>}
      </div>
    </div>
  );
}
