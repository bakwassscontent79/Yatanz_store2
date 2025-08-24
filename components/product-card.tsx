import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Eye } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/products"
import { createWhatsAppUrl } from "@/lib/whatsapp"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = createWhatsAppUrl({
    type: "product_inquiry",
    productName: product.name,
    productPrice: product.price,
  })

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              Save ₹{product.originalPrice - product.price}
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>

          {/* Variants */}
          <div className="flex flex-wrap gap-1">
            {product.variants.tier && (
              <Badge variant="outline" className="text-xs">
                {product.variants.tier}
              </Badge>
            )}
            {product.variants.color && (
              <Badge variant="outline" className="text-xs">
                {product.variants.color}
              </Badge>
            )}
            {product.variants.shape && (
              <Badge variant="outline" className="text-xs">
                {product.variants.shape}
              </Badge>
            )}
            {product.variants.size && (
              <Badge variant="outline" className="text-xs">
                {product.variants.size}
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1" disabled={!product.inStock} asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/product/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
