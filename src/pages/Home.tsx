import { useState } from "react";
import { Link } from "@/lib/router";
import { cn } from "@/utils/cn";
import { disciplines, images, processSteps, projects, CONTACT } from "@/data/site";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  ArrowLink,
  Caption,
  Eyebrow,
  Figure,
  NumberedLabel,
  Reveal,
} from "@/components/primitives";

function CommissionPlate({
  projectIndex,
  ratio,
  className,
}: {
  projectIndex: number;
  ratio: string;
  className?: string;
}) {
  const project = projects[projectIndex];
  return (
    <Reveal className={className}>
      <Link to={`/commissions/${project.slug}`} className="group block">
        <div className={cn("media media-zoom warm-img", ratio)}>
          <ResponsiveImage src={project.image} alt={project.alt} loading="lazy" />
        </div>
        <div className="mt-4 border-t border-line pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className="label text-gold">Plate {project.plate}</p>
            <p className="label text-ink/40">{project.place}</p>
          </div>
          <h3 className="mt-2 font-serif text-[1.55rem] leading-tight transition-colors group-hover:text-gold">
            {project.title}
          </h3>
          <p className="mt-1 text-[0.76rem] font-light tracking-[0.02em] text-ink/50">
            {project.discipline}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Home() {
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const active = disciplines[activeDiscipline];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory">
        <ResponsiveImage
          src={images.hero}
          alt="A grand European salon with gilded detail, marble and a crystal chandelier"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />

        <div className="wrap relative flex flex-1 flex-col justify-end pt-36 pb-0">
          <div className="grid gap-10 pb-12 md:pb-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="hero-anim flex items-center gap-4">
                <span className="h-px w-10 bg-gold" />
                <p className="label text-ivory/70">
                  Milano Villa <span className="px-1 text-gold">·</span> Washington, DC
                </p>
              </div>
              <h1 className="display hero-anim hero-anim-delay-1 mt-7 text-[2.9rem] leading-[0.94] text-ivory sm:text-[4.4rem] md:text-[6rem] lg:text-[6.9rem]">
                Every room,
                <br />
                <span className="italic text-ivory/90">considered in full.</span>
              </h1>
            </div>

            <div className="hero-anim hero-anim-delay-3 lg:col-span-4 lg:pb-3">
              <div className="max-w-sm border-t border-ivory/25 pt-6">
                <p className="text-[0.86rem] font-light leading-[1.8] text-ivory/70">
                  Handcrafted Italian furniture, boiserie, lighting and complete
                  interior commissions — sourced from Italy&rsquo;s finest
                  workshops for residences in Washington and beyond.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link to="/contact" className="btn btn-light">
                    Request a consultation
                  </Link>
                  <Link
                    to="/commissions"
                    className="label text-ivory/60 underline-offset-8 transition-colors hover:text-ivory hover:underline"
                  >
                    View work
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-fade flex flex-wrap items-center justify-between gap-4 border-t border-ivory/15 py-5">
            <p className="label hidden text-ivory/45 sm:block">
              Furniture <span className="px-1.5 text-gold/70">·</span> Lighting{" "}
              <span className="px-1.5 text-gold/70">·</span> Boiserie{" "}
              <span className="px-1.5 text-gold/70">·</span> Complete interiors
            </p>
            <p className="label text-ivory/35">By appointment only</p>
            <span className="label flex items-center gap-3 text-ivory/35">
              Scroll
              <span className="block h-8 w-px bg-ivory/25" aria-hidden="true" />
            </span>
          </div>
        </div>
      </section>

      {/* ── Masthead strip ───────────────────────────── */}
      <div className="border-b border-line bg-ivory">
        <div className="wrap flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
          <p className="label text-ink/40">Design &amp; Furnishings</p>
          <p className="font-serif text-[1.15rem] font-light italic text-ink/75">
            The ultimate source for design &amp; furnishings.
          </p>
          <p className="label text-gold">Italy · America · Worldwide</p>
        </div>
      </div>

      {/* ── I. The house ─────────────────────────────── */}
      <section className="wrap py-20 md:py-32">
        <Reveal>
          <NumberedLabel numeral="I">The House</NumberedLabel>
        </Reveal>
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
          <Reveal delay={60} className="lg:col-span-6">
            <h2 className="display max-w-xl text-[2.75rem] sm:text-[3.4rem] md:text-[4.1rem]">
              A single source for the{" "}
              <span className="italic">Italian interior.</span>
            </h2>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="body-copy-lg">
                Milano Villa is an interiors house in the Italian tradition,
                based in the Washington area and working across the United
                States and abroad. We design the room, draw its details, and
                commission the workshops that have made them for generations.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="body-copy mt-5">
                Furniture, boiserie, floors, ceilings, light, doors and the
                objects that finish them — considered together by one atelier,
                with a private concierge at the centre of every commission.
              </p>
              <ArrowLink to="/atelier" className="mt-8">
                The atelier
              </ArrowLink>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Figure
            className="lg:col-span-7"
            src={images.panelRoom}
            alt="A classical room lined with pale carved wood panelling and tall windows"
            ratio="aspect-[16/11]"
            caption="Boiserie, drawn to the room · Atelier study"
          />
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-gold/45 pt-6">
              <span className="font-serif text-4xl italic leading-none text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-3 font-serif text-[1.65rem] font-light leading-[1.35] text-ink/90 md:text-[1.9rem]">
                A room is finished only when nothing in it is unresolved.
              </blockquote>
              <p className="label mt-6 text-ink/40">An atelier principle</p>
            </div>
            <p className="body-copy mt-8">
              We do not begin with a catalogue. We begin with the architecture,
              the light, and the way a room is actually used.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── II. Disciplines ──────────────────────────── */}
      <section className="border-y border-line bg-ivory-deep/55">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <Reveal>
                <NumberedLabel numeral="II">Disciplines</NumberedLabel>
                <h2 className="display mt-7 text-[2.6rem] sm:text-[3.2rem] md:text-[3.9rem]">
                  Everything a room requires,
                  <br className="hidden sm:block" /> under{" "}
                  <span className="italic">one hand.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={100} className="md:col-span-5 md:col-start-8">
              <p className="body-copy md:text-right">
                Eight disciplines, one authorship. Begin with a single piece, or
                place the whole residence in our care. Hover to look closer.
              </p>
              <div className="mt-5 md:text-right">
                <ArrowLink to="/disciplines">All disciplines</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              {disciplines.map((discipline, index) => (
                <Link
                  key={discipline.id}
                  to={`/disciplines/${discipline.id}`}
                  onMouseEnter={() => setActiveDiscipline(index)}
                  onFocus={() => setActiveDiscipline(index)}
                  className={cn(
                    "group -mx-2 grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-line px-2 py-4 transition-colors duration-300 lg:grid-cols-[2.4rem_1fr_auto] lg:py-[0.95rem]",
                    activeDiscipline === index && "lg:bg-ivory/60"
                  )}
                  aria-label={`${discipline.title} — ${discipline.short}`}
                >
                  <span
                    className={cn(
                      "font-sans text-[0.6rem] font-light tracking-[0.18em] transition-colors",
                      activeDiscipline === index ? "text-gold" : "text-ink/35"
                    )}
                  >
                    {discipline.index}
                  </span>
                  <span
                    className={cn(
                      "font-serif text-[1.55rem] leading-none transition-all duration-500 sm:text-[1.8rem] lg:text-[2.05rem]",
                      activeDiscipline === index
                        ? "text-gold lg:translate-x-2"
                        : "text-ink"
                    )}
                  >
                    {discipline.title}
                  </span>
                  <span className="lg:hidden">
                    <span className="media block h-14 w-11">
                      <ResponsiveImage src={discipline.image} alt="" loading="lazy" />
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden text-sm text-gold transition-opacity duration-300 lg:block",
                      activeDiscipline === index ? "opacity-100" : "opacity-0"
                    )}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <div className="sticky top-32">
                <div className="media aspect-[4/5] bg-ivory-warm">
                  {disciplines.map((discipline, index) => (
                    <ResponsiveImage
                      key={discipline.id}
                      src={discipline.image}
                      alt={discipline.alt}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                        index === activeDiscipline ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-line pt-3">
                  <p className="label text-gold">
                    {active.index} — {active.title}
                  </p>
                  <p className="label text-ink/35">Milano Villa</p>
                </div>
                <p className="mt-2 text-[0.82rem] font-light text-ink/55">
                  {active.short}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── III. Selected rooms ──────────────────────── */}
      <section className="wrap py-20 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <NumberedLabel numeral="III">Selected rooms</NumberedLabel>
            <h2 className="display mt-6 text-[2.6rem] sm:text-[3.2rem] md:text-[3.9rem]">
              Commissions &amp; study.
            </h2>
          </Reveal>
          <Reveal delay={100} className="pb-2">
            <ArrowLink to="/commissions">All commissions</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-y-16">
          <CommissionPlate
            projectIndex={0}
            ratio="aspect-[4/3]"
            className="lg:col-span-7"
          />
          <CommissionPlate
            projectIndex={1}
            ratio="aspect-[3/4]"
            className="lg:col-span-4 lg:col-start-9 lg:mt-20"
          />
          <CommissionPlate
            projectIndex={2}
            ratio="aspect-[4/3]"
            className="lg:col-span-4 lg:col-start-2 lg:-mt-8"
          />
          <Reveal delay={80} className="lg:col-span-4 lg:col-start-7 lg:mt-8">
            <div className="border-t border-line pt-6">
              <p className="font-serif text-[1.7rem] font-light italic leading-snug text-ink/80">
                Each commission begins with a drawing and ends with the last
                object in its place.
              </p>
              <p className="body-copy mt-6">
                A selection is shown here. Further work — including residences
                under private agreement — is shared during consultation.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-3 border-b border-gold/50 pb-2 label text-ink transition-colors hover:text-gold"
              >
                Request the private portfolio
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <Caption className="mt-8">
              Photography · representative of the atelier&rsquo;s rooms
            </Caption>
          </Reveal>
        </div>
      </section>

      {/* ── IV. Realization ──────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <NumberedLabel numeral="IV" tone="ivory">
                  Realization steps
                </NumberedLabel>
                <h2 className="display mt-7 text-[2.6rem] leading-[1.02] text-ivory sm:text-[3.1rem]">
                  From the first sketch to the finished room.
                </h2>
                <p className="mt-6 max-w-xs text-[0.88rem] font-light leading-[1.85] text-ivory/55">
                  Five stages. One atelier in Italy, one point of contact in
                  Washington, and no decision left to chance.
                </p>
                <ArrowLink to="/realization" tone="ivory" className="mt-8">
                  The realization steps
                </ArrowLink>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {processSteps.map((step, index) => (
                <Reveal key={step.numeral} delay={index * 60}>
                  <Link
                    to="/realization"
                    className="group grid grid-cols-[2.3rem_1fr] items-baseline gap-4 border-b border-ivory/15 py-5 md:grid-cols-[3rem_1fr_auto] md:gap-6"
                  >
                    <span className="font-serif text-[1.05rem] italic text-gold">
                      {step.numeral}
                    </span>
                    <span className="font-serif text-[1.4rem] leading-snug text-ivory/90 transition-colors group-hover:text-gold-light md:text-[1.65rem]">
                      {step.title}
                    </span>
                    <span className="col-start-2 label text-ivory/30 md:col-start-3 md:text-right">
                      {step.caption}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── V. Made in Italy ─────────────────────────── */}
      <section className="wrap py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <div className="media media-zoom warm-img aspect-[4/5] md:aspect-[5/5]">
              <ResponsiveImage
                src={images.artisan}
                alt="An artisan carving a detail by hand in an Italian workshop"
                loading="lazy"
                decoding="async"
              />
            </div>
            <Caption>
              The workshop, not the showroom · Carving by hand
            </Caption>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
            <Reveal>
              <NumberedLabel numeral="V">Made in Italy</NumberedLabel>
              <h2 className="display mt-7 text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem]">
                Made where the knowledge is.
              </h2>
              <p className="body-copy-lg mt-7">
                Our furniture, boiserie and lighting are made in Italy&rsquo;s
                finest workshops, selected for the work rather than the name. We
                visit, draw with the makers, and follow each commission through
                production.
              </p>
            </Reveal>

            <div className="mt-10 space-y-0">
              {[
                {
                  title: "Provenance",
                  copy: "Workshops chosen for material knowledge, not catalogue scale.",
                },
                {
                  title: "Drawings",
                  copy: "Elevations, full-size details and patterns, resolved before production.",
                },
                {
                  title: "Installation",
                  copy: "Delivery coordinated and fit-out attended, until the room is complete.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="grid grid-cols-[1.9rem_1fr] gap-4 border-t border-line py-5">
                    <span className="font-serif text-sm italic text-gold">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-[1.2rem] leading-none">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.82rem] font-light leading-relaxed text-ink/55">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing invitation ───────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        <ResponsiveImage
          src={images.villa}
          alt="An Italian villa with a formal garden at dusk"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
        <div className="wrap relative py-24 md:py-36">
          <div className="max-w-2xl">
            <Eyebrow>Private consultation</Eyebrow>
            <h2 className="display mt-6 text-[3rem] leading-[0.98] text-ivory sm:text-[4rem] md:text-[5rem]">
              Begin with
              <br />
              <span className="italic">the house.</span>
            </h2>
            <p className="mt-7 max-w-md text-[0.9rem] font-light leading-[1.85] text-ivory/65">
              Tell us about the rooms you are considering — a single salon or the
              whole residence. A first conversation takes place by appointment,
              at the residence or by telephone.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link to="/contact" className="btn btn-light">
                Request an appointment
              </Link>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[0.8rem] font-light text-ivory/55 underline decoration-gold/40 underline-offset-8 transition-colors hover:text-ivory"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
