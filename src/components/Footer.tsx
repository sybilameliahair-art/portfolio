import { Link } from "react-router-dom";
import { hours } from "../data/content";
import { STUDIO_EMAIL, STUDIO_PHONE_DISPLAY, STUDIO_WHATSAPP } from "../data/contact";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-20 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo className="w-56 md:w-64" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            A quiet hair atelier for considered cuts, colour, and occasion work.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Visit</p>
          <p className="mt-4 text-sm leading-7 text-ivory/80">
            By appointment
            <br />
            London
          </p>
          <div className="mt-6 space-y-2 text-sm text-muted">
            {hours.map((item) => (
              <div key={item.day} className="flex justify-between gap-6">
                <span>{item.day}</span>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Studio</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-ivory/80">
            <Link to="/#services" className="transition-colors hover:text-accent">
              Services
            </Link>
            <Link to="/book" className="transition-colors hover:text-accent">
              Book an appointment
            </Link>
            <a href={`mailto:${STUDIO_EMAIL}`} className="transition-colors hover:text-accent">
              {STUDIO_EMAIL}
            </a>
            <a href={STUDIO_WHATSAPP} className="transition-colors hover:text-accent">
              WhatsApp {STUDIO_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col justify-between gap-3 border-t border-line pt-6 text-[11px] uppercase tracking-[0.22em] text-muted md:flex-row">
        <span>© {new Date().getFullYear()} Studio Amelia</span>
        <span>Hair · Colour · Ritual</span>
      </div>
    </footer>
  );
}
