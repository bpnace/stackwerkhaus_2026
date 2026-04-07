import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type FadeInProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  trigger?: "scroll" | "load";
  delay?: number;
  stagger?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function FadeIn<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: FadeInProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}
