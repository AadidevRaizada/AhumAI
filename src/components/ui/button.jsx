'use client'

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors duration-[0.15s] ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal-amber disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-signal-amber text-deep-hull hover:bg-signal-amber-deep",
                destructive:
                    "bg-bilge text-warm-chalk border border-rust-line hover:bg-rust-line",
                outline:
                    "bg-transparent text-warm-chalk border border-rust-line hover:bg-rust-line",
                secondary:
                    "bg-hull-plate text-warm-chalk border border-rust-line hover:bg-rust-line",
                ghost: "bg-transparent text-fog-gray hover:text-warm-chalk hover:bg-rust-line",
                link: "text-signal-amber underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-5 py-2",
                sm: "h-8 rounded-sm px-3 text-xs",
                lg: "h-10 rounded-sm px-6",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
