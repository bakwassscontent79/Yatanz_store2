import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react"
import Link from "next/link"
import { getFeaturedProducts } from "@/lib/products"

export default function HomePage() {
  const featuredCategories = [
    {
      name: "Storage Baskets",
      description: "Multi-tier storage solutions for every space",
      image: "/modern-storage-baskets-organized-home.png",
      href: "/category/storage-baskets",
    },
    {
      name: "Kitchen Storage",
      description: "Organize your kitchen with style and efficiency",
      image: "/kitchen-storage-racks-modern-organized.png",
      href: "/category/kitchen-storage",
    },
    {
      name: "Trolleys & Stands",
      description: "Mobile storage and display solutions",
      image: "/modern-trolleys-and-stands-home-organization.png",
      href: "/category/trolleys",
    },
    {
      name: "Accessories",
      description: "Complete your organization setup",
      image: "/home-organization-accessories-modern-clean.png",
      href: "/category/accessories",
    },
  ]

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Shipping",
      description: "On orders above ₹999",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "Premium materials & construction",
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Always here to help you",
    },
  ]

  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-serif font-black text-foreground leading-tight">
                  From <span className="text-primary">Chaos</span>
                  <br />
                  to <span className="text-accent">Class</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Transform your space with premium home organization solutions. Discover our collection of racks,
                  baskets, trolleys, and storage accessories.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/category/storage-baskets">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 1000+ happy customers</span>
              </div>
            </div>

            <div className="relative">
              <img
                src="/modern-organized-home-storage-solutions-clean-mini.png"
                alt="Organized home storage solutions"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">Shop by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of home organization solutions, designed to bring order and style to
              every corner of your space.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto" asChild>
                      <Link href={category.href}>
                        Explore Collection
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <ProductGrid
            products={featuredProducts}
            title="Featured Products"
            description="Discover our most popular home organization solutions, carefully selected for their quality and customer satisfaction."
          />
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/category/storage-baskets">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold">Ready to Transform Your Space?</h2>
            <p className="text-lg opacity-90">
              Join thousands of satisfied customers who have already transformed their homes with our premium
              organization solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/category/storage-baskets">
                  Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
