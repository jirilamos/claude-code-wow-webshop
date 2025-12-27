# Varianta C — Enterprise twist: z demo skeletonu na produkční základ
Cíl

Zachovat rychlost a jednoduchost, ale přidat produkční pilíře: data, validace, prostředí, bezpečnost, observabilita, CI/CD.

## C1) Data & persistence (DB)

Co přidat

Prisma + SQLite pro dev (rychlé), Postgres pro prod (typicky)

Migrace + seed produktů

Výsledek

Produkty už nejsou hardcoded

Checkout může ukládat orders

Mantinely

pořád jednoduché schéma:

Product(id, name, price, currency, description, image)

Order(id, email, total, currency, createdAt)

OrderItem(orderId, productId, qty, unitPrice)

## C2) API kontrakt & validace

Co přidat

Validace requestů (např. zod / joi)

Jednotné error response:

{ error: { code, message, details? } }

Výsledek

Stabilní API pro frontend i budoucí integrace

Méně “random bugů” z špatných payloadů

## C3) Konfigurace přes prostředí

Co přidat

.env.example + environment variables:

PORT

DATABASE_URL

NODE_ENV

CORS_ORIGINS (pro dev)

V Docker Compose používat env vars

Výsledek

dev/stage/prod jedou stejný kód, jiné configy

## C4) Security minimum (bez přehánění)

Co přidat

helmet (základní HTTP headers)

rate limit pro checkout (anti-spam)

v prod režimu vypnout CORS “*” a používat proxy přes nginx

Výsledek

demo se nezmění, ale app je “ne trapná” pro enterprise

## C5) Observabilita (logy + health)

Co přidat

strukturované logy (pino/winston)

rozšířený /health:

{ ok: true, db: "ok", version: "x.y.z" }

volitelně /metrics (Prometheus), ale až později

Výsledek

když něco spadne, víš proč během 10 sekund

## C6) CI/CD (GitHub Actions)

Co přidat

workflow:

npm ci

lint + unit tests

build frontend

build docker images

volitelně: push image do registry

Výsledek

“green pipeline” = důvěryhodný main branch

## C7) Frontend produkční úroveň

Co přidat

state management jen pokud roste (zatím stačí context)

error boundary, “toast” notifikace, lepší empty states

e2e smoke test (Playwright) na 2 scénáře:

list → detail

add → cart → checkout

## Doporučená roadmapa (nejlepší poměr WOW / práce)

Prisma + SQLite + seed

Validace + error model

GitHub Actions build/test

Security minimum (helmet + rate limit)

Orders persistence (ukládání checkoutů)

Jak to říct v jedné větě v prezentaci

“Variant C turns the demo into a production-ready baseline: DB, validation, config, security, observability, and CI/CD — without changing the user flow.”