"use client"

import { useState, useMemo } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import SearchFilters, { type FilterOptions } from "@/components/search-filters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getProductsByCategory, categories } from "@/lib/products"
import { searchAndFilterProducts, type SearchOptions } from "@/lib/search"

interface CategoryPageClientProps {
  params: {
    slug: string
  }
}

export default function CategoryPageClient({ params }: CategoryPageClientProps) {
  const category = categories.find((cat) => cat.id === params.slug)

  if (!category) {
    notFound()
  }

  const allCategoryProducts = getProductsByCategory(params.slug)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SearchOptions["sortBy"]>("featured")

  // Initialize filters
  const maxPrice = Math.max(...allCategoryProducts.map((p) => p.price))
  const minPrice = Math.min(...allCategoryProducts.map((p) => p.price))

  const [filters, setFilters] = useState<FilterOptions>({
    categories: [category.name], // Pre-select current category
    priceRange: [minPrice, maxPrice],
    tiers: [],
    colors: [],
    shapes: [],
    sizes: [],
    inStockOnly: false,
  })

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const searchOptions: SearchOptions = {
      categories: filters.categories.length > 0 ? filters.categories : undefined,
      priceRange:
        filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice ? filters.priceRange : undefined,
      tiers: filters.tiers.length > 0 ? filters.tiers : undefined,
      colors: filters.colors.length > 0 ? filters.colors : undefined,
      shapes: filters.shapes.length > 0 ? filters.shapes : undefined,
      sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
      inStockOnly: filters.inStockOnly || undefined,
      sortBy,
    }

    return searchAndFilterProducts(allCategoryProducts, searchOptions)
  }, [allCategoryProducts, filters, sortBy, minPrice, maxPrice])

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
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category Header */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">{category.name}</h1>
              <p className="text-lg text-muted-foreground">{category.description}</p>
              <div className="text-sm text-muted-foreground">{filteredProducts.length} products available</div>
            </div>
            <div className="relative">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              products={allCategoryProducts}
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-muted-foreground">Showing {filteredProducts.length} results</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SearchOptions["sortBy"])}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
