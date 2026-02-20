import { Header } from "@/features/header";
import { Footer } from "@/features/footer";
import React from "react";
import { redirect } from "next/navigation";
import { getServerUser } from "@/shared/lib/auth";
import { EmailVerificationGuard } from "@/shared/components/EmailVerificationGuard";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  try {
    user = await getServerUser();
  } catch (err) {
    console.error("[PrivateLayout] Error cargando usuario:", err);
  }

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <Header initialUser={user} />
      <EmailVerificationGuard user={user}>
        {children}
        <Footer />
      </EmailVerificationGuard>
    </div>
  );
}