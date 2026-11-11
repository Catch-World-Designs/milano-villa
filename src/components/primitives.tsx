import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { Link } from "@/lib/router";

/* ── Scroll reveal ───────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "figure" | "li" | "header" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-revealed");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ── Small text elements ─────────────────────────────── */

export function Eyebrow({
  children,
  className,
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "ink" | "ivory";
}) {
  return (
    <p
      className={cn(
        "label",
        tone === "gold" && "text-gold",
        tone === "ink" && "text-ink/60",
        tone === "ivory" && "text-ivory/70",
        className
      )}
    >
      {children}
    </p>
  );
}

export function NumberedLabel({
  numeral,
  children,
  tone = "ink",
  className,
}: {
  numeral: string;
  children: ReactNode;
  tone?: "ink" | "ivory";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        tone === "ivory" ? "text-ivory/60" : "text-ink/55",
        className
      )}
    >
      <span className="font-serif text-base italic tracking-normal text-gold">
        {numeral}
      </span>
      <span className={cn("h-px w-8", tone === "ivory" ? "bg-ivory/25" : "bg-ink/20")} />
      <span className="label">{children}</span>
    </div>
  );
}

export function Caption({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "ivory";
}) {
  return (
    <figcaption
      className={cn(
        "label mt-3 leading-relaxed",
        tone === "ivory" ? "text-ivory/50" : "text-ink/45",
        className
      )}
    >
      {children}
    </figcaption>
  );
}

/* ── Links ───────────────────────────────────────────── */

export function ArrowLink({
  to,
  href,
  children,
  tone = "ink",
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  tone?: "ink" | "ivory" | "gold";
  className?: string;
}) {
  const classes = cn(
    "arrow-link",
    tone === "ivory" && "arrow-link--light",
    tone === "gold" && "text-gold",
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      <span className="arrow-line" aria-hidden="true" />
      <span className="-ml-2 text-[0.7rem] leading-none" aria-hidden="true">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={classes}>
      {inner}
    </Link>
  );
}

/* ── Images ──────────────────────────────────────────── */

export function Figure({
  src,
  alt,
  caption,
  className,
  imageClassName,
  ratio = "aspect-[4/5]",
  tone = "ink",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
  imageClassName?: string;
  ratio?: string;
  tone?: "ink" | "ivory";
  priority?: boolean;
}) {
  return (
    <Reveal as="figure" className={cn("media-zoom", className)}>
      <div className={cn("media warm-img", ratio, imageClassName)}>
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      {caption ? <Caption tone={tone}>{caption}</Caption> : null}
    </Reveal>
  );
}

/* ── Page furniture ──────────────────────────────────── */

export function PageIntro({
  numeral,
  label,
  title,
  lead,
  meta,
  children,
  className,
}: {
  numeral: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-line", className)}>
      <div className="wrap pt-32 pb-14 md:pt-44 md:pb-20">
        <Reveal>
          <NumberedLabel numeral={numeral}>{label}</NumberedLabel>
        </Reveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal delay={80} className="lg:col-span-8">
            <h1 className="display text-[3.1rem] leading-[0.96] sm:text-[4.2rem] md:text-[5.4rem] lg:text-[6rem]">
              {title}
            </h1>
          </Reveal>
          <div className="flex flex-col justify-end gap-7 lg:col-span-4">
            {lead ? (
              <Reveal delay={160}>
                <p className="body-copy-lg max-w-md">{lead}</p>
              </Reveal>
            ) : null}
            {meta ? <Reveal delay={220}>{meta}</Reveal> : null}
          </div>
        </div>
        {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
      </div>
    </header>
  );
}

export function ConsultationBand({
  title = "Begin a conversation.",
  body = "A first consultation takes place by appointment, at the residence or by telephone. We will ask about the house, the rooms and the timing before we speak of drawings.",
  image,
}: {
  title?: string;
  body?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="wrap relative py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <NumberedLabel numeral="✦" tone="ivory">
              Private consultation
            </NumberedLabel>
            <h2 className="display mt-6 text-[2.7rem] sm:text-[3.6rem] md:text-[4.4rem]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-[0.95rem] font-light leading-[1.85] text-ivory/65 md:text-base">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-5">
              <ArrowLink to="/contact" tone="ivory">
                Request an appointment
              </ArrowLink>
              <a
                href="mailto:concierge@milanovilla.com"
                className="font-sans text-[0.8rem] font-light text-ivory/55 underline decoration-gold/40 underline-offset-8 transition-colors hover:text-ivory"
              >
                concierge@milanovilla.com
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
