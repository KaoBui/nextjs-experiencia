"use client";

import Link, { type LinkProps } from "next/link";
import { forwardRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { usePageTransition } from "@/components/PageTransition";

type TransitionLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof LinkProps>;

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return !!(
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, target, ...props }, ref) => {
    const { isTransitioning, navigate } = usePageTransition();
    const hrefValue = typeof href === "string" ? href : href.toString();
    const isHashLink = hrefValue.includes("#");
    const isExternal = !hrefValue.startsWith("/");

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (
        event.defaultPrevented ||
        isTransitioning ||
        target === "_blank" ||
        isExternal ||
        isHashLink ||
        isModifiedEvent(event)
      ) {
        return;
      }

      event.preventDefault();
      navigate(hrefValue);
    };

    return (
      <Link
        ref={ref}
        href={href}
        target={target}
        onClick={handleClick}
        {...props}
      />
    );
  },
);

TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
