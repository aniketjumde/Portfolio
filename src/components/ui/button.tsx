import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-tight select-none",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-300",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-55",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Solid ink with a subtle inner sheen — primary action */
        default:
          "bg-foreground text-background hover:bg-foreground/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]",
        /** Accent gradient — reserved for the single most important action */
        accent:
          "text-[hsl(228_30%_5%)] font-semibold bg-[linear-gradient(100deg,hsl(var(--jade)),hsl(var(--cyan)))] hover:brightness-108 shadow-[0_10px_34px_-14px_hsl(var(--jade)/0.75)]",
        outline:
          "border border-border/90 bg-transparent text-foreground hover:border-primary/45 hover:bg-primary/[0.06]",
        secondary:
          "border border-border/70 bg-secondary/70 text-secondary-foreground hover:bg-secondary",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
        link: "text-primary underline-offset-4 hover:underline px-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-sm",
        default: "h-11 rounded-full px-5 text-sm",
        lg: "h-13 rounded-full px-7 text-[0.95rem]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
