# Anam Growth Engineer Take-Home: Jack & Jill Demo
**Candidate:** Yash Mundhra  
**Prospect:** Jack & Jill (London-based AI recruiting startup)  

---

## 1. The Strategy: Why Jack & Jill?
Jack & Jill is a high-signal prospect for Anam because **their product is already built around personified agents, but lacks the visual dimension.** 
* **The Hook:** They literally serve SVG avatars (`jackface.svg` and `jillface.svg`) on their site. Their candidate assistant is named "Jack" and their recruiter assistant is named "Jill." They've committed to a human-like persona but serve a voice-only experience. Anam allows us to say: *"You nailed the voice. Now give them a face."*
* **The Meta-Pitch:** The demo is self-referential. An Anam-powered Jack (or Jill) with an interactive face pitches the founders of Jack & Jill on giving their agents faces. This recursive hook is memorable, highly contextual, and takes seconds to understand.

---

## 2. Technical Architecture & UX Choices
The application is built using a modern, robust, and highly reliable stack:
* **Next.js 14 (App Router) & Tailwind CSS:** Selected to support clean, responsive styling that mirrors Jack & Jill's warm, editorial brand aesthetics (cream backgrounds, elegant serif typography, terracotta accents).
* **Secure Token Exchange:** The raw `ANAM_API_KEY` is strictly held on the server. The client requests a session token via `/api/anam-token`, which is dynamically generated and passed back. This keeps the integration production-ready and secure.
* **Suggested Questions (Mic-Free Mode):** To guarantee a flawless experience under review conditions (where microphone permissions might be blocked or users might be reluctant to speak), the SDK is initialized with `disableInputAudio: false`. Instead, users interact with a set of pre-seeded, high-context suggested questions which programmatically send text payloads to the avatar via `clientRef.talk()`.
* **Dynamic Content Layer (`lib/personas.ts`):** Centralizes both persona configurations, prompting instructions, and custom opening lines. This structure decouples the template code from the content layer, allowing extreme agility.

---

## 3. Scaling Blueprint: 10 to 1,000 Prospects
To scale this high-converting outbound motion, we structure the operational roadmap into three phases:

### Phase 1: 10 Demos/Month (Semi-Manual templating)
* **Execution:** A Growth Engineer spends ~25 minutes per prospect. We research their hook, copy their brand CSS tokens, swap persona text in `lib/personas.ts`, select matching avatar assets from Anam Lab, and push to a new Vercel subdomain.
* **Bottleneck:** Manual research and prompt engineering.

### Phase 2: 100 Demos/Month (Semi-Automated pipelines)
* **Execution:** Automate the research and enrichment. We feed a company URL to an LLM script that extracts the key value props, brand colors, and team names using APIs like Clearbit/Apollo. The script outputs the structured TS persona config. Vercel CLI automates branch deployments automatically.
* **Bottleneck:** Prompt testing and QA to prevent hallucinations.

### Phase 3: 1,000+ Demos/Month (Experimental Future Horizon)
* **Operational Vision:** Positioned as an experimental R&D direction. This phase leverages a centralized context pipeline to assemble dynamic prompts on-the-fly, backed by a **Context Verification & Freshness Layer** to automatically validate that funding facts and customer references are up-to-date. Output QA shifts to automated synthetic evaluations using a critic LLM to run test dialogues before deployment.

---

## 4. Key Learnings & Production Considerations

### A. Session Orchestration & Concurrency Lag
* **Observation:** WebRTC teardown can be asynchronous. If a user quickly switches routes from Jack to Jill, a brief concurrency lock can occur on shared API slots.
* **Production Resolution:** In a full-scale deployment, we would decouple session state from basic client route navigation by introducing a **Global Session Manager** (or routing via distinct per-user session IDs) to force immediate WebRTC connection termination and clean handshakes.

### B. Dynamic Context Assembler vs. Prompt Decay
* **Observation:** Hardcoded company intelligence (funding, team size, pricing) ages rapidly and introduces hallucination risks if scaled statically.
* **Production Resolution:** Implement a real-time data enrichment pipeline that queries company profiles on demand, passes the JSON through a strict Zod schema validator, and injects fresh, validated tokens into the prompt template dynamically.

### C. Adversarial Robustness & Safety Guardrails
* **Observation:** Outbound public-facing demos are highly vulnerable to prompt injections, system extraction, and adversarial inputs.
* **Production Resolution:** Before moving beyond prototype stage, we would layer output filtering firewalls (such as LlamaGuard or string-matching keyword lists) to prevent jailbreaks and ensure strict brand compliance.

### D. Jill Persona Calibration
* **Resolution:** Swapping the Jill persona was critical. The original female persona encountered an Anam Lab server error, which was successfully resolved by generating a fresh, healthy persona ID (`83e1a041-4003-43b6-85a5-7b68f91fc75a`).
