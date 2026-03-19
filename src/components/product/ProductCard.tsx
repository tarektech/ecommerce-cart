"use client";

import { ShoppingBagIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, getPriceBucketLabel } from "@/lib/handle-cart";
import { selectCartItemQuantity, useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, quantityInCart } = useCartStore(
    useShallow((state) => ({
      addItem: state.addItem,
      quantityInCart: selectCartItemQuantity(state, product.id),
    })),
  );
  const bucketLabel = getPriceBucketLabel(product.price);
  const cartBadgeLabel =
    quantityInCart > 0 ? `${quantityInCart} in cart` : `#${product.id}`;
  const addToCartLabel = quantityInCart > 0 ? "Add another" : "Add to cart";

  return (
    <Card
      className="h-full justify-between rounded-[1.75rem] border border-border/70 bg-card/90 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)] transition-transform duration-300 hover:-translate-y-1"
      size="sm"
    >
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="outline">{bucketLabel}</Badge>
          <Badge variant={quantityInCart > 0 ? "secondary" : "outline"}>
            {cartBadgeLabel}
          </Badge>
        </div>
        <CardTitle className="font-display text-xl leading-tight text-balance">
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Price
            </span>
            <span className="font-display text-3xl leading-none">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/60 pt-4">
        <Button
          className="w-full cursor-pointer transition-transform duration-150 active:translate-y-0.5 active:scale-[0.985]"
          onClick={() => addItem(product)}
          size="lg"
          variant={quantityInCart > 0 ? "secondary" : "default"}
        >
          <ShoppingBagIcon
            data-icon="inline-start"
            className="cursor-pointer"
          />
          {addToCartLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
