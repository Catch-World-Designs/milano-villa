import { Link } from "@/lib/router";
import { cn } from "@/utils/cn";
import { images, projects } from "@/data/site";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  ArrowLink,
  Caption,
  NumberedLabel,
  PageIntro,
  Reveal,
} from "@/components/primitives";


const placement = [
  "lg:col-span-7",
  "lg:col-span-4 lg:col-start-9 lg:mt-24",
  "lg:col-span-4 lg:col-start-2 lg:-mt-6",
  "lg:col-span-5 lg:col-start-8 lg:mt-10",
  "lg:col-span-4 lg:col-start-2 lg:mt-6",
  "lg:col-span-5 lg:col-start-8 lg:mt-20",
];

const ratios = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[4/3]",
];

export default function Commissions() {
  return (
    <>
      <PageIntro
        numeral="III"
        label="Commissions"
        title={
          <>
            Rooms,
            <br />
            <span className="italic">in full.</span>
          </>
        }
        lead="A selection of room studies and private commissions. Each begins with the architecture and is carried through to the last object placed."
        meta={
          <div className="border-t border-line pt-4">
            <p className="label text-gold">Studies · Washington &amp; beyond</p>
            <p className="mt-2 text-[0.8rem] font-light leading-relaxed text-ink/55">
              Further work is shared privately during consultation.
            </p>
          </div>
        }
      />

      {/* ── Opening note ─────────────────────────────── */}
      <section className="wrap pt-14 pb-4 md:pt-20">
        <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="font-serif text-[1.7rem] font-light leading-[1.4] text-ink/85 md:text-[2.05rem]">
              The rooms shown here are not a style. They are a method: measure the
              architecture, settle the proportion, then make each element for its
              place.
            </p>
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={80}>
              <NumberedLabel numeral="I–VI">Plates</NumberedLabel>
              <p className="body-copy mt-5">
                Scope, materials and method are noted with each study. Photography
                is representative of the atelier&rsquo;s rooms.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Plates ───────────────────────────────────── */}
      <section className="wrap pb-20 pt-10 md:pb-28">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-y-16">
          {projects.map((project, index) => (
            <Reveal key={project.slug} className={placement[index]} delay={40}>
              <Link
                to={`/commissions/${project.slug}`}
                className="group block"
              >
                <div className={cn("media media-zoom warm-img", ratios[index])}>
                  <ResponsiveImage
                    src={project.image}
                    alt={project.alt}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span className="absolute inset-0 border border-ink/0 transition-colors duration-500 group-hover:border-ivory/25" />
                </div>
                <div className="mt-4 border-t border-line pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="label text-gold">Plate {project.plate}</p>
                    <p className="label text-ink/35">{project.place}</p>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-5">
                    <h2 className="font-serif text-[1.7rem] leading-tight transition-colors duration-300 group-hover:text-gold md:text-[1.95rem]">
                      {project.title}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="text-sm text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-1 text-[0.75rem] font-light tracking-[0.02em] text-ink/45">
                    {project.discipline}
                  </p>
                  <p className="body-copy mt-3 max-w-md text-[0.83rem]">
                    {project.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}

        </div>
        <div className="mt-14 border-t border-line pt-5">
          <p className="label text-ink/35">
            Plates I–VI <span className="px-1.5 text-gold">·</span> Room studies
            &amp; private commissions
          </p>
        </div>
      </section>

      {/* ── Private portfolio ────────────────────────── */}
      <section className="border-y border-line bg-ivory-deep/45">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <NumberedLabel numeral="✦">The private portfolio</NumberedLabel>
                <h2 className="display mt-6 text-[2.5rem] leading-[1.05] sm:text-[3.1rem] md:text-[3.7rem]">
                  Some rooms are not published.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={80}>
                <p className="body-copy">
                  A wider selection of completed residences is available to
                  prospective clients under private agreement. Write to the
                  concierge with a short note about your house, and we will send
                  the portfolio and arrange a conversation.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <ArrowLink to="/contact">Request the portfolio</ArrowLink>
                  <Link
                    to="/disciplines"
                    className="label text-ink/45 underline-offset-8 transition-colors hover:text-gold hover:underline"
                  >
                    The disciplines
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={120} className="mt-12">
            <div className="media aspect-[21/9] md:aspect-[24/7]">
              <ResponsiveImage
                src={images.palace}
                alt="A long enfilade of classical rooms with chandeliers and stone floors"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <Caption>
              A full residence, read as one · Architecture, joinery, light
            </Caption>
          </Reveal>
        </div>
      </section>
    </>
  );
}


