import CategoryPageClient from "./CategoryPageClient"
import { categories } from "@/lib/products"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryPageClient params={params} />
}

// Generate static params for all categories
export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.id,
  }))
}

// Generate metadata for each category page
export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((cat) => cat.id === params.slug)

  if (!category) {
    return {
      title: "Category Not Found - Yatanz",
    }
  }

  return {
    title: `${category.name} - Yatanz: Chaos to Class`,
    description: `Shop ${category.name.toLowerCase()} at Yatanz. ${category.description}`,
    keywords: `${category.name.toLowerCase()}, home organization, storage solutions, yatanz`,
  }
}
