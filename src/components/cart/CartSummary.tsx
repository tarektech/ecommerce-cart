"use client";

import { CreditCardIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/handle-cart";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onClear: () => void;
}

export function CartSummary({
  totalItems,
  totalPrice,
  onClear,
}: CartSummaryProps) {
  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-card/90 p-5 shadow-[0_25px_80px_-52px_rgba(15,23,42,0.5)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Total items
          </p>
          <p className="mt-2 font-display text-4xl leading-none">
            {totalItems}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Total price
          </p>
          <p className="mt-2 font-display text-4xl leading-none">
            {formatCurrency(totalPrice)}
          </p>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex flex-col gap-3">
        <Button disabled={totalItems === 0} size="lg">
          <CreditCardIcon data-icon="inline-start" />
          Checkout
        </Button>
        <Button
          disabled={totalItems === 0}
          onClick={onClear}
          size="lg"
          variant="outline"
        >
          <Trash2Icon data-icon="inline-start" />
          Clear cart
        </Button>
      </div>
    </div>
  );
}
