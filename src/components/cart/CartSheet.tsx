"use client";

import { ArrowUpRightIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { CartPanel } from "@/components/cart/CartPanel";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  selectCartHasLoadedFromStorage,
  selectCartItemCount,
  useCartStore,
} from "@/store/cartStore";

export function CartSheet() {
  const hasLoadedFromStorage = useCartStore(selectCartHasLoadedFromStorage);
  const totalItems = useCartStore(selectCartItemCount);

  return (
    <Sheet>
      <SheetTrigger
        render={<Button className="relative" size="lg" variant="outline" />}
      >
        <ShoppingBagIcon data-icon="inline-start" />
        Cart
        {hasLoadedFromStorage && totalItems > 0 ? (
          <Badge className="ml-2" variant="secondary">
            {totalItems}
          </Badge>
        ) : null}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader className="flex flex-row items-center justify-between border-b border-border/70 px-4 py-4 pr-14">
          <SheetTitle className="sr-only">Cart drawer</SheetTitle>
          <Link
            className={buttonVariants({ size: "sm", variant: "ghost" })}
            href="/cart"
          >
            Open page
            <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </SheetHeader>
        <div className="flex-1 px-4 pb-4">
          <CartPanel compact />
        </div>
      </SheetContent>
    </Sheet>
  );
}
