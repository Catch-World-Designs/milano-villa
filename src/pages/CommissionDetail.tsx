import { Link } from "@/lib/router";
import { projects, images } from "@/data/site";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  ArrowLink,
  Caption,
  ConsultationBand,
  NumberedLabel,
  Reveal,
} from "@/components/primitives";
import NotFound from "./NotFound";

export default function CommissionDetail({ slug }: { slug: string }) {
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* ── Plate image ──────────────────────────────── */}
      <header className="relative mt-[74px] h-[62vh] min-h-[440px] overflow-hidden bg-ink md:mt-[92px] md:h-[76vh]">
        <ResponsiveImage
          src={project.image}
          alt={project.alt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/30" />
        <div className="wrap relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <div className="hero-anim">
            <p className="label text-ivory/55">
              Commission <span className="px-1 text-gold">·</span> Plate {project.plate}
            </p>
            <h1 className="display mt-4 max-w-4xl text-[2.9rem] leading-[0.97] text-ivory sm:text-[4rem] md:text-[5.4rem]">
              {project.title}
            </h1>
          </div>
        </div>
      </header>

      {/* ── Meta bar ─────────────────────────────────── */}
      <div className="border-b border-line bg-ivory">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
          <Link
            to="/commissions"
            className="group flex items-center gap-3 label text-ink/55 transition-colors hover:text-gold"
          >
            <span aria-hidden="true" className="text-sm transition-transform group-hover:-translate-x-1">
              ←
            </span>
            All commissions
          </Link>
          <p className="label text-ink/40">
            {project.discipline} <span className="px-1.5 text-gold">·</span>{" "}
            {project.place}
          </p>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <article className="wrap py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="label text-gold">The commission</p>
                <dl className="mt-5 space-y-0 border-t border-line">
                  {[
                    { term: "Discipline", value: project.discipline },
                    { term: "Place", value: project.place },
                    { term: "Scope", value: "Private commission" },
                    { term: "Atelier", value: "Italy · Washington" },
                  ].map((item) => (
                    <div key={item.term} className="border-b border-line py-3.5">
                      <dt className="label text-ink/35">{item.term}</dt>
                      <dd className="mt-1.5 text-[0.82rem] font-light leading-snug text-ink/70">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={80}>
                <p className="label mt-8 text-gold">Materials</p>
                <ul className="mt-4 space-y-2.5">
                  {project.materials.map((material) => (
                    <li
                      key={material}
                      className="flex items-baseline gap-3 text-[0.8rem] font-light text-ink/60"
                    >
                      <span className="diamond shrink-0 opacity-70" />
                      {material}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-5">
            <Reveal>
              <p className="font-serif text-[1.65rem] font-light leading-[1.45] text-ink/85 md:text-[2rem]">
                {project.excerpt}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 border-t border-line pt-8">
                <NumberedLabel numeral="I">The brief</NumberedLabel>
                <p className="body-copy-lg mt-5">{project.overview}</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 border-t border-line pt-8">
                <NumberedLabel numeral="II">The approach</NumberedLabel>
                <p className="body-copy-lg mt-5">{project.approach}</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 border-t border-line pt-8">
                <NumberedLabel numeral="III">In the room</NumberedLabel>
                <ul className="mt-6 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                  {project.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-baseline gap-3 border-b border-line-soft py-3 text-[0.82rem] font-light leading-snug text-ink/65"
                    >
                      <span className="font-serif text-[0.72rem] italic text-gold">
                        ✦
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10">
                <ArrowLink to="/contact">Enquire about a similar room</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* ── Gallery ──────────────────────────────────── */}
      <section className="wrap pb-20 md:pb-28">
        <div className="border-t border-line pt-10">
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-8">
              <div className="media media-zoom warm-img aspect-[16/10]">
                <ResponsiveImage
                  src={project.gallery[0].src}
                  alt={project.gallery[0].alt}
                  loading="lazy"
                />
              </div>
              <Caption>{project.gallery[0].alt}</Caption>
            </Reveal>
            <div className="grid gap-6 md:col-span-4">
              {project.gallery.slice(1, 3).map((image) => (
                <Reveal key={image.src} delay={80}>
                  <div className="media media-zoom warm-img aspect-[4/5]">
                    <ResponsiveImage src={image.src} alt={image.alt} loading="lazy" />
                  </div>
                  <Caption>{image.alt}</Caption>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Next ─────────────────────────────────────── */}
      <section className="border-t border-line bg-ivory-deep/40">
        <div className="wrap py-12 md:py-16">
          <Link to={`/commissions/${next.slug}`} className="group grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="media media-zoom warm-img aspect-[4/3]">
                <ResponsiveImage src={next.image} alt={next.alt} loading="lazy" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 md:col-span-7 lg:col-span-7 lg:col-start-6">
              <div>
                <p className="label text-gold">Next commission · Plate {next.plate}</p>
                <h2 className="mt-3 font-serif text-[2rem] leading-tight transition-colors group-hover:text-gold md:text-[2.6rem]">
                  {next.title}
                </h2>
                <p className="mt-1 text-[0.78rem] font-light text-ink/45">
                  {next.discipline}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-2xl text-gold transition-transform duration-500 group-hover:translate-x-2"
              >
                →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <ConsultationBand
        image={images.villa}
        title="A similar room, in your house."
        body="Bring us the dimensions, a photograph, or only an intention. We will tell you honestly what the room requires."
      />
    </>
  );
}
