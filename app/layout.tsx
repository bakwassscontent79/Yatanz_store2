import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import WhatsAppFloat from "@/components/whatsapp-float"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Yatanz: Chaos to Class - Home Organization & Storage Solutions",
  description:
    "Transform your space with premium racks, baskets, trolleys, and storage solutions. Quality home organization products for modern living.",
  keywords:
    "home organization, storage racks, baskets, trolleys, microwave stands, printer stands, umbrella stands, home decor, multipurpose storage, kitchen storage, inverter trolley, TV screen protector",
  authors: [{ name: "Yatanz" }],
  creator: "Yatanz",
  publisher: "Yatanz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yatanz.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yatanz: Chaos to Class - Home Organization & Storage Solutions",
    description:
      "Transform your space with premium racks, baskets, trolleys, and storage solutions. Quality home organization products for modern living.",
    url: "https://yatanz.com",
    siteName: "Yatanz",
    images: [
      {
        url: "/modern-organized-home-storage-solutions-clean-mini.png",
        width: 1200,
        height: 630,
        alt: "Yatanz Home Organization Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yatanz: Chaos to Class - Home Organization & Storage Solutions",
    description: "Transform your space with premium racks, baskets, trolleys, and storage solutions.",
    images: ["/modern-organized-home-storage-solutions-clean-mini.png"],
    creator: "@yatanz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Yatanz",
              alternateName: "Yatanz: Chaos to Class",
              url: "https://yatanz.com",
              logo: "https://yatanz.com/logo.png",
              description: "Premium home organization and storage solutions provider",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+919891638302",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: ["https://www.instagram.com/yatanz_chaos.to.class", "https://wa.me/+919891638302"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Yatanz",
              url: "https://yatanz.com",
              description: "Transform your space with premium racks, baskets, trolleys, and storage solutions",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://yatanz.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <style>{`
html {
  font-family: ${openSans.style.fontFamily};
  --font-sans: var(--font-open-sans);
  --font-serif: var(--font-montserrat);
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}
