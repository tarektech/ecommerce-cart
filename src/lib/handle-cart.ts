import type { Product, ProductPriceBucket, ProductSortOption } from "@/types";

export const generatePrice = (id: number): number => {
  const base = ((id * 9301 + 49297) % 233280) / 233280;

  return Number((base * 90 + 9.99).toFixed(2));
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const productPriceBuckets: Array<{
  label: string;
  value: ProductPriceBucket;
}> = [
    { label: "All prices", value: "all" },
    { label: "Under $25", value: "under-25" },
    { label: "$25 to $50", value: "25-to-50" },
    { label: "$50 to $75", value: "50-to-75" },
    { label: "$75+", value: "75-and-up" },
  ];

export const productSortOptions: Array<{
  label: string;
  value: ProductSortOption;
}> = [
    { label: "Featured", value: "featured" },
    { label: "Price low", value: "price-asc" },
    { label: "Price high", value: "price-desc" },
    { label: "Title", value: "title" },
  ];

export const getPriceBucket = (price: number): ProductPriceBucket => {
  if (price < 25) {
    return "under-25";
  }

  if (price < 50) {
    return "25-to-50";
  }

  if (price < 75) {
    return "50-to-75";
  }

  return "75-and-up";
};

export const getPriceBucketLabel = (price: number) =>
  productPriceBuckets.find((bucket) => bucket.value === getPriceBucket(price))
    ?.label ?? "Curated";

export const matchesProductQuery = (product: Product, query: string) => {
  if (!query.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const haystack = `${product.title} ${product.description}`.toLowerCase();

  return haystack.includes(normalizedQuery);
};

export const filterProducts = (
  products: Product[],
  query: string,
  priceBucket: ProductPriceBucket,
  sort: ProductSortOption,
) => {
  const filtered = products.filter((product) => {
    if (!matchesProductQuery(product, query)) {
      return false;
    }

    if (priceBucket === "all") {
      return true;
    }

    return getPriceBucket(product.price) === priceBucket;
  });

  switch (sort) {
    case "price-asc":
      return filtered.toSorted((left, right) => left.price - right.price);
    case "price-desc":
      return filtered.toSorted((left, right) => right.price - left.price);
    case "title":
      return filtered.toSorted((left, right) =>
        left.title.localeCompare(right.title),
      );
    default:
      return filtered;
  }
};
