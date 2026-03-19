export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ProductPriceBucket =
  | "all"
  | "under-25"
  | "25-to-50"
  | "50-to-75"
  | "75-and-up";

export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "title";
