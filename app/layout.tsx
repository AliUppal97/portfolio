import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import "./globals.css"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: siteConfig.seo.siteName,
  description: siteConfig.seo.siteDescription,
  generator: 'v0.app',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || siteConfig.seo.siteUrl),
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.personal.name }],
  creator: siteConfig.personal.name,
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.seo.siteName,
    title: siteConfig.seo.siteName,
    description: siteConfig.seo.siteDescription,
    images: [{ url: siteConfig.seo.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.siteName,
    description: siteConfig.seo.siteDescription,
    images: [siteConfig.seo.ogImage],
    creator: siteConfig.seo.twitterHandle,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
