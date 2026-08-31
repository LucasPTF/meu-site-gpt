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
    description: "Loja de tecnologia com modelos verificáveis, filtros úteis e produtos escolhidos pelo que entregam.",
    openGraph: { title: "Nordly — tecnologia que vale o preço", description: "Tecnologia que vale cada real.", type: "website", locale: "pt_BR", images: [{ url: new URL("/og-v2.png", base).toString(), width: 1200, height: 630, alt: "Nordly — tecnologia que vale cada real" }] },
    twitter: { card: "summary_large_image", title: "Nordly — tecnologia que vale o preço", description: "Tecnologia que vale cada real.", images: [new URL("/og-v2.png", base).toString()] },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const showEnvironment = process.env.APP_ENV === "development" || process.env.APP_ENV === "staging";
  return <html lang="pt-BR"><body className={`${geistSans.variable} ${geistMono.variable}`}><StoreProvider><Header showEnvironment={showEnvironment} />{children}<Footer /></StoreProvider></body></html>;
}
