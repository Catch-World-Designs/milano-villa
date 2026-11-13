import { useState, type FormEvent } from "react";
import { CONTACT, inquiryDisciplines } from "@/data/site";

type FormState = {
  name: string;
  email: string;
  telephone: string;
  location: string;
  discipline: string;
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  telephone: "",
  location: "",
  discipline: "",
  message: "",
};

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [appointment, setAppointment] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [delivered, setDelivered] = useState(false);
  const [mailto, setMailto] = useState(`mailto:${CONTACT.email}`);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();

  const update = (key: keyof FormState) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Private consultation — ${form.name || "Enquiry"}`;
    const lines = [
      "Milano Villa — consultation enquiry",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Telephone: ${form.telephone || "—"}`,
      `Project location: ${form.location || "—"}`,
      `Area of interest: ${form.discipline || "—"}`,
      "",
      "The project:",
      form.message,
      "",
      appointment
        ? "Please arrange a consultation by appointment."
        : "A consultation appointment was not requested.",
    ];
    const link = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setMailto(link);
    setStatus("submitting");
    setDelivered(false);

    if (!endpoint) {
      setStatus("sent");
      window.location.href = link;
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          appointment,
          website: "",
          source: "milano-villa-website",
        }),
        credentials: "omit",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      setDelivered(true);
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (status === "sent") {
    return (
      <div
        className="border-t border-gold/50 pt-8"
        role="status"
        aria-live="polite"
      >
        <p className="label text-gold">{delivered ? "Enquiry sent" : "Enquiry prepared"}</p>
        <h3 className="mt-4 font-serif text-[2.1rem] font-light leading-[1.15] md:text-[2.5rem]">
          {delivered ? "Thank you for your note." : "Your note is ready."}
        </h3>
        <p className="body-copy mt-5 max-w-md">
          {delivered ? (
            <>Your enquiry has been delivered to the Milano Villa concierge.</>
          ) : (
            <>
              Your email client should have opened with the enquiry addressed to{" "}
              <span className="text-ink">{CONTACT.email}</span>. If it did not open,
              use the link below — the concierge will read your note personally.
            </>
          )}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          {!delivered ? (
            <a href={mailto} className="btn bg-ink text-ivory hover:bg-gold hover:text-ink">
              Open the email
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setDelivered(false);
              setForm(empty);
              setAppointment(true);
            }}
            className="label text-ink/50 underline-offset-8 transition-colors hover:text-gold hover:underline"
          >
            Write another note
          </button>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-[0.75rem] font-light leading-relaxed text-ink/40">
          Prefer to write directly?{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-ink/70 underline decoration-gold/50 underline-offset-4 hover:text-gold"
          >
            {CONTACT.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Full name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name")(event.target.value)}
            className="field-input"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email")(event.target.value)}
            className="field-input"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="telephone" className="field-label">
            Telephone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            value={form.telephone}
            onChange={(event) => update("telephone")(event.target.value)}
            className="field-input"
            placeholder="Optional"
          />
        </div>
        <div>
          <label htmlFor="location" className="field-label">
            Project location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={(event) => update("location")(event.target.value)}
            className="field-input"
            placeholder="City or country"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="discipline" className="field-label">
            What is the commission?
          </label>
          <select
            id="discipline"
            name="discipline"
            value={form.discipline}
            onChange={(event) => update("discipline")(event.target.value)}
            className="field-input"
          >
            <option value="">Select a discipline</option>
            {inquiryDisciplines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            The rooms you have in mind <span className="text-gold">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={(event) => update("message")(event.target.value)}
            className="field-input resize-none"
            placeholder="A few lines on the house, the rooms and any timing you have in mind. Drawings are not required."
          />
        </div>
      </div>

      <div className="mt-7 flex items-start gap-3">
        <input
          id="appointment"
          name="appointment"
          type="checkbox"
          checked={appointment}
          onChange={(event) => setAppointment(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#B08D57]"
        />
        <label
          htmlFor="appointment"
          className="text-[0.78rem] font-light leading-relaxed text-ink/55"
        >
          I would like to arrange a consultation by appointment.
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn border-ink bg-ink text-ivory hover:border-gold hover:bg-gold hover:text-ink"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          <span aria-hidden="true">→</span>
        </button>
        <p className="max-w-[16rem] text-[0.68rem] font-light leading-relaxed text-ink/35">
          {endpoint
            ? "Your note will be delivered securely to the concierge."
            : "Sending opens your email client, addressed to the concierge."}
        </p>
      </div>
      {status === "error" ? (
        <p className="mt-5 text-[0.78rem] font-light leading-relaxed text-ink/70" role="alert">
          The enquiry could not be delivered. Please try again or write directly to{" "}
          <a className="underline decoration-gold/50 underline-offset-4" href={mailto}>
            {CONTACT.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
