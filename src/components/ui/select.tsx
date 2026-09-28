"use client";

import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { fieldBase } from "./input";

/**
 * Select: a styled, accessible dropdown (keyboard, screen reader and typeahead come from Radix).
 *
 *   <Select defaultValue="en">
 *     <SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
 *     <SelectContent>
 *       <SelectItem value="en">English</SelectItem>
 *     </SelectContent>
 *   </Select>
 */
export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        fieldBase,
        "flex h-10 cursor-pointer items-center justify-between gap-2 px-3 text-left data-placeholder:text-text-subtle",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-text-subtle" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={6}
        className={cn(
          "z-50 max-h-80 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md bg-surface-raised p-1 text-text shadow-md",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex h-9 cursor-pointer items-center rounded-sm pr-8 pl-3 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-surface",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-3">
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
