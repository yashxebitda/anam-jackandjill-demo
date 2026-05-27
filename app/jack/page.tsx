import Link from "next/link";
import AvatarStage from "@/components/AvatarStage";
import WhyCards from "@/components/WhyCards";
import Footer from "@/components/Footer";
import { personas } from "@/lib/personas";

export default function JackPage() {
  const persona = personas.jack;

  const suggestedQuestions = [
    "Why a face instead of just voice?",
    "How fast could this ship?",
    "What about the candidate experience?",
    "Is this on-brand for us?",
  ];

  return (
    <main>
      {/* Header */}
      <header className="py-8 flex items-center justify-between border-b border-ink/10">
        <Link href="/" className="text-smoke text-xs uppercase tracking-widest hover:text-terracotta">
          ← Back
        </Link>
        <p className="text-smoke text-xs uppercase tracking-widest">
          Built for Jack &amp; Jill · For your candidates
        </p>
      </header>

      {/* Hero */}
      <section className="pt-16 sm:pt-20 pb-10 sm:pb-14">
        <p className="text-smoke text-xs uppercase tracking-widest mb-3">
          Meet Jack
        </p>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-ink leading-[0.95] tracking-tightest max-w-4xl">
          The version of Jack<br />
          <span className="italic text-terracotta">with a face</span>.
        </h1>
      </section>

      {/* Avatar stage */}
      <section className="pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-3">
          <AvatarStage
            personaId="jack"
            displayName={persona.displayName}
            suggestedQuestions={suggestedQuestions}
          />
        </div>
        <aside className="lg:col-span-2 lg:pt-6">
          <p className="text-smoke text-xs uppercase tracking-widest mb-3">
            What he&apos;ll open with
          </p>
          <blockquote className="font-display text-xl sm:text-2xl text-ink leading-snug border-l-2 border-terracotta pl-5 italic">
            &ldquo;{persona.openingLine}&rdquo;
          </blockquote>
          <p className="text-smoke text-sm mt-6 leading-relaxed">
            This Jack runs on Anam: real-time avatar, sub-second latency, the same conversational depth as the voice version you already shipped. Talk back, or tap a suggested question below the video.
          </p>
        </aside>
      </section>

      <WhyCards />

      <Footer otherPersona="jill" />
    </main>
  );
}
