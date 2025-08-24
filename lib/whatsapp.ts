export const WHATSAPP_NUMBER = "919999999999" // Replace with actual business WhatsApp number

export interface WhatsAppMessageOptions {
  productName?: string
  productPrice?: number
  customerName?: string
  customMessage?: string
  type?: "product_inquiry" | "general_inquiry" | "support" | "custom"
}

export function createWhatsAppMessage(options: WhatsAppMessageOptions = {}): string {
  const { productName, productPrice, customerName, customMessage, type = "general_inquiry" } = options

  let message = ""

  switch (type) {
    case "product_inquiry":
      message = `Hi! I want to buy this item: ${productName}${productPrice ? ` (₹${productPrice.toLocaleString()})` : ""}. Please tell me the availability and price.`
      break
    case "general_inquiry":
      message =
        "Hi! I am interested in your home organization products. Could you please provide more information about your catalog and pricing?"
      break
    case "support":
      message = "Hi! I need help with my order or have a question about your products. Could you please assist me?"
      break
    case "custom":
      message = customMessage || "Hi! I have a question about your products."
      break
    default:
      message = "Hi! I am interested in your products."
  }

  if (customerName) {
    message = `${message}\n\nMy name is ${customerName}.`
  }

  return message
}

export function createWhatsAppUrl(options: WhatsAppMessageOptions = {}): string {
  const message = createWhatsAppMessage(options)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(options: WhatsAppMessageOptions = {}): void {
  const url = createWhatsAppUrl(options)
  window.open(url, "_blank", "noopener,noreferrer")
}
