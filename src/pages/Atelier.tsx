import { CONTACT, images } from "@/data/site";
import {
  ArrowLink,
  ConsultationBand,
  Figure,
  NumberedLabel,
  PageIntro,
  Reveal,
} from "@/components/primitives";
import { ArchMotif } from "@/components/Logo";

const principles = [
  {
    numeral: "I",
    title: "Proportion",
    copy: "The architecture sets the first dimension. We answer it in furniture, joinery and light — never the reverse.",
  },
  {
    numeral: "II",
    title: "Provenance",
    copy: "Made in Italy by workshops we know personally. Not sourced from a warehouse, and never chosen from a screen.",
  },
  {
    numeral: "III",
    title: "Permanence",
    copy: "Materials and methods specified to remain right in twenty years. The room should age with the house around it.",
  },
];

const offerings = [
  {
    index: "01",
    title: "Furniture",
    copy: "Sofas, chairs, tables and casegoods, made by commission to the dimensions of the room.",
  },
  {
    index: "02",
    title: "Lighting",
    copy: "Crystal chandeliers, lanterns and bespoke fixtures, assembled and finished in Italy.",
  },
  {
    index: "03",
    title: "Boiserie",
    copy: "Carved wall panelling, concealed doors and mouldings, fitted to the geometry of the building.",
  },
  {
    index: "04",
    title: "Complete commissions",
    copy: "The whole interior, from architectural drawings and renders through to fit-out support.",
  },
];

export default function Atelier() {
  return (
    <>
      <PageIntro
        numeral="I"
        label="The Atelier"
        title={
          <>
            Italian
            <br />
            <span className="italic">by discipline.</span>
          </>
        }
        lead="Milano Villa is an interiors house in the Italian tradition — based in the Washington area, working across the United States and worldwide."
        meta={
          <div className="border-t border-line pt-4">
            <p className="label text-gold">By appointment</p>
            <p className="mt-2 text-[0.8rem] font-light leading-relaxed text-ink/55">
              Commissions are received through a private concierge.
            </p>
          </div>
        }
      />

      {/* ── The premise ───────────────────────────────── */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[1.75rem] font-light leading-[1.45] text-ink/85 md:text-[2.15rem]">
                Milano Villa exists to make a complete Italian interior possible
                in America. We are not a showroom and not a catalogue. We are a
                small atelier with a long address book: carvers, gilders,
                upholsterers, stonecutters, glassmakers and cabinetmakers whose
                families have done this work for generations.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                <p className="body-copy">
                  Each commission is led personally, from the first conversation
                  to the day the last object is placed. The drawings are ours.
                  The making is theirs. The house is yours.
                </p>
                <p className="body-copy">
                  We keep the atelier deliberately small so that a client is
                  never passed between departments. The person who first listens
                  to the brief is the person who signs off the final delivery.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <div className="relative overflow-hidden border border-line bg-ivory-deep/50 p-8 md:p-10">
              <ArchMotif className="pointer-events-none absolute -right-10 -bottom-16 h-[19rem] w-[14rem] opacity-[0.18]" />
              <p className="label text-gold">Our brief, in one line</p>
              <p className="relative mt-5 font-serif text-[1.6rem] font-light leading-[1.4]">
                The ultimate source for design &amp; furnishings — not a shop,
                but a house of making.
              </p>
              <div className="mt-7 h-px w-12 bg-gold/60" />
              <p className="mt-5 text-[0.75rem] font-light leading-relaxed text-ink/50">
                {CONTACT.reach}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Image & confidence ────────────────────────── */}
      <section className="border-y border-line bg-ivory-deep/40">
        <div className="wrap py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <Figure
              className="lg:col-span-7"
              src={images.foyer}
              alt="A grand marble entrance hall with a sweeping stair and chandelier"
              ratio="aspect-[16/10]"
              caption="The entrance hall · stone, joinery and light drawn as one"
            />
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <NumberedLabel numeral="✦">What guides us</NumberedLabel>
                <p className="mt-6 font-serif text-[1.75rem] font-light italic leading-[1.4] text-ink/80">
                  Restraint is not the absence of detail. It is the discipline of
                  knowing which details a room needs.
                </p>
                <p className="body-copy mt-6">
                  We are equally at home in the classical and the contemporary.
                  What does not change is the standard of drawing, making and
                  fitting that a house of consequence requires.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ────────────────────────────────── */}
      <section className="wrap py-20 md:py-28">
        <Reveal>
          <NumberedLabel numeral="II">The standards</NumberedLabel>
          <h2 className="display mt-6 max-w-2xl text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem]">
            Three things we will not <span className="italic">compromise.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-0 border-t border-line md:mt-16 md:grid-cols-3">
          {principles.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <span className="font-serif text-[1.1rem] italic text-gold">
                  {item.numeral}
                </span>
                <h3 className="mt-4 font-serif text-[1.7rem] leading-none">
                  {item.title}
                </h3>
                <p className="body-copy mt-4">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── What we make ──────────────────────────────── */}
      <section className="bg-ink text-ivory">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <NumberedLabel numeral="III" tone="ivory">
                  The house offers
                </NumberedLabel>
                <h2 className="display mt-6 text-[2.7rem] leading-[1.03] text-ivory sm:text-[3.4rem]">
                  The things
                  <br />
                  <span className="italic">a room is made of.</span>
                </h2>
                <p className="mt-6 max-w-sm text-[0.86rem] font-light leading-[1.85] text-ivory/55">
                  Each can be commissioned alone. Together they make the complete
                  interior — one palette, one set of drawings, one hand.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {offerings.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="grid grid-cols-[2.2rem_1fr] gap-5 border-b border-ivory/15 py-6 md:grid-cols-[2.5rem_8rem_1fr] md:gap-6">
                    <span className="font-sans text-[0.6rem] font-light tracking-[0.2em] text-gold">
                      {item.index}
                    </span>
                    <h3 className="font-serif text-[1.4rem] leading-none text-ivory/90">
                      {item.title}
                    </h3>
                    <p className="col-start-2 mt-1 text-[0.83rem] font-light leading-relaxed text-ivory/50 md:col-start-3 md:mt-0">
                      {item.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={220}>
                <ArrowLink to="/disciplines" tone="ivory" className="mt-8">
                  All eight disciplines
                </ArrowLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── The hands ─────────────────────────────────── */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-4">
            <Figure
              src={images.hands}
              alt="Close view of an artisan's hands working a chisel into timber"
              ratio="aspect-[3/4]"
              caption="Carving · an Italian workshop"
            />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-4 lg:pb-14">
            <Figure
              src={images.chisel}
              alt="A carpenter shaping a wooden detail with hammer and chisel"
              ratio="aspect-[4/5]"
              caption="Joinery · a full-size detail"
            />
          </Reveal>
          <div className="lg:col-span-3 lg:col-start-10 lg:pb-2">
            <Reveal>
              <NumberedLabel numeral="IV">Provenance</NumberedLabel>
              <h2 className="display mt-6 text-[2rem] leading-[1.1] md:text-[2.4rem]">
                We know the people who make it.
              </h2>
              <p className="body-copy mt-5">
                Italy is not a sourcing category. It is a network of small
                workshops, often family-run, where the knowledge is still held
                and passed on. We work with those workshops directly.
              </p>
              <ArrowLink to="/realization" className="mt-7">
                How a commission unfolds
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultationBand
        image={images.panelRoom}
        title="A house of making, at your service."
        body="We begin with a conversation about the rooms you have and the way you would like to live in them. Everything follows from there."
      />
    </>
  );
}
