import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      {/* Header */}
      <header className="py-8 flex items-center justify-between border-b border-ink/10">
        <p className="text-smoke text-xs uppercase tracking-widest">
          Built for Jack &amp; Jill
        </p>
        <p className="text-smoke text-xs uppercase tracking-widest">
          A custom Anam demo
        </p>
      </header>

      {/* Hero */}
      <section className="pt-16 sm:pt-28 pb-12 sm:pb-20">
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-ink leading-[0.95] tracking-tightest max-w-5xl">
          You named them Jack and Jill.<br />
          You gave them voices,<br />
          and <span className="italic text-terracotta">SVG faces</span>.
        </h1>
        <p className="font-display text-2xl sm:text-3xl text-smoke mt-10 max-w-2xl leading-snug">
          Here&apos;s what they look like with real ones.
        </p>
      </section>

      {/* Persona picker */}
      <section className="pb-24 sm:pb-32">
        <p className="text-smoke text-xs uppercase tracking-widest mb-6">
          Choose who to meet
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/jack"
            className="group border border-ink/15 hover:border-terracotta rounded-2xl p-8 sm:p-10 transition-colors duration-200"
          >
            <p className="text-smoke text-xs uppercase tracking-widest mb-4">
              For your candidates
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mb-3 leading-tight tracking-tightest">
              Meet Jack
            </h2>
            <p className="text-smoke text-lg leading-relaxed mb-6">
              Your AI career agent. Doing 10-minute conversations with 200,000 people without a face.
            </p>
            <span className="font-display text-ink group-hover:text-terracotta inline-flex items-center gap-2">
              Start the conversation
              <span aria-hidden>→</span>
            </span>
          </Link>

          <Link
            href="/jill"
            className="group border border-ink/15 hover:border-terracotta rounded-2xl p-8 sm:p-10 transition-colors duration-200"
          >
            <p className="text-smoke text-xs uppercase tracking-widest mb-4">
              For your companies
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mb-3 leading-tight tracking-tightest">
              Meet Jill
            </h2>
            <p className="text-smoke text-lg leading-relaxed mb-6">
              Your AI recruiter. Closing 10% fees for founders who&apos;ve never seen her.
            </p>
            <span className="font-display text-ink group-hover:text-terracotta inline-flex items-center gap-2">
              Start the conversation
              <span aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Why this is built */}
      <section className="py-12 sm:py-20 border-t border-ink/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div>
            <p className="text-smoke text-xs uppercase tracking-widest mb-4">
              Why this demo exists
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight tracking-tightest">
              Your founding engineer<br />built voice in 2018.
            </h2>
          </div>
          <div className="space-y-5 text-lg text-smoke leading-relaxed">
            <p>
              Sam Coope built the first neural voice agent at PolyAI seven years ago. You shipped Jack and Jill with that DNA, and 200,000 people are talking to them right now.
            </p>
            <p>
              The next layer is the face. Anam ships it in days, not quarters. This demo is a working preview.
            </p>
            <p className="text-ink font-display text-xl">
              Pick one above and have a chat.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-ink/10 flex flex-col sm:flex-row justify-between gap-3 text-smoke text-sm">
        <p>A custom Anam demo built for Jack &amp; Jill.</p>
        <p>
          Powered by{" "}
          <a href="https://anam.ai" className="underline hover:text-terracotta">
            anam.ai
          </a>
        </p>
      </footer>
    </main>
  );
}
