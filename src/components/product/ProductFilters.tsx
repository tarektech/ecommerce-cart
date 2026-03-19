"use client";

import {
  RefreshCcwIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productPriceBuckets, productSortOptions } from "@/lib/handle-cart";
import type { ProductPriceBucket, ProductSortOption } from "@/types";

interface ProductFiltersProps {
  query: string;
  priceBucket: ProductPriceBucket;
  sort: ProductSortOption;
  filteredCount: number;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onPriceBucketChange: (value: ProductPriceBucket) => void;
  onSortChange: (value: ProductSortOption) => void;
  onReset: () => void;
}

export function ProductFilters({
  query,
  priceBucket,
  sort,
  filteredCount,
  totalCount,
  onQueryChange,
  onPriceBucketChange,
  onSortChange,
  onReset,
}: ProductFiltersProps) {
  const selectedPriceBucket =
    productPriceBuckets.find((bucket) => bucket.value === priceBucket)?.label ??
    "All prices";
  const selectedSort =
    productSortOptions.find((option) => option.value === sort)?.label ??
    "Featured";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-[0_25px_80px_-48px_rgba(15,23,42,0.55)] backdrop-blur md:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{filteredCount} visible</Badge>
            </div>
          </div>
          <Button
            className="self-start"
            onClick={onReset}
            size="sm"
            variant="outline"
          >
            <RefreshCcwIcon data-icon="inline-start" />
            Reset
          </Button>
        </div>

        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel className="sr-only" htmlFor="catalog-search">
              Search products
            </FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                  className="h-12 bg-background/70"
                  id="catalog-search"
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder="Search products, notes, or descriptions..."
                  value={query}
                />
                <InputGroupAddon align="inline-end">
                  <SlidersHorizontalIcon />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Matching across <span className="font-bold text-primary">{totalCount}</span> sourced products. Use the dropdowns
                below for a quicker, less noisy refinement pass.
              </FieldDescription>
            </FieldContent>
          </Field>

          <div className="w-full">
            <div className="grid w-full gap-4 md:grid-cols-2">
              <Field
                className="rounded-[1.5rem] border border-border/70 bg-background/75 p-4 shadow-xs"
                orientation="vertical"
              >
                <FieldContent className="gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <FieldTitle>Price band</FieldTitle>
                      <FieldDescription>
                        Pick a range instead of scanning every ticket.
                      </FieldDescription>
                    </div>
                    <Badge variant="secondary">{selectedPriceBucket}</Badge>
                  </div>
                  <Select
                    items={productPriceBuckets}
                    onValueChange={(value) =>
                      onPriceBucketChange(
                        (value as ProductPriceBucket | null) ?? "all",
                      )
                    }
                    value={priceBucket}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-border/80 bg-card/80 px-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start" alignItemWithTrigger={false}>
                      <SelectGroup>
                        <SelectLabel>Price ranges</SelectLabel>
                        {productPriceBuckets.map((bucket) => (
                          <SelectItem key={bucket.value} value={bucket.value}>
                            {bucket.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field
                className="rounded-[1.5rem] border border-border/70 bg-background/75 p-4 shadow-xs"
                orientation="vertical"
              >
                <FieldContent className="gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <FieldTitle>Sort</FieldTitle>
                      <FieldDescription>
                        Re-order the grid without adding more visual noise.
                      </FieldDescription>
                    </div>
                    <Badge variant="outline">{selectedSort}</Badge>
                  </div>
                  <Select
                    items={productSortOptions}
                    onValueChange={(value) =>
                      onSortChange(
                        (value as ProductSortOption | null) ?? "featured",
                      )
                    }
                    value={sort}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-border/80 bg-card/80 px-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start" alignItemWithTrigger={false}>
                      <SelectGroup>
                        <SelectLabel>Sort order</SelectLabel>
                        {productSortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>
            </div>
          </div>
        </FieldGroup>
      </div>
    </div>
  );
}
