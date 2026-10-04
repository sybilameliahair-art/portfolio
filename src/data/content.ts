export type Service = {
  id: string;
  name: string;
  category: "Cut & Finish" | "Colour" | "Treatments" | "Occasion";
  duration: number | null;
  description: string;
};

export function formatDuration(minutes: number | null) {
  if (minutes == null) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return hours === 1 ? "1 hr" : `${hours} hrs`;
  return `${hours} hr ${rest} min`;
}

export const categories: Service["category"][] = [
  "Cut & Finish",
  "Colour",
  "Treatments",
  "Occasion",
];

export const services: Service[] = [
  {
    id: "signature-cut",
    name: "Signature Cut & Style",
    category: "Cut & Finish",
    duration: 60,
    description: "Consultation, precision cut, and a finish tailored to how you actually live in your hair.",
  },
  {
    id: "restyle",
    name: "Restyle",
    category: "Cut & Finish",
    duration: 75,
    description: "A full reshape when you are ready for a new silhouette — includes styling and aftercare.",
  },
  {
    id: "blow-dry",
    name: "Blow Dry",
    category: "Cut & Finish",
    duration: 45,
    description: "Sleek, voluminous, or lived-in. A polished finish for day, night, or camera.",
  },
  {
    id: "fringe",
    name: "Fringe Trim",
    category: "Cut & Finish",
    duration: 15,
    description: "A quick, precise tidy so your fringe sits exactly where it should.",
  },
  {
    id: "full-colour",
    name: "Full Colour",
    category: "Colour",
    duration: 120,
    description: "Even, luminous colour from root to tip, formulated for your undertone and texture.",
  },
  {
    id: "balayage",
    name: "Balayage",
    category: "Colour",
    duration: null,
    description: "Hand-painted dimension that grows out softly — sunlit, editorial, never stripey.",
  },
  {
    id: "highlights",
    name: "Highlights",
    category: "Colour",
    duration: null,
    description: "Classic or face-framing lift with a custom toner to keep the result refined.",
  },
  {
    id: "roots",
    name: "Root Touch-up",
    category: "Colour",
    duration: 105,
    description: "Seamless regrowth coverage that respects the colour already in your hair.",
  },
  {
    id: "gloss",
    name: "Toner / Gloss",
    category: "Colour",
    duration: 45,
    description: "A refresh of tone and shine between colour appointments.",
  },
  {
    id: "olaplex",
    name: "Bond Repair Ritual",
    category: "Treatments",
    duration: 45,
    description: "A reconstructive treatment that restores strength after colour or heat.",
  },
  {
    id: "keratin",
    name: "Keratin Smoothing",
    category: "Treatments",
    duration: null,
    description: "Frizz control and silk-smooth movement that lasts for weeks.",
  },
  {
    id: "spa",
    name: "Hair Spa Treatment",
    category: "Treatments",
    duration: 45,
    description: "Deep moisture and shine for dry, coloured, or city-stressed hair.",
  },
  {
    id: "updo",
    name: "Occasion Updo",
    category: "Occasion",
    duration: 60,
    description: "Sculpted or undone — designed around your dress, jewellery, and the hour you need to leave.",
  },
  {
    id: "bridal-trial",
    name: "Bridal Trial",
    category: "Occasion",
    duration: 90,
    description: "A full rehearsal so your wedding-day hair is decided, photographed, and effortless.",
  },
  {
    id: "bridal-day",
    name: "Bridal Day",
    category: "Occasion",
    duration: 120,
    description: "Wedding-morning hair, built to last from first look to last dance.",
  },
];

export const gallery = [
  {
    src: "/gallery/01-atelier.jpg",
    alt: "Stylist sectioning a client's hair in the studio",
    label: "Atelier",
  },
  {
    src: "/gallery/02-cut.jpg",
    alt: "Sleek dark brown blunt bob finished in the salon",
    label: "Cut",
  },
  {
    src: "/gallery/03-layers.jpg",
    alt: "Long layered brunette with copper dimension",
    label: "Layers",
  },
  {
    src: "/gallery/04-balayage.jpg",
    alt: "Honey blonde balayage with soft waves",
    label: "Colour",
  },
  {
    src: "/gallery/05-blowout.jpg",
    alt: "Voluminous dark layers and curtain bangs",
    label: "Blowout",
  },
  {
    src: "/gallery/06-finish.jpg",
    alt: "Long black hair styled with glossy curls",
    label: "Finish",
  },
];

export const hours = [
  { day: "Saturday — Sunday", time: "09:00 — 19:00" },
  { day: "Monday — Friday", time: "Closed" },
];
