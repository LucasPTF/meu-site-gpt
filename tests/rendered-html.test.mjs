import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships the Nordly storefront instead of starter content", async () => {
  const [page, layout, products, css, hosting] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/lib/products.ts", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL(".openai/hosting.json", root), "utf8"),
  ]);
  assert.match(page, /Seu próximo upgrade/);
  assert.match(layout, /lang="pt-BR"/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Starter Project/);
  assert.equal((products.match(/role: "(?:HERO|CORE|COMPLEMENTAR)"/g) || []).length, 15);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.equal(JSON.parse(hosting).d1, "DB");
});

test("keeps critical commerce safeguards in the order route", async () => {
  const route = await readFile(new URL("app/api/orders/route.ts", root), "utf8");
  assert.match(route, /Idempotency-Key/);
  assert.match(route, /authoritativeTotal/);
  assert.match(route, /manual_review/);
  assert.match(route, /mode:\s*"sandbox"/);
});

