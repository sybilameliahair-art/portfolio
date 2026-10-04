import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { BrandLogo } from "./BrandLogo";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type PreloaderProps = {
  onDone: () => void;
};

export function Preloader({ onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  const reduced = usePrefersReducedMotion();
  onDoneRef.current = onDone;

  useLayoutEffect(() => {
    let active = true;
    const finish = () => {
      if (active) onDoneRef.current();
    };

    const ctx = gsap.context(() => {
      if (reduced) {
        finish();
        return;
      }

      gsap
        .timeline({
          defaults: { ease: "expo.out" },
          onComplete: finish,
        })
        .fromTo(
          ".brand-logo",
          { opacity: 0, scale: 1.08, filter: "blur(10px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 },
        )
        .from(".preloader-line", { scaleX: 0, duration: 0.55 }, "-=0.35")
        .from(".preloader-meta", { opacity: 0, y: 10, duration: 0.4 }, "-=0.25")
        .to(root.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power2.inOut",
          delay: 0.4,
        });
    }, root);

    return () => {
      active = false;
      ctx.revert();
    };
  }, [reduced]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <BrandLogo className="brand-logo w-[min(86vw,520px)] origin-center" />
      </div>
      <div className="preloader-line mt-8 h-px w-40 origin-center bg-accent/80" />
      <p className="preloader-meta mt-6 text-[11px] uppercase tracking-[0.42em] text-muted">
        Hair atelier
      </p>
    </div>
  );
}
