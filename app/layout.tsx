import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { JsonLd, EmailVerificationHandler } from "@/shared/components";
import { getDefaultStructuredData } from "@/shared/lib/structured-data";
import {
  getBaseUrl,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
  LOCALE,
} from "@/shared/configs/seo";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} - La red más grande de talento local`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: baseUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: LOCALE,
    url: baseUrl,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // Opcional: descomenta y rellena cuando tengas los códigos
    // google: "tu-codigo-google-search-console",
    // yandex: "tu-codigo-yandex",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <JsonLd data={getDefaultStructuredData()} />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme-preference') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 transition-colors duration-200`}
        suppressHydrationWarning
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <ThemeProvider>
          <Toaster richColors position="bottom-center" closeButton />
          <Suspense fallback={null}>
            <EmailVerificationHandler />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
