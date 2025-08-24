import type { Metadata } from "next"
import type { Product } from "./products"

export function generateProductMetadata(product: Product): Metadata {
  const title = `${product.name} - Yatanz: Chaos to Class`
  const description = `${product.description} Price: ₹${product.price}. ${product.inStock ? "In Stock" : "Out of Stock"}.`

  return {
    title,
    description,
    keywords: `${product.name}, ${product.category}, ${product.subcategory}, home organization, storage solutions, yatanz`,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.images[0],
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
    },
  }
}

export function generateProductStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "Yatanz",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Yatanz",
      },
    },
    category: product.category,
    sku: product.id,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "127",
    },
  }
}
