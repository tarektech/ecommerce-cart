"use client";

import { ShoppingBagIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  selectCartPanelActions,
  selectCartPanelState,
  useCartStore,
} from "@/store/cartStore";

const cartSkeletonIds = [
  "cart-skeleton-1",
  "cart-skeleton-2",
  "cart-skeleton-3",
];

interface CartPanelProps {
  compact?: boolean;
}

export function CartPanel({ compact = false }: CartPanelProps) {
  const { hasLoadedFromStorage, items, totalItems, totalPrice } = useCartStore(
    useShallow(selectCartPanelState),
  );
  const { clearCart, decreaseQty, increaseQty, removeItem } = useCartStore(
    useShallow(selectCartPanelActions),
  );

  if (!hasLoadedFromStorage) {
    return (
      <div className="flex flex-col gap-4">
        {cartSkeletonIds.map((skeletonId) => (
          <Skeleton className="h-36 rounded-[1.5rem]" key={skeletonId} />
        ))}
        <Skeleton className="h-44 rounded-[1.75rem]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Empty className="rounded-[1.75rem] border border-dashed border-border/70 bg-card/75 px-6 py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingBagIcon />
          </EmptyMedia>
          <EmptyTitle className="font-display text-3xl">
            Cart is empty
          </EmptyTitle>
          <EmptyDescription className="max-w-sm">
            Add a few products from the catalog and the summary will start
            building itself here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Cart status
          </p>
          <p className="mt-2 font-display text-3xl leading-none">
            Ready to review
          </p>
        </div>
        <Badge variant="secondary">{totalItems} items</Badge>
      </div>
      <ScrollArea
        className={cn(
          "w-full",
          compact ? "h-[min(50vh,38rem)] pr-3" : "h-[min(56vh,42rem)] pr-3",
        )}
      >
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem
              item={item}
              key={item.id}
              onDecrease={decreaseQty}
              onIncrease={increaseQty}
              onRemove={removeItem}
            />
          ))}
        </div>
      </ScrollArea>
      <CartSummary
        onClear={clearCart}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
    </div>
  );
}
