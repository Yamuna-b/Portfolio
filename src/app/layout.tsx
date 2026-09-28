import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { PageBackground } from "@/components/page-background";
// Search is temporarily disabled; the command-palette component is retained.
// import { CommandPalette } from "@/components/command-palette";
import { SoundProvider } from "@/components/sound-provider";
import { BackToTop } from "@/components/back-to-top";
import { DomainGuardedAnalytics } from "@/components/domain-guarded-analytics";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Yamuna B | Backend & Cloud Engineer",
    template: `%s | Yamuna B`,
  },
  description: "Yamuna B - Backend / Cloud Engineer with AI specialization based in Madurai, India. Building practical software with FastAPI, Node.js, PostgreSQL, AWS, Docker, and GenAI.",
  keywords: ["Yamuna B", "Backend Engineer", "Cloud Engineer", "AWS", "FastAPI", "Node.js", "Python", "Docker", "PostgreSQL", "Software Engineer Madurai"],
  authors: [{ name: "Yamuna B" }],
  creator: "Yamuna B",
  publisher: "Yamuna B",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "Yamuna B | Backend & Cloud Engineer",
    description: "Backend / Cloud Engineer with AI specialization. Explore my projects, achievements, and open-source contributions.",
    url: DATA.url,
    siteName: "Yamuna B - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/yamuna_avatar.jpg`,
        width: 1200,
        height: 630,
        alt: "Yamuna B - Backend & Cloud Engineer"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yamuna B | Backend & Cloud Engineer',
    description: 'Backend / Cloud Engineer with AI specialization based in Madurai, India.',
    images: [`${DATA.url}/yamuna_avatar.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png?v=yamuna-photo", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png?v=yamuna-photo", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png?v=yamuna-photo", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-icon-57x57.png?v=yamuna-photo", sizes: "57x57", type: "image/png" },
      { url: "/favicons/apple-icon-60x60.png?v=yamuna-photo", sizes: "60x60", type: "image/png" },
      { url: "/favicons/apple-icon-72x72.png?v=yamuna-photo", sizes: "72x72", type: "image/png" },
      { url: "/favicons/apple-icon-76x76.png?v=yamuna-photo", sizes: "76x76", type: "image/png" },
      { url: "/favicons/apple-icon-114x114.png?v=yamuna-photo", sizes: "114x114", type: "image/png" },
      { url: "/favicons/apple-icon-120x120.png?v=yamuna-photo", sizes: "120x120", type: "image/png" },
      { url: "/favicons/apple-icon-144x144.png?v=yamuna-photo", sizes: "144x144", type: "image/png" },
      { url: "/favicons/apple-icon-152x152.png?v=yamuna-photo", sizes: "152x152", type: "image/png" },
      { url: "/favicons/apple-icon-180x180.png?v=yamuna-photo", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicons/android-icon-192x192.png?v=yamuna-photo",
      },
      {
        rel: "manifest",
        url: "/favicons/manifest.json",
      },
    ],
  },
  manifest: "/favicons/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yamuna B",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/favicons/ms-icon-144x144.png?v=yamuna-photo",
    "msapplication-config": "/favicons/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, "font-sans antialiased")}>
        {/* Background container */}
        <div className="fixed inset-0 z-[-1]">
          <PageBackground />
        </div>


        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto pt-20 sm:pt-24 pb-24 px-6">
          <DomainGuardedAnalytics gaId="G-XVF0SFD4GW" />
          <JsonLd />
          <ScrollProgress />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <SoundProvider>
              <TooltipProvider delayDuration={0}>
                {children}
                <Navbar />
                {/* <CommandPalette /> */}
                <BackToTop />
                <SmoothCursor />
              </TooltipProvider>
            </SoundProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}