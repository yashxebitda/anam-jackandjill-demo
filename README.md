# What if Jack had a face?

A custom Anam demo built for **Jack & Jill** (London-based AI recruiting startup, $20M seed from Creandum, Oct 2025).

The demo is a live Anam avatar playing Jack (and Jill), pitching Jack & Jill the company on giving their two AI agents real faces. Recursive on purpose: the avatar IS what's being pitched.

Built as the Anam Growth Engineer take-home assessment.

---

## Setup (5 minutes)

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Anam API key

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and replace the placeholder with your actual key from [lab.anam.ai](https://lab.anam.ai):

```
ANAM_API_KEY=sk_live_xxxxxxxxxxxxxxxx
```

The key stays server-side. The client only ever sees short-lived session tokens.

### 3. Pick Anam personas for Jack and Jill

Open `lib/personas.ts`. You'll see two persona configs (`jack` and `jill`), each with an `anamPersonaId` from Anam Lab.

In the Anam Lab:

1. Create or open the published persona for Jack
2. Create or open the published persona for Jill
3. Copy each persona ID

Paste those IDs into `lib/personas.ts` as `anamPersonaId` values.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll see the landing page with the two persona cards. Click one to start.

> **Important:** the browser needs HTTPS for microphone access. `localhost` works because browsers treat it as secure. When you deploy, Vercel handles HTTPS automatically.

### 5. Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Add `ANAM_API_KEY` to your Vercel project's environment variables (Project Settings → Environment Variables), then redeploy.

Suggested production URL: `jack-with-a-face.vercel.app`

---

## Project structure

```
anam-jackandjill-demo/
├── app/
│   ├── page.tsx              # Landing page with hero + persona picker
│   ├── jack/page.tsx         # /jack route, Jack avatar experience
│   ├── jill/page.tsx         # /jill route, Jill avatar experience
│   └── api/anam-token/       # Server route: API key → session token
├── components/
│   ├── AvatarStage.tsx       # The Anam SDK integration (client component)
│   ├── WhyCards.tsx          # "Why this matters" section
│   └── Footer.tsx            # Footer with CTAs
└── lib/
    └── personas.ts           # Persona configs, the prompts ARE the demo
```

---

## Customizing the prompts

The system prompts in `lib/personas.ts` are where the real work lives. They establish:

- That the avatar is Jack/Jill **with a face** (the recursive angle)
- Specific facts about Jack & Jill the company so the avatar sounds informed
- Specific Anam stats so the pitch is grounded
- A recovery phrase for off-topic questions (the reliability layer)
- A "do not" list to keep the avatar in character

To tune tone or behavior, edit the `systemPrompt` fields. The shared context block is in `SHARED_CONTEXT` at the top of the file.

---

## Scaling this to 10/month

The whole codebase is structured around one swappable input: `lib/personas.ts`. To ship a new prospect:

1. Duplicate the persona config, swap in their company facts
2. Update the landing copy in `app/page.tsx`
3. Deploy to a new subdomain (e.g. `prospect.anam-demo.vercel.app`)

Once templated, each new page takes ~20-30 min including a human pass on the prompts. See `WHY.md` for the full scaling logic.

---

## What this demo doesn't do (and why)

- **No signup, no auth, no settings.** The brief said reduce friction. The avatar starts in two clicks.
- **No design polish beyond intentional brand match.** The brief explicitly said this wasn't being judged on polish.
- **No CMS for prompts.** Two-hour build. Config-driven is fast and good enough.
- **No analytics.** Out of scope for the timebox.

All of these are listed in `WHY.md` as next-week items in the scaling plan.
