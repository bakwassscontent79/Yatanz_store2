import ProductCard from "./product-card"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
}

export default function ProductGrid({ products, title, description }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">{title}</h2>}
          {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
