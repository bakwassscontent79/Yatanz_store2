"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
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
import { products } from "@/lib/products"
import { searchAndFilterProducts, type SearchOptions } from "@/lib/search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SearchOptions["sortBy"]>("featured")

  // Initialize filters
  const maxPrice = Math.max(...products.map((p) => p.price))
  const minPrice = Math.min(...products.map((p) => p.price))

  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [minPrice, maxPrice],
    tiers: [],
    colors: [],
    shapes: [],
    sizes: [],
    inStockOnly: false,
  })

  console.log("[v0] Search params:", searchParams.toString())
  console.log("[v0] Search query:", query)

  // Search and filter products
  const filteredProducts = useMemo(() => {
    const searchOptions: SearchOptions = {
      query,
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

    const results = searchAndFilterProducts(products, searchOptions)
    console.log("[v0] Search options:", searchOptions)
    console.log("[v0] Search results count:", results.length)
    console.log(
      "[v0] First few results:",
      results.slice(0, 3).map((p) => p.name),
    )

    return results
  }, [query, filters, sortBy, minPrice, maxPrice])

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
              <BreadcrumbPage>Search Results</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              products={products}
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
