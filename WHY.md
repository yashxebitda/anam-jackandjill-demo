# Why this demo looks the way it looks

A running log of the decisions behind the Anam take-home, written so anyone reviewing the submission can see the reasoning, not just the output.

---

## 1. Why Jack & Jill as the prospect

Three reasons, in order of weight:

**The hook is in their codebase.** Their site literally serves `jackface.svg` and `jillface.svg` as button icons next to their two AI agents. They've named two products after people, given them gendered "faces" as flat SVGs, and shipped a voice-only product. Anam can give those icons real, talking faces. That's the entire pitch in one sentence, and it's grounded in a real product gap, not a fabricated one.

**Voice is their DNA, but the face is missing.** Sam Coope, their founding engineer, built the first neural voice agent at PolyAI in 2018. So the pitch isn't "you should add AI." It's "you nailed voice. Now do the face." That framing respects the company's actual technical depth and offers the next natural product layer rather than competing with what they already built.

**The recursion is the demo.** The Anam avatar plays Jack (or Jill). Jack-with-a-face is selling the idea of Jack-with-a-face to the people who built Jack-without-a-face. That's a single-line concept that lands in a 45-minute review call. It's also defensible under scrutiny because it's true.

Other candidates considered: Interviewer.AI (good but generic angle), Mercor (too established), Brighthire (smaller voice gap). Jack & Jill wins on hook specificity.

---

## 2. Why Next.js + Tailwind + Vercel

**Next.js (App Router):** Gives dynamic per-route prospect pages for free (`/jack`, `/jill`, eventually `/[prospect]`). The server route at `/api/anam-token` lives in the same project, so the API key stays server-side without standing up a separate backend. That makes deployment a single push.

**Tailwind:** The brief explicitly said no design polish. Tailwind lets the demo look intentional without writing a stylesheet. Utility classes also keep the component code self-documenting, which matters more in a scaffold someone else will read.

**Vercel:** One command deploy, automatic HTTPS (required for browser mic access), automatic preview URLs for iteration, free tier covers a take-home easily. The subdomain pattern (`prospect.anam-demo.vercel.app`) becomes the scaling story.

What was considered and rejected: plain HTML+JS (would have worked but no API route, so the API key leaks); React+Vite (no built-in API routes either, would have needed a separate Node server).

---

## 3. Why the persona configs are a single file

`lib/personas.ts` is the entire content layer of the demo. Avatar ID, voice ID, LLM choice, system prompt, opening line, all in one TypeScript object per persona. The page components and API route both import from it.

Reason: this is the file that gets swapped per prospect. Keeping it isolated means scaling to 10/month is "duplicate this object, change the strings, deploy." The pages don't need to change. The components don't need to change. The deployment doesn't need to change. Only the content.

This is the growth-engineer pattern: separate the template from the content, so the template is built once and the content is the thing you produce ten times.

---

## 4. Why the API key exchange happens server-side

Anam's docs are explicit that you should not expose your API key client-side. The pattern is: server holds the key, exchanges it for a short-lived session token, hands the token to the browser. The browser uses the token to initialize the SDK.

This demo follows that pattern via the `/api/anam-token` Next.js route. Even though this is a take-home, doing it the correct way signals production awareness, which is exactly what the brief is judging.

---

## 5. Why two avatars instead of one

The landing page offers Jack OR Jill. Both run the same component, same SDK setup, same fallback logic, only the persona config differs. That's intentional for three reasons:

1. **It proves the template scales.** One codebase, two prospects on day one. That's the visible answer to the "ship 10/month" question.
2. **It doubles the surface area.** The reviewer can pick the one they find more interesting and get a second take if the first feels weak.
3. **It lets the avatar voice match the persona.** Jack gets a warmer, slightly playful tone. Jill gets composed and strategic. Different voices for different B2B roles is a real Anam capability worth showing.

---

## 6. Why this aesthetic

The brand of Jack & Jill is warm, photographic, founder-style, serif-heavy. Their site uses `#f8f8f3` as the theme color and reads like a thoughtful editorial product, not a SaaS dashboard. So the demo matches: cream background, Fraunces serif typography, terracotta accent, generous whitespace, no gradients, no dark mode trickery.

This is what "built for THIS company" looks like at the visual layer. A reviewer at Jack & Jill should open this page and feel that someone understood their tone before they understood their tech.

Time spent on design: ~25 minutes. Most of that was font selection and color anchoring. Layout uses defaults.

---

## 7. Why the prompts are this long

The system prompts in `lib/personas.ts` look heavy for a 2-hour build. They are, deliberately.

The single highest risk in this kind of demo is the avatar going off-script, rambling, or breaking character. A 45-minute review will catch that immediately. So the prompts:

- Establish persona explicitly ("you are an Anam avatar playing Jack")
- Acknowledge the recursion ("this meta-situation is the demo, lean into it")
- Provide specific Jack & Jill facts to anchor against (raise, founders, customer logos, pricing)
- Provide specific Anam stats to use (don't hallucinate numbers)
- Provide a verbatim opening line
- Provide a verbatim recovery phrase for the fallback layer
- Include a "do not" list (no sycophancy, no pretending to be the real Jack, no pricing debates)
- Include style guidance ("use ellipses for pauses, occasional disfluency")

Prompt design isn't an afterthought to the build; it's the most leveraged single hour. Roughly 40-50 minutes of the timebox went here.

---

## 8. Why suggested questions are a fallback

Below the avatar video, once the session is live, the user sees 3-4 tappable suggested questions. They send as user messages via the SDK's `sendUserMessage` (or `talk`) API.

Reasons:

1. **Reliability layer.** Some reviewers won't grant microphone access on first load. The demo can't dead-end on a permission denial.
2. **Reduces conversation friction.** Even with a working mic, knowing what to ask is a friction point. Pre-seeded questions get the reviewer to the interesting part of the conversation faster.
3. **Demonstrates production awareness.** A reviewer reading the code sees "this person thought about the case where the happy path doesn't happen."

The brief's "Friction & experience" section asks where the journey friction is. This is one place the answer gets baked into the build itself.

---

## 9. Why the timebox went where it went

Approximate split for a ~2 hour build:

- ~50 min: prompt design and testing (highest-risk, done first)
- ~20 min: Jack & Jill research (already mostly done as part of the planning doc)
- ~40 min: scaffold, components, integration
- ~25 min: design polish to match brand
- ~10 min: README + WHY.md
- ~15 min: deploy + smoke test + iterate

If something runs over, design polish is the first thing cut. The brief said it wasn't being judged. The prompts and the structure are.

---

## 10. Why this scales to 10/month

Per-prospect work, once the template exists:

1. Research the prospect (~15 min): find their hook, their facts, their tone
2. Duplicate the persona config in `lib/personas.ts`, swap strings (~5 min)
3. Update the landing hero copy in `app/page.tsx` (~5 min)
4. Pick avatar + voice IDs from Anam Lab (~3 min)
5. Deploy to a new Vercel subdomain (~2 min)

Total: roughly 20-30 minutes per page including a human QA pass on the avatar's first conversation. That's 10 pages in a focused half-day, which is the answer to "ship 10/month."

Where the bottleneck moves at 100/month: research becomes the constraint. The fix is auto-enrichment from a company URL (Clearbit, Apollo, the prospect's own site) feeding a prompt template. The deploy step is already automated by Vercel CLI.

Where it moves at 1000/month: prompt QA becomes the constraint. The fix is a synthetic evaluation harness, automated conversations with a critic LLM rating "did the avatar stay in character, mention the right facts, avoid hallucinations." That removes the human pass from the critical path.

The reliability layer (fallback prompts, recovery phrase, suggested questions) doesn't change with scale. It's the same code everywhere.

---

## 11. What this demo deliberately doesn't have

- **No signup, no auth.** Reduces friction to two clicks (land → meet).
- **No analytics.** Out of scope for the timebox.
- **No CMS for prompts.** Config file is faster and good enough at this volume.
- **No mobile design beyond responsive breakpoints.** Tailwind defaults work fine.
- **No dark mode.** Wrong aesthetic for J&J's brand.
- **No A/B testing of opening lines.** Would be the first thing to add at production scale.

Each of these is a deliberate omission, not an oversight. They're the next-week items.
