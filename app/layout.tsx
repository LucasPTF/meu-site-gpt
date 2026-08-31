import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { StoreProvider } from "./components/store-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "nordly-tech.example";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: { default: "Nordly — tecnologia que vale o preço", template: "%s | Nordly" },
    description: "Marca brasileira de curadoria internacional de tecnologia, com preço calculado e operação transparente.",
    openGraph: { title: "Nordly — tecnologia que vale o preço", description: "Curadoria brasileira de tecnologia global.", type: "website", locale: "pt_BR", images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "Nordly — tecnologia que vale o preço" }] },
    twitter: { card: "summary_large_image", title: "Nordly — tecnologia que vale o preço", description: "Curadoria brasileira de tecnologia global.", images: [new URL("/og.png", base).toString()] },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${geistSans.variable} ${geistMono.variable}`}><StoreProvider><Header />{children}<Footer /></StoreProvider></body></html>;
}
