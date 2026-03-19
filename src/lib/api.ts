import { cache } from "react";

import { generatePrice } from "@/lib/handle-cart";
import type { Product } from "@/types";

const PRODUCTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

interface JsonPlaceholderPost {
  id: number;
  title: string;
  body: string;
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const response = await fetch(PRODUCTS_ENDPOINT, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Unable to load the product catalog.");
  }

  const posts = (await response.json()) as JsonPlaceholderPost[];

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.body,
    price: generatePrice(post.id),
  }));
});
