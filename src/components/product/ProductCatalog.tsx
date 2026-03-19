"use client";

import { SearchXIcon, SparklesIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { filterProducts } from "@/lib/handle-cart";
import type { Product, ProductPriceBucket, ProductSortOption } from "@/types";

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [priceBucket, setPriceBucket] = useState<ProductPriceBucket>("all");
  const [sort, setSort] = useState<ProductSortOption>("featured");

  const filteredProducts = useMemo(
    () => filterProducts(products, query, priceBucket, sort),
    [priceBucket, products, query, sort],
  );

  const resetFilters = () => {
    setQuery("");
    setPriceBucket("all");
    setSort("featured");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <ProductFilters
        filteredCount={filteredProducts.length}
        onPriceBucketChange={setPriceBucket}
        onQueryChange={setQuery}
        onReset={resetFilters}
        onSortChange={setSort}
        priceBucket={priceBucket}
        query={query}
        sort={sort}
        totalCount={products.length}
      />

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <Empty className="rounded-[2rem] border border-dashed border-border/70 bg-card/80">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon />
            </EmptyMedia>
            <EmptyTitle className="font-display text-3xl">
              Nothing matches this pass.
            </EmptyTitle>
            <EmptyDescription className="max-w-md">
              Try a broader keyword, switch back to all prices, or reset the
              controls and scan the full catalog again.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center">
            <Button onClick={resetFilters}>
              <SparklesIcon data-icon="inline-start" />
              Reset discovery
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
