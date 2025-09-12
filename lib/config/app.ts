import type { Metadata } from "next"

export const appConfig = {
  name: 'AppleGrove Advisory',
  description:
    'We help businesses and capital work better across markets, sectors, and stages.',
  url: 'https://applegroveadvisory.com',
  ogImage: '/assets/icons/applegrove-og.png',
} as const

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: ["Business consulting",
  "Strategic advisory",
  "Venture development",
  "Capital investment advisory",
  "Business growth solutions",
  "Corporate advisory services"],
  authors: [{ name: "AppleGrove Advsiory Team" }],
  creator: "AppleGrove Advisory Team",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: appConfig.url,
    title: appConfig.name,
    description: appConfig.description,
    siteName: appConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
    creator: "@AppleGroveAdvisory",
  },
}
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL

export const API_CONFIG = {
  baseURL: API_URL,
  timeout: 10000,
} as const

