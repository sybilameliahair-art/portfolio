import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

type MagneticLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
};

export function MagneticLink({ to, children, className = "" }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      to={to}
      className={className}
      onMouseMove={(event) => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.28;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.28;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
      }}
    >
      {children}
    </Link>
  );
}
