import { images, processSteps } from "@/data/site";
import {
  ArrowLink,
  Caption,
  ConsultationBand,
  Figure,
  NumberedLabel,
  PageIntro,
  Reveal,
} from "@/components/primitives";

const expectations = [
  {
    index: "01",
    title: "The brief",
    copy: "Dimensions or floor plans if they exist, photographs of the rooms, and an honest account of how you live in them.",
  },
  {
    index: "02",
    title: "Decisions",
    copy: "One nominated decision-maker on your side, and a willingness to settle the concept before anything is made.",
  },
  {
    index: "03",
    title: "Time",
    copy: "Italian production is measured in months, not weeks. A written programme is issued alongside the quotation.",
  },
];

export default function Realization() {
  return (
    <>
      <PageIntro
        numeral="IV"
        label="Realization"
        title={
          <>
            The realization
            <br />
            <span className="italic">steps.</span>
          </>
        }
        lead="Five stages take a room from conversation to installation. The order is fixed; the pace is set by the house, the workshops and you."
        meta={
          <div className="border-t border-line pt-4">
            <p className="label text-gold">A private commission</p>
            <p className="mt-2 text-[0.8rem] font-light leading-relaxed text-ink/55">
              One point of contact from first note to final placement.
            </p>
          </div>
        }
      />

      {/* ── Opening image band ───────────────────────── */}
      <section className="wrap py-12 md:py-16">
        <Reveal>
          <div className="media warm-img aspect-[16/9] sm:aspect-[21/9]">
            <img
              src={images.palace}
              alt="An enfilade of grand classical rooms seen in warm light"
              loading="eager"
            />
          </div>
          <Caption>
            A residence before decoration · Proportion, circulation and light
            established first
          </Caption>
        </Reveal>
      </section>

      {/* ── The stages ───────────────────────────────── */}
      <section className="wrap pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <NumberedLabel numeral="I–V">The method</NumberedLabel>
                <h2 className="display mt-6 text-[2.6rem] leading-[1.02] sm:text-[3.2rem]">
                  A method,
                  <br />
                  <span className="italic">not a menu.</span>
                </h2>
                <p className="body-copy mt-6">
                  Nothing is ordered before the drawings are agreed. Nothing is
                  made before the quotation is understood. The five stages
                  protect the room — and the client.
                </p>
                <ArrowLink to="/contact" className="mt-7">
                  Begin a commission
                </ArrowLink>
              </Reveal>

              <Reveal delay={120} className="mt-12 hidden lg:block">
                <Figure
                  src={images.hands}
                  alt="Hands carving a timber detail in an Italian workshop"
                  ratio="aspect-[3/4]"
                  caption="The making follows the drawings"
                />
              </Reveal>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            {processSteps.map((step, index) => (
              <Reveal key={step.numeral} delay={index * 50}>
                <div className="grid grid-cols-[2.6rem_1fr] gap-4 border-t border-line py-8 md:grid-cols-[5rem_1fr] md:gap-7 md:py-10">
                  <div>
                    <span className="font-serif text-[2rem] italic leading-none text-gold/70 md:text-[2.8rem]">
                      {step.numeral}
                    </span>
                  </div>
                  <div>
                    <p className="label text-ink/40">{step.caption}</p>
                    <h3 className="mt-3 font-serif text-[1.6rem] leading-[1.2] md:text-[2rem]">
                      {step.title}
                    </h3>
                    <p className="body-copy mt-4 max-w-xl">{step.body}</p>
                    <div className="mt-5 flex flex-col gap-1.5 border-l border-gold/45 pl-4 sm:flex-row sm:gap-4">
                      <span className="label shrink-0 text-gold">At this stage</span>
                      <span className="text-[0.78rem] font-light leading-relaxed text-ink/50">
                        {step.note}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="media warm-img aspect-[4/3]">
                  <img
                    src={images.carvedPanels}
                    alt="Carved wooden panels laid out on a workshop bench"
                    loading="lazy"
                  />
                </div>
                <div className="media warm-img aspect-[4/3]">
                  <img
                    src={images.chandelier}
                    alt="A crystal chandelier in warm interior light"
                    loading="lazy"
                  />
                </div>
              </div>
              <Caption>
                Drawing, carving, gilding, glass · each element made for its room
              </Caption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What we ask ───────────────────────────────── */}
      <section className="border-y border-line bg-ivory-deep/40">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <NumberedLabel numeral="✦">Before we begin</NumberedLabel>
                <h2 className="display mt-6 text-[2.5rem] leading-[1.05] sm:text-[3.1rem]">
                  What we ask
                  <br />
                  <span className="italic">of you.</span>
                </h2>
                <p className="body-copy mt-5 max-w-sm">
                  A commission works best when the brief is candid and the
                  decisions are made in sequence. These three things make the
                  difference.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-0 border-t border-line sm:grid-cols-3">
                {expectations.map((item, index) => (
                  <Reveal key={item.index} delay={index * 80}>
                    <div className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-6 sm:py-7 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0">
                      <span className="font-sans text-[0.58rem] font-light tracking-[0.2em] text-gold">
                        {item.index}
                      </span>
                      <h3 className="mt-3 font-serif text-[1.35rem] leading-none">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.8rem] font-light leading-relaxed text-ink/55">
                        {item.copy}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={200}>
                <p className="mt-8 font-serif text-[1.25rem] font-light italic text-ink/55">
                  Everything else is our work.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ConsultationBand
        image={images.courtyard}
        title="A first conversation."
        body="We will ask about the rooms and the timing before we speak of drawings. There is no obligation in a first meeting, only a clearer idea of what the house needs."
      />
    </>
  );
}
