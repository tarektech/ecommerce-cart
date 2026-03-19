import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Manrope } from "next/font/google";
import Script from "next/script";

import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

import "./globals.css";

const themeScript = `
  (function () {
    try {
      var storageKey = "aqavia-theme";
      var storedTheme = window.localStorage.getItem(storageKey);
      var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      var theme =
        storedTheme === "dark" || storedTheme === "light"
          ? storedTheme
          : systemTheme;
      var root = document.documentElement;
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
    } catch (error) {}
  })();
`;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-ui",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AQAVIA Ecommerce Cart",
  description:
    "A curated Next.js storefront with product discovery and a persistent cart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        manrope.variable,
        fraunces.variable,
        geistMono.variable,
        "font-sans antialiased",
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <div className="relative min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
