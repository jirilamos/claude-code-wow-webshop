# PRESENTATION_NOTES.md
## WOW Webshop — README-driven Claude Code demo

### Context
This demo shows how a complete working web application can be generated from a single README specification using Claude Code.

The goal is NOT to build a perfect webshop.
The goal is to demonstrate speed, clarity, and reproducibility.

---

## Demo setup (before the talk)
- Docker Desktop running
- Project already built once (`docker compose up --build`)
- Browser tabs prepared:
  - http://localhost:8080
  - http://localhost:3001/health
  - http://localhost:3001/api/products

---

## Talk flow (90 seconds)

### 1) Intro (10–15s)
> “This repository started with just one file: README.md.”  
> “No frontend, no backend, no Docker files.”  
> “Only a clear description of what we want to build.”

Key message:
- README defines **WHAT**
- Claude Code generates **HOW**

---

### 2) Architecture overview (10–15s)
> “Claude Code generated a clean separation:”  
> “React + Vite frontend, Node.js + Express backend.”  
> “Both are packaged with Docker Compose.”

Mention:
- Two services only
- No database, no auth — intentionally minimal

---

### 3) Live UI walkthrough (40–45s)

#### Product list
> “This is the product list, data comes from a real backend API.”

(open product detail)

#### Product detail
> “Simple detail page, clean routing, add to cart.”

(add item)

#### Cart
> “Cart state lives only in the frontend.”  
> “Quantity updates and total calculation are instant.”

#### Checkout
> “Checkout is a mock endpoint.”  
> “Backend calculates total and returns an orderId.”

(show confirmation)

---

### 4) API proof (10s)
(optional, fast)
- Open `/health`
- Open `/api/products`

> “This is not mocked UI — it’s a real API contract.”

---

### 5) Key takeaway (10–15s)
> “The important part is not the webshop.”  
> “The important part is how fast we went from idea to running system.”

Final message:
- Perfect for POCs
- Perfect for onboarding
- Perfect for validating architecture and contracts
- Production features can come later

---

## One-sentence summary (if interrupted)
> “This is a full-stack app generated from README and running in Docker with one command.”

---

## Optional closing (if time allows)
> “The same approach works for internal tools, admin UIs, or integration demos.”  
> “You decide the constraints — the AI handles the boilerplate.”

---

## Backup commands (if asked)
- `docker compose ps` → shows running services
- `docker compose logs --tail=40` → shows recent logs

---

## End
Thank the audience.
