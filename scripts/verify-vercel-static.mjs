import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredFiles = ["index.html", "catalogo/index.html", "pesquisa/index.html", "products/gamesir-g7-se.png"];
for (const file of requiredFiles) await access(path.join(root, "vercel-static", file));

const homepage = await readFile(path.join(root, "vercel-static", "index.html"), "utf8");
if (!homepage.includes("Nordly") || homepage.includes("/_next/image?")) throw new Error("A exportação estática da Nordly está incompleta.");
if (!homepage.includes("<script") || !homepage.includes("/_next/static/")) throw new Error("A exportação pública perdeu os recursos interativos da loja.");

async function collectHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(absolutePath));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolutePath);
  }
  return files;
}

for (const htmlFile of await collectHtmlFiles(path.join(root, "vercel-static"))) {
  const html = await readFile(htmlFile, "utf8");
  const stylesheets = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)];
  if (stylesheets.length === 0) throw new Error(`Página sem stylesheet: ${htmlFile}`);
  for (const [, stylesheet] of stylesheets) await access(path.join(root, "vercel-static", stylesheet.slice(1)));
}
console.log("Versão pública da Vercel validada com estilos e interatividade.");
