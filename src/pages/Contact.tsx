import { CONTACT, images } from "@/data/site";
import InquiryForm from "@/components/InquiryForm";
import { ArchMotif } from "@/components/Logo";
import {
  ArrowLink,
  Caption,
  Figure,
  NumberedLabel,
  PageIntro,
  Reveal,
} from "@/components/primitives";

export default function Contact() {
  return (
    <>
      <PageIntro
        numeral="V"
        label="Contact"
        title={
          <>
            Begin with
            <br />
            <span className="italic">a room.</span>
          </>
        }
        lead="Commissions begin with a conversation, by appointment. Write to the concierge — a first note is enough; drawings are not required."
        meta={
          <div className="border-t border-line pt-4">
            <p className="label text-gold">Private consultation</p>
            <p className="mt-2 text-[0.8rem] font-light leading-relaxed text-ink/55">
              At the residence or by telephone.
              <br />
              Washington DC area &amp; worldwide.
            </p>
          </div>
        }
      />

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ── Concierge details ──────────────────── */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <NumberedLabel numeral="I">The concierge</NumberedLabel>
                <p className="mt-6 font-serif text-[1.6rem] font-light leading-[1.35] text-ink/80">
                  One point of contact, from the first note to the final
                  placement.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <dl className="mt-8 border-t border-line">
                  <div className="border-b border-line py-4">
                    <dt className="label text-ink/35">Email</dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="break-all font-serif text-[1.3rem] text-ink underline decoration-gold/50 decoration-1 underline-offset-4 transition-colors hover:text-gold"
                      >
                        {CONTACT.email}
                      </a>
                    </dd>
                  </div>
                  <div className="border-b border-line py-4">
                    <dt className="label text-ink/35">Telephone</dt>
                    <dd className="mt-2 text-[0.88rem] font-light text-ink/70">
                      {CONTACT.phone}
                    </dd>
                  </div>
                  <div className="border-b border-line py-4">
                    <dt className="label text-ink/35">Principal</dt>
                    <dd className="mt-2 text-[0.88rem] font-light text-ink/70">
                      {CONTACT.principal}
                    </dd>
                  </div>
                  <div className="border-b border-line py-4">
                    <dt className="label text-ink/35">The atelier</dt>
                    <dd className="mt-2 text-[0.88rem] font-light leading-relaxed text-ink/70">
                      Washington DC area
                      <br />
                      <span className="text-ink/45">
                        Consultations by appointment only
                      </span>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={140}>
                <div className="relative mt-8 overflow-hidden border border-line bg-ivory-deep/40 p-6">
                  <ArchMotif className="pointer-events-none absolute -right-12 -bottom-20 h-[15rem] w-[11rem] opacity-20" />
                  <p className="label text-gold">What to include</p>
                  <ul className="relative mt-4 space-y-2.5 text-[0.8rem] font-light leading-relaxed text-ink/60">
                    <li className="flex gap-3">
                      <span className="diamond mt-1.5 shrink-0" />
                      The rooms you are considering
                    </li>
                    <li className="flex gap-3">
                      <span className="diamond mt-1.5 shrink-0" />
                      The address or city, if known
                    </li>
                    <li className="flex gap-3">
                      <span className="diamond mt-1.5 shrink-0" />
                      Any timing you have in mind
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── Form ───────────────────────────────── */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="border-t border-gold/50 pt-7">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="label text-gold">Write to the atelier</p>
                    <h2 className="mt-3 font-serif text-[2.2rem] font-light leading-none md:text-[2.8rem]">
                      A consultation request
                    </h2>
                  </div>
                  <p className="label text-ink/30">All enquiries are confidential</p>
                </div>
                <p className="body-copy mt-4 max-w-lg">
                  Tell us what you have in mind. Your note goes directly to the
                  concierge, and is read personally.
                </p>
              </div>
              <div className="mt-8">
                <InquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The house, in place ──────────────────────── */}
      <section className="border-t border-line bg-ivory-deep/40">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <Figure
                src={images.courtyard}
                alt="An Italian villa courtyard with classical arcades and formal seating"
                ratio="aspect-[16/10]"
                caption="Between Italy and Washington · A house made in two places"
              />
            </Reveal>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <NumberedLabel numeral="II">At your service</NumberedLabel>
                <h2 className="display mt-6 text-[2.3rem] leading-[1.06] md:text-[2.8rem]">
                  Wherever the house is.
                </h2>
                <p className="body-copy mt-5">
                  Milano Villa is based in the Washington DC area and serves
                  clients across the United States and worldwide. Deliveries are
                  coordinated from our Italian workshops to the site, with fit-out
                  support throughout.
                </p>
                <div className="mt-7 border-t border-line pt-5">
                  <p className="label text-gold">Enquiries</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-2 block font-serif text-[1.3rem] underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold"
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div className="mt-7">
                  <ArrowLink to="/disciplines">Explore the disciplines</ArrowLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <div className="wrap py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="label text-ink/35">
              Milano Villa · Italian design &amp; furnishings
            </p>
            <Caption className="mt-0">
              Consultations by appointment only
            </Caption>
            <p className="label text-ink/35">{CONTACT.reach}</p>
          </div>
        </div>
      </div>
    </>
  );
}
