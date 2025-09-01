import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ImageGallery from "@/components/image-gallery"
import RelatedProducts from "@/components/related-products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MessageCircle, Truck, Shield, RotateCcw, Star } from "lucide-react"
import { getProductById, products, categories } from "@/lib/products"
import { createWhatsAppUrl } from "@/lib/whatsapp"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const category = categories.find((cat) => cat.name === product.category)
  const categorySlug = category?.id || "products"

  const whatsappUrl = createWhatsAppUrl({
    type: "product_inquiry",
    productName: product.name,
    productPrice: product.price,
  })

  const savings = product.originalPrice ? product.originalPrice - product.price : 0
  const discountPercentage = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${categorySlug}`}>{product.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title & Category */}
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
                {product.subcategory}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.8/5 based on customer reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{discountPercentage}% OFF</Badge>
                  </>
                )}
              </div>
              {savings > 0 && <p className="text-sm text-green-600">You save ₹{savings.toLocaleString()}</p>}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {Object.keys(product.variants).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.tier && <Badge variant="outline">{product.variants.tier}</Badge>}
                  {product.variants.color && <Badge variant="outline">{product.variants.color}</Badge>}
                  {product.variants.shape && <Badge variant="outline">{product.variants.shape}</Badge>}
                  {product.variants.size && <Badge variant="outline">{product.variants.size}</Badge>}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <Button size="lg" className="w-full text-lg" disabled={!product.inStock} asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order via WhatsApp
                </a>
              </Button>

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-muted">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-muted">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Quality Guarantee</span>
                </div>
                <div className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-muted">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Technical Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.specifications.material && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="font-medium">{product.specifications.material}</span>
                </div>
              )}
              {product.specifications.dimensions && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="font-medium">{product.specifications.dimensions}</span>
                </div>
              )}
              {product.specifications.weight && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{product.specifications.weight}</span>
                </div>
              )}
              <Separator />
              <div>
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium ml-2">{product.category}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium ml-2">{product.subcategory}</span>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          {product.specifications.features && product.specifications.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.specifications.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} allProducts={products} />
      </main>

      <Footer />
    </div>
  )
}

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

// Generate metadata for each product page
export function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found - Yatanz",
    }
  }

  return {
    title: `${product.name} - Yatanz: Chaos to Class`,
    description: `${product.description} Shop now at Yatanz for premium home organization solutions.`,
    keywords: `${product.name.toLowerCase()}, ${product.category.toLowerCase()}, ${product.subcategory.toLowerCase()}, home organization, storage solutions, yatanz`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      type: "website",
    },
  }
}
