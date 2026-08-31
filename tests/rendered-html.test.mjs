import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const catalog = await import(new URL("app/lib/products.ts", root));

test("ships the commercial Nordly storefront", async () => {
  const [page, layout, css, hosting] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"), readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"), readFile(new URL(".openai/hosting.json", root), "utf8"),
  ]);
  assert.match(page, /DESTAQUE DA SEMANA/);
  assert.match(page, /COMPRE POR CATEGORIA/);
  assert.match(layout, /lang="pt-BR"/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Starter Project/);
  assert.match(css, /@media \(max-width:520px\)/);
  assert.equal(JSON.parse(hosting).d1, "DB");
});

test("all active products are identifiable, tagged and illustrated", async () => {
  assert.equal(catalog.activeProducts.length, 15);
  for (const product of catalog.activeProducts) {
    assert.ok(product.brand !== "NORDLY", `${product.slug} cannot be a generic house SKU`);
    assert.ok(product.model.length > 1, `${product.slug} needs a model`);
    assert.ok(product.tags.includes(product.categorySlug), `${product.slug} needs a category tag`);
    assert.ok(product.tags.some((tag) => catalog.tagDefinitions.some((definition) => definition.slug === tag && definition.group === "type")), `${product.slug} needs a type tag`);
    assert.ok(product.tags.some((tag) => catalog.tagDefinitions.some((definition) => definition.slug === tag && definition.group === "price")), `${product.slug} needs a price tag`);
    assert.ok(product.media[0].sourceUrl.startsWith("https://"), `${product.slug} needs a media source`);
    await access(new URL(`public${product.image}`, root));
  }
});

test("catalog filtering uses OR inside a group and AND across groups", () => {
  const selected = { category: ["mouses", "teclados"], feature: ["hot-swap"] };
  const result = catalog.activeProducts.filter((product) => Object.values(selected).every((values) => values.some((value) => product.tags.includes(value))));
  assert.deepEqual(result.map((product) => product.categorySlug).sort(), ["teclados", "teclados"]);
  assert.ok(result.every((product) => product.tags.includes("hot-swap")));
});

test("search handles accents, product language and synonyms", () => {
  assert.ok(catalog.activeProducts.some((product) => catalog.matchesSearch(product, "audio microfone")));
  assert.ok(catalog.activeProducts.some((product) => catalog.matchesSearch(product, "memoria ram")));
  assert.equal(catalog.activeProducts.filter((product) => catalog.matchesSearch(product, "joystick xbox")).length, 2);
});

test("public pages do not expose internal commerce fields", async () => {
  const files = ["app/page.tsx", "app/catalogo/page.tsx", "app/components/product-card.tsx", "app/produto/[slug]/page.tsx", "app/pesquisa/page.tsx"];
  const source = (await Promise.all(files.map((file) => readFile(new URL(file, root), "utf8")))).join("\n");
  assert.doesNotMatch(source, /Margem pré-CAC|CAC máximo|supplierScore|operatingCost|Fornecedor principal|HERO product|CORE product/i);
  assert.doesNotMatch(source, /sandbox|dados simulados/i);
});

test("keeps critical order safeguards in the internal route", async () => {
  const route = await readFile(new URL("app/api/orders/route.ts", root), "utf8");
  assert.match(route, /Idempotency-Key/);
  assert.match(route, /authoritativeTotal/);
  assert.match(route, /manual_review/);
});
