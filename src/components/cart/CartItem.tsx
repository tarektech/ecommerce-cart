"use client";

import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/handle-cart";
import type { CartItem as CartProduct } from "@/types";

interface CartItemProps {
  item: CartProduct;
  onDecrease: (id: number) => void;
  onIncrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="rounded-[1.5rem] border border-border/70 bg-card/80 p-4 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.65)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xl leading-tight">
            {item.title}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatCurrency(item.price)} each
          </p>
        </div>
        <Button
          aria-label={`Remove ${item.title}`}
          onClick={() => onRemove(item.id)}
          size="icon-sm"
          variant="ghost"
        >
          <Trash2Icon />
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            aria-label={`Decrease quantity for ${item.title}`}
            onClick={() => onDecrease(item.id)}
            size="icon-sm"
            variant="outline"
          >
            <MinusIcon />
          </Button>
          <div className="min-w-10 text-center text-sm font-medium">
            {item.quantity}
          </div>
          <Button
            aria-label={`Increase quantity for ${item.title}`}
            onClick={() => onIncrease(item.id)}
            size="icon-sm"
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Line total
          </p>
          <p className="font-display text-2xl leading-none">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
