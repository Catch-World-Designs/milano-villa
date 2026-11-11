import { Link } from "@/lib/router";
import { CONTACT, disciplines, nav } from "@/data/site";
import { LogoStacked } from "./Logo";
import { ArrowLink } from "./primitives";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div className="wrap pt-16 pb-8 md:pt-24 md:pb-10">
        <div className="grid gap-14 border-b border-line-dark pb-14 md:pb-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Milano Villa — home" className="inline-block">
              <LogoStacked tone="light" className="items-start text-left" />
            </Link>
            <p className="mt-8 max-w-[17rem] font-serif text-[1.35rem] font-light italic leading-snug text-ivory/60">
              The ultimate source for design &amp; furnishings.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <p className="label text-gold">The House</p>
              <ul className="mt-6 space-y-3.5">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-[0.83rem] font-light text-ivory/65 transition-colors hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/contact"
                    className="text-[0.83rem] font-light text-ivory/65 transition-colors hover:text-ivory"
                  >
                    Private Consultation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="label text-gold">Disciplines</p>
              <ul className="mt-6 space-y-3.5">
                {disciplines.slice(0, 6).map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/disciplines/${item.id}`}
                      className="text-[0.83rem] font-light text-ivory/65 transition-colors hover:text-ivory"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="label text-gold">Concierge</p>
            <div className="mt-6 space-y-5 text-[0.83rem] font-light leading-relaxed text-ivory/65">
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-ivory transition-colors hover:text-gold-light"
                >
                  {CONTACT.email}
                </a>
                <br />
                <span className="text-ivory/45">Enquiries &amp; appointments</span>
              </p>
              <p>
                {CONTACT.phone}
                <br />
                <span className="text-ivory/45">Telephone</span>
              </p>
              <p>
                {CONTACT.location.split(" · ")[0]}
                <br />
                <span className="text-ivory/45">
                  Consultations by appointment only
                </span>
              </p>
            </div>
            <ArrowLink to="/contact" tone="ivory" className="mt-8">
              Write to the atelier
            </ArrowLink>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-[0.66rem] font-light tracking-[0.08em] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Milano Villa. All rights reserved.</p>
          <p className="font-label text-[0.5rem] tracking-[0.28em] uppercase">
            Washington, DC · United States &amp; worldwide
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left transition-colors hover:text-ivory sm:text-right"
          >
            Return to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
