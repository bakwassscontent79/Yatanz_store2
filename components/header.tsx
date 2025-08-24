"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Menu, X, ShoppingBag, Phone, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createWhatsAppUrl } from "@/lib/whatsapp"

const categories = [
  {
    name: "Storage Baskets",
    slug: "storage-baskets",
    subcategories: [
      { name: "Multipurpose Storage Basket", slug: "storage-baskets" },
      { name: "Metal Mesh Storage Basket", slug: "storage-baskets" },
      { name: "Wooden Type Basket", slug: "storage-baskets" },
    ],
  },
  {
    name: "Kitchen Storage",
    slug: "kitchen-storage",
    subcategories: [
      { name: "Kitchen Storage Rack", slug: "kitchen-storage" },
      { name: "Microwave Stand", slug: "kitchen-storage" },
    ],
  },
  {
    name: "Trolleys & Stands",
    slug: "trolleys",
    subcategories: [
      { name: "Single Inverter Trolley", slug: "trolleys" },
      { name: "Double Inverter Trolley", slug: "trolleys" },
      { name: "Printer Stand", slug: "trolleys" },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    subcategories: [
      { name: "Umbrella Stand", slug: "accessories" },
      { name: "TV Screen Protector", slug: "accessories" },
    ],
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const whatsappContactUrl = createWhatsAppUrl({ type: "general_inquiry" })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("[v0] Search query:", searchQuery.trim())
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              Contact: +91-XXXXXXXXXX
            </span>
            <a
              href={whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-accent transition-colors"
            >
              <MessageCircle className="h-3 w-3" />
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-accent transition-colors">
              <Instagram className="h-4 w-4" />
            </Link>
            <span>Free Shipping on Orders Above ₹999</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-serif font-black text-foreground">Yatanz</h1>
              <p className="text-xs text-muted-foreground font-medium">Chaos to Class</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="pl-10 pr-4"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-medium">
                    {category.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/category/${category.slug}`}>View All {category.name}</Link>
                  </DropdownMenuItem>
                  {category.subcategories.map((sub) => (
                    <DropdownMenuItem key={sub.name} asChild>
                      <Link href={`/category/${sub.slug}`}>{sub.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="pl-10 pr-4"
            />
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <Link
                    href={`/category/${category.slug}`}
                    className="font-semibold text-foreground px-2 py-1 block hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      href={`/category/${sub.slug}`}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
