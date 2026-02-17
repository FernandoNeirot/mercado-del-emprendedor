"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/shared/configs/firebase";

export function EmailVerificationHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "verifying" | "done" | "error">("idle");

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");
    const continueUrl = searchParams.get("continueUrl");

    if (mode !== "verifyEmail" || !oobCode) return;

    let cancelled = false;
    queueMicrotask(() => setStatus("verifying"));

    (async () => {
      try {
        await applyActionCode(auth, oobCode);
        if (cancelled) return;
        setStatus("done");
        const params = new URLSearchParams();
        if (continueUrl) params.set("continueUrl", continueUrl);
        router.replace(`/auth/email-verified?${params.toString()}`);
      } catch (err) {
        if (cancelled) return;
        console.error("[EmailVerificationHandler] Error aplicando código:", err);
        setStatus("error");
        router.replace(`/auth/email-verified?error=1`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams, router]);

  if (status !== "verifying") return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center bg-slate-900/90 dark:bg-slate-950/90 p-4">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl px-8 py-6 text-center max-w-sm">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
            <span className="text-amber-600 dark:text-amber-400 text-lg">✉</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
            Verificando tu correo…
          </p>
        </div>
      </div>
    </div>
  );
}
