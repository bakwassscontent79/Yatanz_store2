"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createWhatsAppUrl } from "@/lib/whatsapp"

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  const quickActions = [
    {
      title: "Product Inquiry",
      description: "Ask about specific products",
      action: () => window.open(createWhatsAppUrl({ type: "product_inquiry" }), "_blank"),
    },
    {
      title: "General Questions",
      description: "Get help with anything",
      action: () => window.open(createWhatsAppUrl({ type: "general_inquiry" }), "_blank"),
    },
    {
      title: "Order Support",
      description: "Help with your orders",
      action: () => window.open(createWhatsAppUrl({ type: "support" }), "_blank"),
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Options Card */}
      {showOptions && (
        <Card className="mb-4 w-80 shadow-lg border-border animate-in slide-in-from-bottom-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">How can we help?</CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowOptions(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <div className="font-medium text-foreground">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </button>
            ))}
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">We typically respond within 5 minutes</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* WhatsApp Button */}
      <Button
        size="lg"
        className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        onClick={() => setShowOptions(!showOptions)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
