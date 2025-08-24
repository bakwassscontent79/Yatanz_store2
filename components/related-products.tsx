import ProductCard from "./product-card"
import type { Product } from "@/lib/products"

interface RelatedProductsProps {
  currentProduct: Product
  allProducts: Product[]
}

export default function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
  // Get related products from the same category, excluding current product
  const relatedProducts = allProducts
    .filter((product) => product.category === currentProduct.category && product.id !== currentProduct.id)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 border-t border-border">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">Related Products</h2>
          <p className="text-muted-foreground mt-2">More products from {currentProduct.category}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
