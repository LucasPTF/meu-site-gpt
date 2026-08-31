import type { MetadataRoute } from "next";
import { products } from "./lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://nordly-tech.example";
  return ["","/catalogo","/pesquisa","/politicas","/rastrear"].map(path=>({url:`${base}${path}`,changeFrequency:"weekly" as const,priority:path===""?1:.7})).concat(products.map(product=>({url:`${base}/produto/${product.slug}`,changeFrequency:"weekly" as const,priority:.8})));
}

