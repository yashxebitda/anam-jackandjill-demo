"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PersonaId } from "@/lib/personas";

type Status = "idle" | "connecting" | "live" | "error";

interface AvatarStageProps {
  personaId: PersonaId;
  displayName: string;
  // Suggested questions shown below the avatar as click-to-send fallback
  suggestedQuestions: string[];
}

export default function AvatarStage({
  personaId,
  displayName,
  suggestedQuestions,
}: AvatarStageProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Hold the Anam client instance so we can stop it on unmount and send messages
  const clientRef = useRef<any>(null);
  const hasGreetedRef = useRef(false);

  const startSession = useCallback(async () => {
    setStatus("connecting");
    setErrorMsg(null);

    try {
      // 1. Get a session token from our server (which holds the API key)
      const tokenResp = await fetch("/api/anam-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personaId }),
      });

      if (!tokenResp.ok) {
        const err = await tokenResp.json().catch(() => ({}));
        throw new Error(err.error || `Token request failed: ${tokenResp.status}`);
      }

      const { sessionToken, openingLine } = await tokenResp.json();

      // 2. Dynamically import the SDK (browser-only, can't run server-side)
      const { createClient, AnamEvent } = await import("@anam-ai/js-sdk");

      const anamClient = createClient(sessionToken, {
        disableInputAudio: false,
      });
      clientRef.current = anamClient;

      // 3. Wire connection events
      anamClient.addListener(AnamEvent.CONNECTION_ESTABLISHED, async () => {
        setStatus("live");
        if (
          !hasGreetedRef.current &&
          openingLine &&
          typeof anamClient.talk === "function"
        ) {
          hasGreetedRef.current = true;
          await anamClient.talk(openingLine);
        }
      });

      anamClient.addListener(AnamEvent.CONNECTION_CLOSED, (reason?: string) => {
        if (reason && reason !== "CONNECTION_CLOSED_CODE_NORMAL") {
          setErrorMsg(
            reason === "CONNECTION_CLOSED_CODE_MICROPHONE_PERMISSION_DENIED"
              ? "Microphone access was blocked. This demo is now set up to run without the mic, so try again."
              : `Anam closed the session: ${reason}`
          );
          setStatus("error");
          return;
        }
        setStatus("idle");
      });

      // 4. Start streaming to the video element
      await anamClient.streamToVideoElement("anam-video");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      console.error("Anam session failed:", err);
      setErrorMsg(msg);
      setStatus("error");
    }
  }, [personaId]);

  // Send a typed question to the avatar (fallback for users who don't want to speak)
  const sendMessage = useCallback(async (text: string) => {
    if (!clientRef.current || status !== "live") return;
    try {
      // Newer Anam SDK API for programmatic user input.
      // If the SDK exposes a different method (e.g. talk vs sendUserMessage),
      // adjust here, see docs.anam.ai/sdk-reference/user-messages
      if (typeof clientRef.current.sendUserMessage === "function") {
        await clientRef.current.sendUserMessage(text);
      } else if (typeof clientRef.current.talk === "function") {
        await clientRef.current.talk(text);
      }
    } catch (err) {
      console.warn("Failed to send message:", err);
    }
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      hasGreetedRef.current = false;
      if (clientRef.current?.stopStreaming) {
        clientRef.current.stopStreaming().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Video element, always mounted so the SDK can stream into it */}
      <div className="relative aspect-[3/4] sm:aspect-video w-full bg-ink/5 rounded-2xl overflow-hidden border border-ink/10">
        <video
          id="anam-video"
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Idle overlay */}
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/95 px-6 text-center">
            <p className="text-smoke text-sm uppercase tracking-widest mb-3">
              {displayName} is ready
            </p>
            <h3 className="font-display text-3xl sm:text-4xl text-ink mb-6 max-w-md leading-tight">
              Click below to start the conversation
            </h3>
            <button
              onClick={startSession}
              className="bg-ink text-cream px-8 py-4 rounded-full font-display text-lg hover:bg-terracotta transition-colors duration-200"
            >
              Meet {displayName}
            </button>
            <p className="text-smoke text-xs mt-4">
              Speak out loud once live, or use the suggested questions below.
            </p>
          </div>
        )}

        {/* Connecting overlay */}
        {status === "connecting" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/95">
            <div className="w-3 h-3 bg-terracotta rounded-full animate-pulse mb-4" />
            <p className="text-smoke font-display text-lg">
              Waking {displayName} up...
            </p>
          </div>
        )}

        {/* Error overlay */}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/95 px-6 text-center">
            <p className="text-terracotta text-sm uppercase tracking-widest mb-3">
              Couldn&apos;t connect
            </p>
            <p className="text-ink mb-4 max-w-md">
              {errorMsg || "Something went wrong reaching the Anam servers."}
            </p>
            <button
              onClick={startSession}
              className="bg-ink text-cream px-6 py-3 rounded-full font-display"
            >
              Try again
            </button>
          </div>
        )}

        {/* Live indicator (only when connected) */}
        {status === "live" && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-cream/90 backdrop-blur px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
            <span className="text-ink text-xs uppercase tracking-widest">
              {displayName} is live
            </span>
          </div>
        )}
      </div>

      {/* Suggested questions, visible once connected, click to send as user input */}
      {status === "live" && suggestedQuestions.length > 0 && (
        <div className="mt-6">
          <p className="text-smoke text-xs uppercase tracking-widest mb-3">
            Or try asking
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-sm bg-cream border border-ink/15 hover:border-terracotta hover:text-terracotta text-ink px-4 py-2 rounded-full transition-colors duration-200"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
