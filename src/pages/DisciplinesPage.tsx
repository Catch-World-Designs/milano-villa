import { useEffect } from "react";
import { cn } from "@/utils/cn";
import { disciplines, images } from "@/data/site";
import {
  ArrowLink,
  ConsultationBand,
  Figure,
  NumberedLabel,
  PageIntro,
  Reveal,
} from "@/components/primitives";

export default function DisciplinesPage({ focusId }: { focusId?: string }) {
  const scrollTo = (id: string, smooth = true) => {
    const element = document.getElementById(`discipline-${id}`);
    if (element)
      element.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
  };

  useEffect(() => {
    if (!focusId) return;
    const timer = window.setTimeout(() => scrollTo(focusId, false), 120);
    return () => window.clearTimeout(timer);
  }, [focusId]);

  return (
    <>
      <PageIntro
        numeral="II"
        label="Disciplines"
        title={
          <>
            Eight rooms
            <br />
            <span className="italic">of expertise.</span>
          </>
        }
        lead="Furniture, boiserie, floors, ceilings, light, doors and objects. Each discipline can stand alone; together they make the complete Italian interior."
        meta={
          <div className="border-t border-line pt-4">
            <p className="label text-gold">One atelier · One authorship</p>
            <p className="mt-2 text-[0.8rem] font-light leading-relaxed text-ink/55">
              From a single piece to a full villa commission.
            </p>
          </div>
        }
      />

      {/* ── Index rail ───────────────────────────────── */}
      <div className="sticky top-[74px] z-30 border-b border-line bg-ivory/95 backdrop-blur-md md:top-[92px]">
        <div className="wrap hide-scrollbar flex gap-6 overflow-x-auto py-4 [mask-image:linear-gradient(to_right,black_88%,transparent)] xl:grid xl:grid-cols-8 xl:gap-4 xl:overflow-visible xl:py-3 xl:[mask-image:none]">
          {disciplines.map((discipline) => (
            <button
              key={discipline.id}
              type="button"
              onClick={() => scrollTo(discipline.id)}
              className="group flex shrink-0 items-center gap-2 py-1 xl:min-w-0 xl:flex-col xl:items-start xl:gap-1.5"
            >
              <span className="font-sans text-[0.55rem] font-light tracking-[0.16em] text-gold">
                {discipline.index}
              </span>
              <span className="label whitespace-nowrap text-ink/55 transition-colors group-hover:text-ink xl:whitespace-normal xl:leading-[1.5]">
                {discipline.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Opening statement ────────────────────────── */}
      <section className="wrap py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-serif text-[1.9rem] font-light leading-[1.35] text-ink/85 md:text-[2.3rem]">
              A room is not a list of objects. It is a set of decisions about
              proportion, material and light — held together by a single hand.
            </p>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5 lg:col-start-8">
            <p className="body-copy-lg">
              Milano Villa works across the whole interior, which means we can
              specify the ceiling that sets a room&rsquo;s height, the floor it
              stands on, the doors that open into it and every piece within it.
              Nothing is chosen in isolation.
            </p>
            <p className="body-copy mt-5">
              The list that follows is how we describe the work. A commission can
              begin anywhere on it.
            </p>
            <ArrowLink to="/contact" className="mt-7">
              Discuss a project
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* ── Disciplines ───────────────────────────────── */}
      <div className="border-t border-line">
        {disciplines.map((discipline, index) => {
          const reversed = index % 2 === 1;
          return (
            <section
              key={discipline.id}
              id={`discipline-${discipline.id}`}
              className={cn(
                "scroll-mt-[140px] border-b border-line md:scroll-mt-[160px]",
                index % 2 === 1 ? "bg-ivory-deep/35" : "bg-ivory"
              )}
            >
              <div className="wrap py-14 md:py-20">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <Reveal
                    className={cn(
                      "lg:col-span-6",
                      reversed ? "lg:order-2 lg:col-start-7" : "lg:order-1"
                    )}
                  >
                    <div className="media media-zoom warm-img aspect-[4/3]">
                      <img
                        src={discipline.image}
                        alt={discipline.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p className="label mt-3 text-ink/35">
                      {discipline.index} —{" "}
                      {discipline.title === "Project Assignment"
                        ? "A residence, resolved in full"
                        : discipline.short}
                    </p>
                  </Reveal>

                  <div
                    className={cn(
                      "flex flex-col justify-center lg:col-span-5",
                      reversed
                        ? "lg:order-1 lg:col-start-1 lg:row-start-1"
                        : "lg:order-2 lg:col-start-8"
                    )}
                  >
                    <Reveal delay={80}>
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif text-[1rem] italic text-gold">
                          {discipline.index}
                        </span>
                        <span className="h-px w-8 bg-line" />
                        <span className="label text-ink/40">Discipline</span>
                      </div>
                      <h2 className="display mt-5 text-[2.4rem] sm:text-[2.9rem] md:text-[3.3rem]">
                        {discipline.title}
                      </h2>
                      <p className="body-copy-lg mt-5 max-w-lg">
                        {discipline.description}
                      </p>

                      <ul className="mt-8 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {discipline.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-baseline gap-3 border-t border-line-soft pt-2.5 text-[0.8rem] font-light leading-snug text-ink/60"
                          >
                            <span className="diamond mt-1 shrink-0 opacity-70" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <ArrowLink to="/contact" className="mt-8">
                        Enquire about {discipline.title.toLowerCase()}
                      </ArrowLink>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Complete commission ──────────────────────── */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <Figure
              src={images.living}
              alt="A complete interior with classical architecture and composed furnishings"
              ratio="aspect-[16/10]"
              caption="A residence, drawn from the shell inward"
            />
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <NumberedLabel numeral="✦">Project Assignment</NumberedLabel>
              <h2 className="display mt-6 text-[2.4rem] leading-[1.05] md:text-[3rem]">
                Begin with the entire house.
              </h2>
              <p className="body-copy mt-5">
                For a full commission, we draw the residence as one: architectural
                drawings, elevations, floor plans, furniture layouts, material
                palettes and 3D renders. The drawings become the brief for every
                workshop in Italy.
              </p>
              <ArrowLink to="/realization" className="mt-7">
                The realization steps
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultationBand
        image={images.lounge}
        title="Tell us what the room needs."
        body="A single chandelier or a whole villa. The first conversation is the same: what is the house, and how should it feel to live in?"
      />
    </>
  );
}
