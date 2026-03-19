import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { CartPanel } from "@/components/cart/CartPanel";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="flex flex-col gap-5 rounded-[2rem] border border-border/70 bg-card/70 p-6 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.45)]">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Standalone route</Badge>
          <Badge variant="secondary">Persistent cart view</Badge>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Cart overview
            </p>
            <h1 className="font-display text-5xl leading-[0.96] text-balance">
              Review everything in one calm, full-width pass.
            </h1>
          </div>
          <Link
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-all hover:bg-muted hover:text-foreground"
            href="/"
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Continue shopping
          </Link>
        </div>
      </section>

      <CartPanel />
    </main>
  );
}
