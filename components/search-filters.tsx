"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import type { Product } from "@/lib/products"

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  tiers: string[]
  colors: string[]
  shapes: string[]
  sizes: string[]
  inStockOnly: boolean
}

interface SearchFiltersProps {
  products: Product[]
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  isOpen: boolean
  onToggle: () => void
}

export default function SearchFilters({ products, filters, onFiltersChange, isOpen, onToggle }: SearchFiltersProps) {
  // Extract unique values from products
  const categories = [...new Set(products.map((p) => p.category))]
  const tiers = [...new Set(products.map((p) => p.variants.tier).filter(Boolean))]
  const colors = [...new Set(products.map((p) => p.variants.color).filter(Boolean))]
  const shapes = [...new Set(products.map((p) => p.variants.shape).filter(Boolean))]
  const sizes = [...new Set(products.map((p) => p.variants.size).filter(Boolean))]

  const maxPrice = Math.max(...products.map((p) => p.price))
  const minPrice = Math.min(...products.map((p) => p.price))

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: keyof FilterOptions, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [minPrice, maxPrice],
      tiers: [],
      colors: [],
      shapes: [],
      sizes: [],
      inStockOnly: false,
    })
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.tiers.length +
    filters.colors.length +
    filters.shapes.length +
    filters.sizes.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice ? 1 : 0)

  if (!isOpen) {
    return (
      <Button variant="outline" onClick={onToggle} className="mb-6 bg-transparent">
        <Filter className="h-4 w-4 mr-2" />
        Filters
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleArrayFilter("categories", category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Price Range</h4>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
              max={maxPrice}
              min={minPrice}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Tiers */}
        {tiers.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Tiers</h4>
            <div className="space-y-2">
              {tiers.map((tier) => (
                <div key={tier} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tier-${tier}`}
                    checked={filters.tiers.includes(tier)}
                    onCheckedChange={() => toggleArrayFilter("tiers", tier)}
                  />
                  <Label htmlFor={`tier-${tier}`} className="text-sm">
                    {tier}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Colors</h4>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => toggleArrayFilter("colors", color)}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shapes */}
        {shapes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Shapes</h4>
            <div className="space-y-2">
              {shapes.map((shape) => (
                <div key={shape} className="flex items-center space-x-2">
                  <Checkbox
                    id={`shape-${shape}`}
                    checked={filters.shapes.includes(shape)}
                    onCheckedChange={() => toggleArrayFilter("shapes", shape)}
                  />
                  <Label htmlFor={`shape-${shape}`} className="text-sm">
                    {shape}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Sizes</h4>
            <div className="space-y-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={() => toggleArrayFilter("sizes", size)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stock Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Availability</h4>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) => updateFilter("inStockOnly", checked)}
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
