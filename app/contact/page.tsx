"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, ExternalLink } from "lucide-react"
import { createWhatsAppUrl } from "@/lib/whatsapp"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: "+91-XXXXXXXXXX",
      action: "tel:+91XXXXXXXXXX",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: "info@yatanz.com",
      action: "mailto:info@yatanz.com",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      details: "Your Business Address\nCity, State - PIN Code",
      action: null,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Business Hours",
      details: "Mon - Sat: 9:00 AM - 7:00 PM\nSun: 10:00 AM - 6:00 PM",
      action: null,
    },
  ]

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-5 w-5" />,
      url: createWhatsAppUrl({ type: "general_inquiry" }),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "#",
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      name: "Amazon Store",
      icon: <ExternalLink className="h-5 w-5" />,
      url: "#",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Flipkart Store",
      icon: <ExternalLink className="h-5 w-5" />,
      url: "#",
      color: "bg-blue-500 hover:bg-blue-600",
    },
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
              <BreadcrumbPage>Contact Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <section className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or need help with your order? We're here to help you transform your space
            from chaos to class.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        Thank you for your message! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        Sorry, there was an error sending your message. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{info.title}</h4>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{info.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                      {social.icon}
                      <span className="text-sm font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="bg-muted">
              <CardContent className="p-6 text-center space-y-4">
                <MessageCircle className="h-12 w-12 text-primary mx-auto" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Need Quick Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant responses to your questions via WhatsApp
                  </p>
                  <Button asChild className="w-full">
                    <a href={createWhatsAppUrl({ type: "general_inquiry" })} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions about our products and services.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What is your return policy?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day return policy for all products. Items must be in original condition with packaging.
                  Contact us for easy returns and exchanges.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Do you offer installation services?</h3>
                <p className="text-sm text-muted-foreground">
                  Most of our products are designed for easy self-assembly with included instructions. For complex
                  installations, we can recommend trusted local professionals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What are your shipping charges?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer free shipping on orders above ₹999. For orders below this amount, standard shipping charges
                  apply based on location and product weight.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Can I customize products?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer limited customization options for bulk orders. Contact us to discuss your specific
                  requirements and we'll do our best to accommodate them.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
