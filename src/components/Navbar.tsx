import Link from "next/link";

import { CartSheet } from "@/components/cart/CartSheet";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link className="flex min-w-0 flex-col" href="/">
            <span className="truncate font-display text-2xl leading-none">
              Ecommerce Cart
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
