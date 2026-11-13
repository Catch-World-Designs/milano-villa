import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Link } from "@/lib/router";
import { nav, CONTACT } from "@/data/site";
import { LogoHorizontal, LogoMark } from "./Logo";

export default function Header({ path }: { path: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isHome = path === "/";
  const transparent = isHome && !scrolled;

  const openMenu = () => {
    setOpen(true);
    // Pointer activation may restore focus to the trigger after the click event.
    // Move it into the modal on the next browser task, once that default action settles.
    window.setTimeout(() => closeButtonRef.current?.focus({ preventScroll: true }), 50);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: a route change must close an open mobile menu
  useEffect(() => {
    setOpen(false);
  }, [path]);

  useLayoutEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add("no-scroll");
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500",
          transparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-line bg-ivory/95 backdrop-blur-md supports-[backdrop-filter]:bg-ivory/85"
        )}
      >
        <div className="wrap flex h-[74px] items-center justify-between md:h-[92px]">
          <Link
            to="/"
            aria-label="Milano Villa — home"
            className="shrink-0 transition-opacity duration-300 hover:opacity-80"
          >
            <LogoHorizontal tone={transparent ? "light" : "dark"} />
          </Link>

          <nav className="hidden items-center gap-x-8 xl:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = path === item.to || path.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-link",
                    transparent
                      ? "text-ivory/80 hover:text-ivory"
                      : "text-ink/70 hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className={cn(
                "label inline-flex items-center gap-2.5 border px-5 py-3 transition-colors duration-300",
                transparent
                  ? "border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink"
                  : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory"
              )}
            >
              Private Consultation
            </Link>
          </nav>

          <button
            type="button"
            onClick={openMenu}
            className={cn(
              "flex items-center gap-3 xl:hidden",
              transparent ? "text-ivory" : "text-ink"
            )}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="label hidden sm:inline">Menu</span>
            <span className="flex w-6 flex-col gap-[6px]">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Navigation"
        inert={!open}
        className={cn(
          "fixed inset-0 z-50 bg-ivory transition-[opacity,visibility] duration-500 xl:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="wrap flex h-[74px] items-center justify-between border-b border-line">
            <Link to="/" onClick={() => setOpen(false)} aria-label="Milano Villa — home">
              <LogoHorizontal tone="dark" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              className="label flex items-center gap-2 text-ink"
              aria-label="Close menu"
            >
              Close
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>

          <nav
            className="wrap flex flex-1 flex-col justify-center py-10"
            aria-label="Mobile primary"
          >
            <ul className="border-t border-line">
              {nav.concat({ label: "Contact", to: "/contact" }).map((item, i) => (
                <li key={item.to} className="border-b border-line">
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-serif text-xs italic text-gold">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-[2rem] leading-none transition-colors group-hover:text-gold">
                        {item.label}
                      </span>
                    </span>
                    <span className="text-lg text-gold opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="wrap border-t border-line py-7">
            <p className="label text-gold">Enquiries</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-3 block font-serif text-xl text-ink"
            >
              {CONTACT.email}
            </a>
            <div className="mt-4 flex items-start gap-3 text-ink/60">
              <LogoMark className="mt-0.5 h-8 w-8 shrink-0" />
              <p className="text-[0.78rem] font-light leading-relaxed">
                {CONTACT.location}
                <br />
                Consultations by appointment only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
