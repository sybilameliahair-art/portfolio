export const STUDIO_PHONE_DISPLAY = "+44 7774 272734";
export const STUDIO_PHONE_E164 = "447774272734";
export const STUDIO_WHATSAPP = `https://wa.me/${STUDIO_PHONE_E164}`;
export const STUDIO_EMAIL = "sybilameliahair@gmail.com";

type BookingMessage = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
  serviceName: string;
  reference: string;
};

export function bookingWhatsAppUrl(booking: BookingMessage) {
  const lines = [
    "Hi Studio Amelia — I'd like to book in.",
    "",
    `Name: ${booking.firstName} ${booking.lastName}`,
    `Service: ${booking.serviceName}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    `Reference: ${booking.reference}`,
    "",
    "Could you help me find a day and time that works?",
  ];

  if (booking.notes?.trim()) {
    lines.push("", `Notes: ${booking.notes.trim()}`);
  }

  return `${STUDIO_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
}
