import { NavLink as RouterNavLink, type NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

interface NavLinkCompatProps extends NavLinkProps {
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        {...props}
        className={(state) =>
          cn(
            typeof className === "function" ? className(state) : className,
            state.isActive && activeClassName,
            "isPending" in state && state.isPending && pendingClassName
          )
        }
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
