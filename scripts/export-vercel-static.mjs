import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "vercel-static");
const baseUrl = process.env.NORDLY_EXPORT_URL || "http://localhost:4321";

const productsSource = await readFile(path.join(root, "app", "lib", "products.ts"), "utf8");
const productSlugs = [...productsSource.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
const routes = [
  "/",
  "/catalogo",
  "/pesquisa",
  "/politicas",
  "/rastrear",
  "/conta",
  "/carrinho",
  "/checkout",
  ...productSlugs.map((slug) => `/produto/${slug}`),
];

function makeStatic(html) {
  return html
    .replace(/<link[^>]+rel="modulepreload"[^>]*>/g, "")
    .replace(/<link[^>]+rel="preload"[^>]+as="image"[^>]*>/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/\s+srcSet="[^"]*"/g, "")
    .replace(/src="\/_next\/image\?url=([^&"]+)(?:&amp;|&)w=[^"]+"/g, (_, encodedUrl) => {
      return `src="${decodeURIComponent(encodedUrl)}"`;
    })
    .replace(/\s+data-nimg="[^"]*"/g, "")
    .replace(/<\/body>/, '<noscript>Esta versão pública funciona sem JavaScript.</noscript></body>');
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "dist", "client"), output, { recursive: true });

const nextStatic = path.join(output, "_next", "static");
await rm(path.join(nextStatic, "chunks"), { recursive: true, force: true });
for (const entry of await readdir(nextStatic, { withFileTypes: true })) {
  if (entry.isDirectory() && /^[0-9a-f-]{36}$/i.test(entry.name)) {
    await rm(path.join(nextStatic, entry.name), { recursive: true, force: true });
  }
}

for (const route of routes) {
  const response = await fetch(new URL(route, baseUrl));
  if (!response.ok) throw new Error(`Falha ao exportar ${route}: HTTP ${response.status}`);

  const destination = route === "/"
    ? path.join(output, "index.html")
    : path.join(output, route.slice(1), "index.html");

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, makeStatic(await response.text()), "utf8");
}

const notFound = await fetch(new URL("/pagina-inexistente", baseUrl));
await writeFile(path.join(output, "404.html"), makeStatic(await notFound.text()), "utf8");

console.log(`Exportação concluída: ${routes.length} páginas em vercel-static.`);
