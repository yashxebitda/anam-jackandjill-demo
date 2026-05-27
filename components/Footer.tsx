import Link from "next/link";

interface FooterProps {
  // Which persona to suggest in the "try the other one" CTA
  otherPersona?: "jack" | "jill" | null;
}

export default function Footer({ otherPersona = null }: FooterProps) {
  return (
    <footer className="py-20 sm:py-28 border-t border-ink/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-end">
        <div>
          <p className="text-smoke text-xs uppercase tracking-widest mb-3">
            Next step
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-ink leading-tight tracking-tightest">
            Want to see what this would<br />look like in your product?
          </h2>
        </div>
        <div className="flex flex-col sm:items-end gap-3">
          <a
            href="https://anam.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-cream px-6 py-3 rounded-full font-display text-lg hover:bg-terracotta transition-colors duration-200 inline-block"
          >
            Book a 15-min walkthrough
          </a>
          {otherPersona && (
            <Link
              href={`/${otherPersona}`}
              className="text-ink border border-ink/30 px-6 py-3 rounded-full font-display text-lg hover:border-terracotta hover:text-terracotta transition-colors duration-200 inline-block"
            >
              Meet {otherPersona === "jack" ? "Jack" : "Jill"} instead
            </Link>
          )}
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-ink/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-smoke text-sm">
        <p>
          A custom Anam demo built for Jack &amp; Jill.
        </p>
        <p>
          Powered by <a href="https://anam.ai" className="underline hover:text-terracotta">anam.ai</a>
        </p>
      </div>
    </footer>
  );
}
