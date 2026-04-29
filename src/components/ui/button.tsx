"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--sand)] text-black hover:bg-[var(--sand-light)] focus-visible:ring-[var(--sand)]",
        secondary:
          "bg-zinc-900/60 text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800/80 focus-visible:ring-zinc-600",
        ghost:
          "text-zinc-200 hover:bg-zinc-900/50 hover:text-white focus-visible:ring-zinc-600"
      },
      size: {
        default: "h-10 px-5 py-2",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
