import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "catalogo/index.html",
  "pesquisa/index.html",
  "products/gamesir-g7-se.png",
];

for (const file of requiredFiles) {
  await access(path.join(root, "vercel-static", file));
}

const homepage = await readFile(path.join(root, "vercel-static", "index.html"), "utf8");
if (!homepage.includes("Nordly") || homepage.includes("/_next/image?")) {
  throw new Error("A exportação estática da Nordly está incompleta.");
}

console.log("Versão pública da Vercel validada.");
