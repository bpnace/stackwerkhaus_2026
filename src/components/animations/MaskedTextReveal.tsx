import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type MaskedTextRevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  lastLinePaddingEm?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function MaskedTextReveal<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: MaskedTextRevealProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}
