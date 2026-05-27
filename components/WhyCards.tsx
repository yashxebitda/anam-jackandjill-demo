export default function WhyCards() {
  const cards = [
    {
      heading: "Trust scales with a face",
      body:
        "Your pitch is that AI can scale human trust. Anam's data: 70% of users prefer a face over voice or text. A face is the next step of the same bet.",
    },
    {
      heading: "Candidates engage with Jack longer",
      body:
        "Your reviews already say \"best conversation I've ever had with a recruiter.\" A face turns that quote into the default. +57% engagement, +44% retention vs voice-only.",
    },
    {
      heading: "Two agents, two faces, one stack",
      body:
        "You've already half-committed with the SVG icons. Anam ships them as real avatars in days, not quarters. Sam Coope built voice. The face is the next layer.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-ink/10">
      <p className="text-smoke text-xs uppercase tracking-widest mb-3">
        Why this matters
      </p>
      <h2 className="font-display text-3xl sm:text-5xl text-ink mb-12 max-w-2xl leading-tight tracking-tightest">
        Voice gets you started.<br />A face is what closes.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.heading} className="border-t border-ink pt-6">
            <h3 className="font-display text-xl text-ink mb-3 leading-snug">
              {card.heading}
            </h3>
            <p className="text-smoke text-base leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
