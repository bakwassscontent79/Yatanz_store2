import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Star, Users, Award, Truck, Shield, Heart } from "lucide-react"

export const metadata = {
  title: "About Us - Yatanz: Chaos to Class",
  description:
    "Learn about Yatanz mission to transform homes from chaos to class with premium organization solutions. Discover our story, values, and commitment to quality.",
  keywords: "about yatanz, home organization company, storage solutions, chaos to class, premium home products",
}

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality First",
      description:
        "We use only premium materials and rigorous quality control to ensure every product meets our high standards.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Focused",
      description:
        "Your satisfaction is our priority. We listen, adapt, and continuously improve based on your feedback.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for Organization",
      description:
        "We believe an organized space leads to an organized mind, and we are passionate about helping you achieve both.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Reliability",
      description:
        "Built on trust, we deliver on our promises with reliable products and exceptional customer service.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50+", label: "Product Varieties" },
    { number: "5 Years", label: "Industry Experience" },
    { number: "99%", label: "Customer Satisfaction" },
  ]

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
              <BreadcrumbPage>About Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Our Story
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
                  From <span className="text-primary">Chaos</span> to <span className="text-accent">Class</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Yatanz, we believe that every space has the potential to be transformed from chaotic clutter to
                  organized elegance. Founded with a simple mission: to help people create beautiful, functional spaces
                  that enhance their daily lives.
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Rated 4.9/5 by thousands of customers</span>
              </div>
            </div>

            <div className="relative">
              <img
                src="/modern-organized-home-storage-solutions-clean-mini.png"
                alt="Organized home transformation"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-serif font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="bg-muted border-border">
            <CardContent className="p-8 lg:p-12">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower individuals and families to transform their living spaces through innovative, high-quality
                  organization solutions. We strive to make home organization accessible, stylish, and sustainable,
                  helping our customers create spaces that truly reflect their lifestyle and values.
                </p>
                <div className="flex justify-center">
                  <Badge variant="outline" className="text-primary border-primary">
                    Transforming Lives, One Space at a Time
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and every product we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">Why Choose Yatanz?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Premium Quality Materials</h4>
                    <p className="text-muted-foreground text-sm">
                      Every product is crafted using high-grade materials that ensure durability and longevity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Thoughtful Design</h4>
                    <p className="text-muted-foreground text-sm">
                      Our products combine functionality with aesthetics to complement any home decor style.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Customer-Centric Approach</h4>
                    <p className="text-muted-foreground text-sm">
                      We listen to our customers and continuously improve our products based on real feedback.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Affordable Excellence</h4>
                    <p className="text-muted-foreground text-sm">
                      Premium quality doesn't have to break the bank. We offer competitive pricing without compromising
                      quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="/modern-storage-baskets-organized-home.png"
                alt="Storage baskets"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img
                src="/kitchen-storage-racks-modern-organized.png"
                alt="Kitchen storage"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img
                src="/modern-trolleys-and-stands-home-organization.png"
                alt="Trolleys and stands"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img
                src="/home-organization-accessories-modern-clean.png"
                alt="Organization accessories"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="mb-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 lg:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <Truck className="h-12 w-12 mx-auto" />
                  <h3 className="text-xl font-semibold">Fast & Free Shipping</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Free shipping on orders above ₹999. Quick delivery to your doorstep.
                  </p>
                </div>
                <div className="space-y-4">
                  <Shield className="h-12 w-12 mx-auto" />
                  <h3 className="text-xl font-semibold">Quality Guarantee</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    100% satisfaction guarantee with easy returns and exchanges.
                  </p>
                </div>
                <div className="space-y-4">
                  <Users className="h-12 w-12 mx-auto" />
                  <h3 className="text-xl font-semibold">24/7 Support</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Our customer support team is always ready to help you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
