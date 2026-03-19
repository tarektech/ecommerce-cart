import { ProductCatalog } from "@/components/product/ProductCatalog";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(circle_at_top_left,rgba(180,102,48,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(14,116,144,0.14),transparent_34%)]" />
      <ProductCatalog products={products} />
    </main>
  );
}
