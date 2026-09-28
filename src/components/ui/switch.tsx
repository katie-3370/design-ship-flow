"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import { useId, type ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { Label } from "./field";

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  /** Optional label on the left; the switch sits on the right, settings-row style */
  label?: string;
  description?: string;
};

export function Switch({ className, label, description, id, ...props }: SwitchProps) {
  const autoId = useId();
  const switchId = id ?? autoId;

  const control = (
    <SwitchPrimitive.Root
      id={switchId}
      className={cn(
        "inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-surface-sunken p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-primary",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="size-5 rounded-full bg-surface-raised shadow-sm transition-transform data-[state=checked]:translate-x-4" />
    </SwitchPrimitive.Root>
  );

  if (!label) return control;

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={switchId} className="cursor-pointer font-normal">
          {label}
        </Label>
        {description && <p className="text-xs text-text-subtle">{description}</p>}
      </div>
      {control}
    </div>
  );
}
