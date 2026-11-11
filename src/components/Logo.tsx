import { cn } from "@/utils/cn";

const GOLD = "#B08D57";

type Tone = "dark" | "light";

export function LogoMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn(tone === "light" ? "text-ivory" : "text-ink", className)}
      role="img"
      aria-label="Milano Villa arch monogram"
    >
      <g fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="square">
        <path d="M20 106V53A40 40 0 0 1 100 53V106" />
        <path d="M28 106V54A32 32 0 0 1 92 54V106" />
        <path d="M7 106H113" />
      </g>
      <text
        x="60"
        y="92"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="42"
        fontWeight="400"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        MV
      </text>
    </svg>
  );
}

export function LogoHorizontal({
  className,
  tone = "dark",
  compact = false,
}: {
  className?: string;
  tone?: Tone;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        tone === "light" ? "text-ivory" : "text-ink",
        className
      )}
      role="img"
      aria-label="Milano Villa — Italian Design and Furnishings"
    >
      <LogoMark
        tone={tone}
        className={cn("shrink-0", compact ? "h-8 w-8 md:h-9 md:w-9" : "h-9 w-9 sm:h-10 sm:w-10 md:h-[46px] md:w-[46px]")}
      />
      <span
        aria-hidden="true"
        className="mx-2.5 h-7 w-px shrink-0 bg-gold/65 sm:mx-3 sm:h-8 md:mx-4 md:h-10"
      />
      <span className="flex flex-col">
        <span
          className={cn(
            "whitespace-nowrap font-serif leading-none",
            compact
              ? "text-[14px] tracking-[0.12em] sm:text-[15px] sm:tracking-[0.14em]"
              : "text-[15.5px] tracking-[0.12em] sm:text-[18px] sm:tracking-[0.15em] md:text-[23px]"
          )}
        >
          MILANO VILLA
        </span>
        <span
          className={cn(
            "whitespace-nowrap font-label text-gold",
            compact
              ? "mt-1 text-[4.5px] tracking-[0.26em]"
              : "mt-1.5 text-[4.5px] tracking-[0.24em] sm:text-[5px] sm:tracking-[0.28em] md:text-[6.5px] md:tracking-[0.3em]"
          )}
        >
          ITALIAN DESIGN &amp; FURNISHINGS
        </span>
      </span>
    </span>
  );
}

export function LogoStacked({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        tone === "light" ? "text-ivory" : "text-ink",
        className
      )}
      role="img"
      aria-label="Milano Villa — Italian Design and Furnishings"
    >
      <LogoMark tone={tone} className="h-16 w-16 md:h-20 md:w-20" />
      <span className="mt-4 whitespace-nowrap font-serif text-[1.45rem] leading-none tracking-[0.2em] md:text-[1.7rem]">
        MILANO VILLA
      </span>
      <span className="mt-3 flex w-40 items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-gold/55" />
        <span className="diamond" />
        <span className="h-px flex-1 bg-gold/55" />
      </span>
      <span className="mt-3 font-label text-[6px] tracking-[0.36em] text-gold md:text-[7px]">
        ITALIAN DESIGN &amp; FURNISHINGS
      </span>
    </div>
  );
}

export function ArchMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      <path d="M28 414V150a132 132 0 0 1 264 0v264" stroke={GOLD} strokeOpacity="0.55" />
      <path d="M54 414V156a106 106 0 0 1 212 0v258" stroke={GOLD} strokeOpacity="0.32" />
      <path d="M4 414h312" stroke={GOLD} strokeOpacity="0.5" />
    </svg>
  );
}
