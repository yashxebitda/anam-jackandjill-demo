import { NextRequest, NextResponse } from "next/server";
import { getPersona } from "@/lib/personas";

/**
 * POST /api/anam-token
 * Body: { personaId: "jack" | "jill" }
 *
 * Exchanges the server-held ANAM_API_KEY for a short-lived session token
 * pre-configured with the requested persona. The token is what the client
 * uses to initialize the Anam SDK, never the raw API key.
 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANAM_API_KEY not configured on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const personaId = body?.personaId;
    const persona = getPersona(personaId);

    if (!persona) {
      return NextResponse.json(
        { error: `Unknown personaId: ${personaId}. Expected "jack" or "jill".` },
        { status: 400 }
      );
    }

    const anamResp = await fetch("https://api.anam.ai/v1/auth/session-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personaConfig: {
          personaId: persona.anamPersonaId,
          name: persona.displayName,
          systemPrompt: persona.systemPrompt,
        },
      }),
    });

    if (!anamResp.ok) {
      const errText = await anamResp.text();
      return NextResponse.json(
        { error: "Failed to get session token from Anam.", detail: errText },
        { status: anamResp.status }
      );
    }

    const data = await anamResp.json();
    return NextResponse.json({
      sessionToken: data.sessionToken,
      openingLine: persona.openingLine,
      displayName: persona.displayName,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
