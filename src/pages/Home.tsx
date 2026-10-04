import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";
import { MagneticLink } from "../components/MagneticLink";
import { GoogleReviews } from "../components/GoogleReviews";
import { categories, formatDuration, gallery, services } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIntroReady } from "../App";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const ready = useIntroReady();
  const location = useLocation();

  useLayoutEffect(() => {
    if (!ready || location.hash.length <= 1) return;
    const el = document.getElementById(location.hash.slice(1));
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [location.hash, ready, reduced]);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: reduced ? 0 : 28,
          opacity: reduced ? 1 : 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      const pin = root.current?.querySelector(".services-pin");
      const track = root.current?.querySelector(".services-track");
      if (pin && track && !reduced && window.matchMedia("(min-width: 1024px)").matches) {
        const distance = Math.max(track.scrollWidth - window.innerWidth + 80, 0);
        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [ready, reduced]);

  const featured = categories.map((category) => ({
    category,
    items: services.filter((service) => service.category === category),
  }));

  return (
    <div ref={root}>
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-5 pb-16 pt-28 md:px-10 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="hero-fade text-[11px] uppercase tracking-[0.42em] text-accent">
              London · By appointment
            </p>
            <div className="hero-fade mt-6">
              <BrandLogo className="w-[min(88vw,520px)]" />
            </div>
            <p className="hero-fade mt-8 max-w-md text-base leading-8 text-ivory/75 md:text-lg">
              Precision cuts, colour artistry, and quiet ritual. A modern hair atelier
              for people who want their hair to feel inevitable.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap items-center gap-6">
              <MagneticLink
                to="/book"
                className="inline-flex items-center justify-center border border-accent bg-accent px-8 py-4 text-[11px] uppercase tracking-[0.32em] text-on-accent transition-colors duration-300 hover:bg-transparent hover:text-accent"
              >
                Book now
              </MagneticLink>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted">
                <ArrowDownRight size={16} className="text-accent" />
                Scroll the atelier
              </div>
            </div>
          </div>
          <div className="hero-fade relative order-1 overflow-hidden lg:order-2">
            <img
              src="/hero.jpg"
              alt="Stylist at work in Studio Amelia"
              className="h-[46vh] w-full object-cover object-center md:h-[56vh] lg:h-[70vh]"
            />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-ink py-4">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-[11px] uppercase tracking-[0.38em] text-muted">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex gap-12">
              {[
                "Cut",
                "Colour",
                "Balayage",
                "Bond repair",
                "Bridal",
                "Blow dry",
                "Keratin",
                "Studio Amelia",
              ].map((item) => (
                <span key={`${copy}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="atelier" className="scroll-mt-24 px-5 py-28 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">The atelier</p>
            <h2 className="mt-5 font-display text-6xl leading-none tracking-wide text-ivory md:text-8xl">
              Quiet rooms.
              <br />
              <span className="text-studio">Exact work.</span>
            </h2>
          </div>
          <div data-reveal className="max-w-xl text-base leading-8 text-ivory/70 md:text-lg">
            <p>
              Studio Amelia is built like a fashion house, not a high-street salon.
              One chair, unhurried time, and a colour language that prefers
              dimension over drama.
            </p>
            <p className="mt-6">
              Appointments are reserved so the room stays still. You arrive, we
              look at how your hair actually lives, then we cut and colour for
              the next three months — not just the next photograph.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="services-pin scroll-mt-24 border-t border-line">
        <div className="px-5 pt-16 md:px-10">
          <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6">
            <div data-reveal>
              <p className="text-[11px] uppercase tracking-[0.32em] text-accent">The menu</p>
              <h2 className="mt-4 font-display text-6xl tracking-wide text-ivory md:text-8xl">
                Services
              </h2>
            </div>
            <MagneticLink
              to="/book"
              className="hidden text-[11px] uppercase tracking-[0.28em] text-accent underline-offset-8 transition-all hover:underline md:inline"
            >
              Reserve a chair
            </MagneticLink>
          </div>
        </div>

        <div className="services-track mt-12 flex flex-col gap-6 px-5 pb-24 lg:mt-20 lg:w-max lg:flex-row lg:gap-8 lg:px-10">
          {featured.map((group) => (
            <article
              key={group.category}
              className="w-full border border-line bg-surface p-8 lg:h-[68vh] lg:w-[34vw] lg:min-w-[420px]"
            >
              <p className="font-script text-4xl text-accent">{group.category}</p>
              <ul className="mt-8 space-y-6">
                {group.items.map((service) => (
                  <li key={service.id} className="border-b border-line pb-5">
                    <p className="text-ivory">{service.name}</p>
                    {formatDuration(service.duration) ? (
                      <p className="mt-1 text-sm text-muted">{formatDuration(service.duration)}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="scroll-mt-24 border-t border-line px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div data-reveal className="mb-14 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Edit</p>
              <h2 className="mt-4 font-display text-6xl tracking-wide md:text-8xl">Gallery</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {gallery.map((image, index) => (
              <figure
                key={image.src}
                data-reveal
                className={`group relative overflow-hidden ${index === 0 || index === 5 ? "md:row-span-2" : ""}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                    index === 0 || index === 5 ? "h-72 md:h-full min-h-[280px] md:min-h-[520px]" : "h-52 md:h-72"
                  }`}
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white">{image.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 border-t border-line px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Reviews</p>
          <h2 className="mt-4 font-display text-6xl tracking-wide md:text-8xl">Google</h2>
          <div className="mt-10">
            <GoogleReviews />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-surface px-5 py-28 md:px-10 md:py-36">
        <div data-reveal className="relative mx-auto max-w-[900px] text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Reserve</p>
          <h2 className="mt-6 font-display text-6xl tracking-wide text-ivory md:text-8xl">
            Your chair is waiting
          </h2>
          <p className="mx-auto mt-6 max-w-md text-ivory/70">
            Choose a service and leave your details. Amelia will confirm a time on WhatsApp.
          </p>
          <MagneticLink
            to="/book"
            className="mt-10 inline-flex border border-accent bg-accent px-10 py-4 text-[11px] uppercase tracking-[0.32em] text-on-accent transition-colors duration-300 hover:bg-transparent hover:text-accent"
          >
            Book an appointment
          </MagneticLink>
        </div>
      </section>
    </div>
  );
}
