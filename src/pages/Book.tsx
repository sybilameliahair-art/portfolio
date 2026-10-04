import { useState, type FormEvent } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { categories, formatDuration, services, type Service } from "../data/content";
import { bookingWhatsAppUrl } from "../data/contact";

type Step = "service" | "details" | "done";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  terms: boolean;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  terms: false,
};

export function Book() {
  const [openCategory, setOpenCategory] = useState<string>(categories[0]);
  const [service, setService] = useState<Service | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [step, setStep] = useState<Step>("service");
  const [errors, setErrors] = useState("");
  const [reference, setReference] = useState("");

  const goDetails = () => {
    if (!service) {
      setErrors("Select a service to continue.");
      return;
    }
    setErrors("");
    setStep("details");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setErrors("Please complete your name, email, and phone number.");
      return;
    }
    if (!form.terms) {
      setErrors("Please agree to the studio terms to confirm.");
      return;
    }
    if (!service) {
      setErrors("Select a service to continue.");
      return;
    }
    setErrors("");
    const ref = `SA-${Date.now().toString().slice(-6)}`;
    setReference(ref);
    setStep("done");
    window.location.assign(
      bookingWhatsAppUrl({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        serviceName: service.name,
        reference: ref,
      }),
    );
  };

  return (
    <main className="min-h-svh bg-ink px-5 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Schedule</p>
        <h1 className="mt-4 font-display text-6xl tracking-wide text-ivory md:text-8xl">
          Book Amelia
        </h1>
        <p className="mt-4 max-w-xl text-ivory/65">
          Choose a service and leave your details. Day and time are agreed on WhatsApp.
        </p>

        <ol className="mt-10 flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.24em] text-muted">
          {["Service", "Your details", "Confirmed"].map((label, index) => {
            const names: Step[] = ["service", "details", "done"];
            const current = names.indexOf(step);
            return (
              <li key={label} className={index <= current ? "text-accent" : ""}>
                0{index + 1} {label}
              </li>
            );
          })}
        </ol>

        {step === "service" ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="border border-line bg-surface p-6 md:p-8">
              <h2 className="mb-6 text-[11px] uppercase tracking-[0.28em] text-muted">
                Select a service
              </h2>
              <div className="space-y-3">
                {categories.map((category) => {
                  const open = openCategory === category;
                  return (
                    <div key={category} className="border border-line">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-4 text-left"
                        onClick={() => setOpenCategory(open ? "" : category)}
                        aria-expanded={open}
                      >
                        <span className="font-display text-3xl tracking-wide">{category}</span>
                        <span className="text-accent">{open ? "–" : "+"}</span>
                      </button>
                      {open ? (
                        <ul className="border-t border-line">
                          {services
                            .filter((item) => item.category === category)
                            .map((item) => (
                              <li key={item.id}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setService(item);
                                    setErrors("");
                                    setStep("details");
                                  }}
                                  className={`flex w-full px-4 py-4 text-left transition-colors hover:bg-ink ${
                                    service?.id === item.id ? "bg-ink" : ""
                                  }`}
                                >
                                  <div>
                                    <p className="text-ivory">{item.name}</p>
                                    <p className="mt-1 text-sm text-muted">
                                      {formatDuration(item.duration)
                                        ? `${formatDuration(item.duration)} · ${item.description}`
                                        : item.description}
                                    </p>
                                  </div>
                                </button>
                              </li>
                            ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="h-fit border border-line bg-surface p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Your visit</p>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <span className="text-muted">Service</span>
                  <span className="text-right text-ivory">{service?.name ?? "—"}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <span className="text-muted">Duration</span>
                  <span>{formatDuration(service?.duration ?? null) ?? "—"}</span>
                </div>
                <p className="text-xs leading-6 text-muted">
                  Amelia will suggest days and times in WhatsApp after you send your details.
                </p>
              </div>
              {errors ? <p className="mt-4 text-sm text-danger">{errors}</p> : null}
              <button
                type="button"
                onClick={goDetails}
                className="mt-8 w-full border border-accent bg-accent py-4 text-[11px] uppercase tracking-[0.28em] text-on-accent transition-colors hover:bg-transparent hover:text-accent"
              >
                Continue
              </button>
            </aside>
          </div>
        ) : null}

        {step === "details" ? (
          <form onSubmit={submit} className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="border border-line bg-surface p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[11px] uppercase tracking-[0.28em] text-muted">Your details</h2>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-accent"
                  onClick={() => setStep("service")}
                >
                  <ChevronLeft size={14} />
                  Services
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {(
                  [
                    ["firstName", "First name"],
                    ["lastName", "Last name"],
                    ["email", "Email"],
                    ["phone", "Phone"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                    {label}
                    <input
                      required
                      type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                      value={form[key]}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, [key]: event.target.value }))
                      }
                      className="mt-2 w-full border border-line bg-surface px-4 py-3 text-sm tracking-normal text-ivory normal-case"
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 block text-[11px] uppercase tracking-[0.2em] text-muted">
                Notes
                <textarea
                  rows={4}
                  placeholder="Preferred days, if you have them"
                  value={form.notes}
                  onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                  className="mt-2 w-full border border-line bg-surface px-4 py-3 text-sm tracking-normal text-ivory normal-case placeholder:text-muted/70"
                />
              </label>
              <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-ivory/75">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(event) => setForm((current) => ({ ...current, terms: event.target.checked }))}
                  className="mt-1 accent-accent"
                />
                I agree to 48-hour notice to cancel or reschedule once a time is confirmed.
              </label>
              {errors ? <p className="mt-4 text-sm text-danger">{errors}</p> : null}
              <button
                type="submit"
                className="mt-8 w-full border border-accent bg-accent py-4 text-[11px] uppercase tracking-[0.28em] text-on-accent transition-colors hover:bg-transparent hover:text-accent"
              >
                Continue on WhatsApp
              </button>
            </section>
            <aside className="h-fit border border-line bg-surface p-6 text-sm md:p-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Summary</p>
              <p className="mt-6 text-ivory">{service?.name}</p>
              {service && formatDuration(service.duration) ? (
                <p className="mt-2 text-muted">{formatDuration(service.duration)}</p>
              ) : null}
              <p className="mt-6 text-xs leading-6 text-muted">
                Day and time will be set with Amelia in WhatsApp.
              </p>
            </aside>
          </form>
        ) : null}

        {step === "done" ? (
          <section className="mt-12 border border-line bg-surface px-6 py-16 text-center md:px-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent text-accent">
              <Check size={22} />
            </div>
            <h2 className="mt-8 font-display text-5xl tracking-wide md:text-7xl">Opening WhatsApp</h2>
            <p className="mx-auto mt-4 max-w-md text-ivory/70">
              Reference <span className="text-accent">{reference}</span>. You are being sent to
              Studio Amelia on WhatsApp to arrange a time for{" "}
              {service?.name.toLowerCase()}.
            </p>
            {service ? (
              <a
                href={bookingWhatsAppUrl({
                  firstName: form.firstName,
                  lastName: form.lastName,
                  email: form.email,
                  phone: form.phone,
                  notes: form.notes,
                  serviceName: service.name,
                  reference,
                })}
                className="mt-8 inline-flex border border-accent bg-accent px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-on-accent transition-colors hover:bg-transparent hover:text-accent"
              >
                Continue on WhatsApp
              </a>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
}
