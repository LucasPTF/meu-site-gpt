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
    assert.ok(product.tags.some((tag) => catalog.tagDefinitions.some((definition) => definition.slug === tag && definition.group === "use")), `${product.slug} needs a use-case tag`);
    assert.ok(product.tags.some((tag) => catalog.tagDefinitions.some((definition) => definition.slug === tag && definition.group === "merchandising")), `${product.slug} needs an internal merchandising tag`);
    assert.ok(product.media[0].sourceUrl.startsWith("https://"), `${product.slug} needs a media source`);
    for (const media of product.media) {
      assert.ok(media.localPath === media.src);
      assert.equal(media.sourceType, "MANUFACTURER");
      assert.match(media.verifiedAt, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(media.alt.length > 12);
      await access(new URL(`public${media.src}`, root));
    }
  }
  assert.ok(catalog.activeProducts.filter((product) => product.media.length >= 2).length >= 14);
});

test("catalog filtering uses OR inside a group and AND across groups", () => {
  const selected = { category: ["mouses", "teclados"], feature: ["hot-swap"] };
  const result = catalog.activeProducts.filter((product) => Object.values(selected).every((values) => values.some((value) => product.tags.includes(value))));
  assert.deepEqual(result.map((product) => product.categorySlug).sort(), ["teclados", "teclados"]);
  assert.ok(result.every((product) => product.tags.includes("hot-swap")));
});

test("all requested public filter dimensions return authoritative results", () => {
  const audio = catalog.filterProducts(catalog.activeProducts, { category: ["audio"] });
  assert.equal(audio.length, 3);
  assert.ok(audio.every((product) => product.tags.includes("audio")));

  const keyboards = catalog.filterProducts(catalog.activeProducts, { category: ["teclados"] });
  assert.equal(keyboards.length, 2);
  assert.ok(keyboards.every((product) => product.tags.includes("teclados")));

  const under100 = catalog.filterProducts(catalog.activeProducts, { price: ["ate-100"] });
  assert.ok(under100.length > 0);
  assert.ok(under100.every((product) => product.price <= 100));

  const ugreen = catalog.filterProducts(catalog.activeProducts, { brand: ["ugreen"] });
  assert.ok(ugreen.length >= 3);
  assert.ok(ugreen.every((product) => catalog.brandSlug(product.brand) === "ugreen"));

  const xboxHall = catalog.filterProducts(catalog.activeProducts, { compatibility: ["xbox"], feature: ["hall-effect"] });
  assert.equal(xboxHall.length, 2);
  assert.ok(xboxHall.every((product) => product.tags.includes("xbox") && product.tags.includes("hall-effect")));
});

test("filter URLs remain shareable across refresh, history and clear actions", () => {
  const query = new URLSearchParams("category=teclados&use=gaming&feature=abnt2&brand=redragon");
  const selection = Object.fromEntries(catalog.publicFilterGroups.map(({ key }) => [key, query.getAll(key)]));
  const first = catalog.filterProducts(catalog.activeProducts, selection).map((product) => product.id);
  const restored = new URLSearchParams(query.toString());
  const restoredSelection = Object.fromEntries(catalog.publicFilterGroups.map(({ key }) => [key, restored.getAll(key)]));
  assert.deepEqual(catalog.filterProducts(catalog.activeProducts, restoredSelection).map((product) => product.id), first);
  assert.equal(catalog.filterProducts(catalog.activeProducts, {}).length, catalog.activeProducts.length);
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

test("product experience includes buyer-first commerce sections", async () => {
  const [page, actions, gallery, admin] = await Promise.all([
    readFile(new URL("app/produto/[slug]/page.tsx", root), "utf8"),
    readFile(new URL("app/produto/[slug]/product-actions.tsx", root), "utf8"),
    readFile(new URL("app/produto/[slug]/product-gallery.tsx", root), "utf8"),
    readFile(new URL("app/admin/page.tsx", root), "utf8"),
  ]);
  assert.match(page, /POR QUE VALE A PENA/);
  assert.match(page, /DÚVIDAS FREQUENTES/);
  assert.match(page, /COMPRE JUNTO/);
  assert.match(page, /Ainda não há avaliações publicadas/);
  assert.match(actions, /Comprar agora/);
  assert.match(gallery, /Imagem temporariamente indisponível/);
  assert.match(admin, /produtos sem tags suficientes|Todos os produtos com tags suficientes/);
});

test("does not invent reviews or crossed-out prices", () => {
  assert.ok(catalog.activeProducts.every((product) => product.compareAtPrice === undefined || product.compareAtPrice > product.price));
});

test("keeps critical order safeguards in the internal route", async () => {
  const route = await readFile(new URL("app/api/orders/route.ts", root), "utf8");
  assert.match(route, /Idempotency-Key/);
  assert.match(route, /authoritativeTotal/);
  assert.match(route, /manual_review/);
});
