import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Yatanz: Chaos to Class",
  description:
    "Get in touch with Yatanz for questions about home organization products, orders, or support. Contact us via phone, email, or WhatsApp for quick assistance.",
  keywords: "contact yatanz, customer support, home organization help, product questions, order support",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
