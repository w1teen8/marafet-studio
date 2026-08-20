import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { BookingProvider } from "@/components/providers/BookingProvider";
import BookingModal from "@/components/ui/BookingModal";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import Navbar from "@/components/layout/Navbar";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import StickyBookingButton from "@/components/layout/StickyBookingButton";
import settings from "@/data/settings.json";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://marafet-studio.com.ua";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marafet Studio — Салон краси в Боярці",
    template: "%s — MARAFET STUDIO",
  },
  description:
    "Marafet Studio — салон краси в Боярці. Манікюр, педикюр, брови, вії та макіяж. Запишіться на процедуру.",
  keywords: [
    "брови Боярка",
    "вії Боярка",
    "манікюр Боярка",
    "педикюр Боярка",
    "макіяж Боярка",
    "салон краси Боярка",
    "beauty studio Боярка",
    "MARAFET STUDIO",
  ],
  authors: [{ name: "MARAFET STUDIO" }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: "MARAFET STUDIO",
    title: "Marafet Studio — Салон краси в Боярці",
    description:
      "Marafet Studio — салон краси в Боярці. Манікюр, педикюр, брови, вії та макіяж. Запишіться на процедуру.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "MARAFET STUDIO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marafet Studio — Салон краси в Боярці",
    description:
      "Marafet Studio — салон краси в Боярці. Манікюр, педикюр, брови, вії та макіяж. Запишіться на процедуру.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE8",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: settings.brand,
  image:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop",
  description:
    "Салон краси в Боярці: манікюр, педикюр, брови, вії та макіяж.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Білогородська, 27",
    addressLocality: settings.city,
    postalCode: "08151",
    addressCountry: "UA",
  },
  telephone: settings.phone,
  url: SITE_URL,
  sameAs: [settings.instagramUrl, settings.facebookUrl],
  priceRange: "₴₴",
  openingHours: "Mo-Su 09:00-19:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: settings.rating,
    reviewCount: settings.reviewsCount,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-bg text-text-primary">
        <Loader />
        <BookingProvider>
          <SmoothScrollProvider>
            <ScrollProgressBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <StickyBookingButton />
          </SmoothScrollProvider>
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
