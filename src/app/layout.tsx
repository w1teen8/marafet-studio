import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import CursorProvider from "@/components/providers/CursorProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
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
    default: "MARAFET STUDIO — beauty-студія у Боярці",
    template: "%s — MARAFET STUDIO",
  },
  description:
    "MARAFET STUDIO — сучасна beauty-студія у Боярці. Манікюр, педикюр, стрижки, фарбування волосся та професійний догляд в одному просторі. Дипломовані майстри, преміальний сервіс, онлайн-запис.",
  keywords: [
    "манікюр Боярка",
    "педикюр Боярка",
    "фарбування Боярка",
    "стрижка Боярка",
    "beauty studio Боярка",
    "салон краси Боярка",
    "nail studio Боярка",
    "MARAFET STUDIO",
  ],
  authors: [{ name: "MARAFET STUDIO" }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: "MARAFET STUDIO",
    title: "MARAFET STUDIO — beauty-студія у Боярці",
    description:
      "Краса починається з турботи про себе. Манікюр, педикюр, стрижки, фарбування та професійний догляд у Боярці.",
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
    title: "MARAFET STUDIO — beauty-студія у Боярці",
    description:
      "Краса починається з турботи про себе. Манікюр, педикюр, стрижки, фарбування та професійний догляд у Боярці.",
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
  themeColor: "#F9F7F5",
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
    "Beauty-студія у Боярці: манікюр, педикюр, стрижки, фарбування волосся та професійний догляд.",
  address: {
    "@type": "PostalAddress",
    addressLocality: settings.city,
    addressCountry: "UA",
  },
  telephone: settings.phone,
  url: SITE_URL,
  sameAs: [settings.instagramUrl],
  priceRange: "₴₴",
  openingHours: "Mo-Su 09:00-20:00",
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
        <SmoothScrollProvider>
          <CursorProvider />
          <ScrollProgressBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyBookingButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
