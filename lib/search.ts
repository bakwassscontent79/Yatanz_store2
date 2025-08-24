import type { Product } from "./products"

export interface SearchOptions {
  query?: string
  categories?: string[]
  priceRange?: [number, number]
  tiers?: string[]
  colors?: string[]
  shapes?: string[]
  sizes?: string[]
  inStockOnly?: boolean
  sortBy?: "name" | "price-low" | "price-high" | "newest" | "featured"
}

export function searchAndFilterProducts(products: Product[], options: SearchOptions = {}): Product[] {
  let filteredProducts = [...products]

  // Text search
  if (options.query && options.query.trim()) {
    const query = options.query.toLowerCase().trim()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        (product.specifications.features &&
          product.specifications.features.some((feature) => feature.toLowerCase().includes(query))),
    )
  }

  // Category filter
  if (options.categories && options.categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => options.categories!.includes(product.category))
  }

  // Price range filter
  if (options.priceRange) {
    const [minPrice, maxPrice] = options.priceRange
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)
  }

  // Tier filter
  if (options.tiers && options.tiers.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.variants.tier && options.tiers!.includes(product.variants.tier),
    )
  }

  // Color filter
  if (options.colors && options.colors.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.variants.color && options.colors!.includes(product.variants.color),
    )
  }

  // Shape filter
  if (options.shapes && options.shapes.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.variants.shape && options.shapes!.includes(product.variants.shape),
    )
  }

  // Size filter
  if (options.sizes && options.sizes.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.variants.size && options.sizes!.includes(product.variants.size),
    )
  }

  // Stock filter
  if (options.inStockOnly) {
    filteredProducts = filteredProducts.filter((product) => product.inStock)
  }

  // Sorting
  if (options.sortBy) {
    switch (options.sortBy) {
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "featured":
        filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
      case "newest":
        // For now, sort by featured then by name
        filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        })
        break
    }
  }

  return filteredProducts
}

export function getSearchSuggestions(products: Product[], query: string, limit = 5): string[] {
  if (!query.trim()) return []

  const suggestions = new Set<string>()
  const lowercaseQuery = query.toLowerCase()

  products.forEach((product) => {
    // Add product names that match
    if (product.name.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(product.name)
    }

    // Add categories that match
    if (product.category.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(product.category)
    }

    // Add subcategories that match
    if (product.subcategory.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(product.subcategory)
    }
  })

  return Array.from(suggestions).slice(0, limit)
}
