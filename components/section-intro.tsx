type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="text-xs uppercase tracking-[0.36em] text-stone-500">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-serif text-3xl font-semibold tracking-wide text-stone-900 md:text-5xl md:leading-[1.25]">
        {title}
      </h2>
      <p className="mt-6 text-base leading-8 text-stone-700 md:text-lg">
        {description}
      </p>
    </div>
  );
}
