# Quick Start Guide

## Local Development (No Docker)

### Prerequisites
- Node.js 18+ installed
- npm installed

### Steps

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```
   Or manually:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Run both services:**
   ```bash
   npm run dev
   ```
   This starts:
   - Backend on http://localhost:3001
   - Frontend on http://localhost:5173

3. **Open the app:**
   Navigate to http://localhost:5173

## Docker Mode

### Prerequisites
- Docker Desktop installed and running

### Steps

1. **Build and start containers:**
   ```bash
   docker compose up --build
   ```

2. **Open the app:**
   Navigate to http://localhost:8080

3. **Stop containers:**
   ```bash
   docker compose down
   ```

## Verification

### Test Backend Endpoints
```bash
# Health check
curl http://localhost:3001/health

# Get all products
curl http://localhost:3001/api/products

# Get specific product
curl http://localhost:3001/api/products/p1

# Test checkout
curl -X POST http://localhost:3001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"customer":{"email":"test@test.com"},"items":[{"id":"p1","qty":2}]}'
```

### Test Frontend Features
1. View product list at `/` or `/#/`
2. Click on a product to view details at `/#/product/:id`
3. Add items to cart
4. View cart at `/#/cart`
5. Edit quantities, remove items
6. Enter email and checkout
7. See order confirmation with order ID

## Project Structure
```
wow-webshop/
├── backend/              # Node.js + Express API
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── Dockerfile        # Backend container
├── frontend/             # React + Vite app
│   ├── src/
│   │   ├── App.jsx       # Main app with routing
│   │   ├── main.jsx      # Entry point
│   │   └── pages/        # Page components
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite config with proxy
│   ├── nginx.conf        # Nginx config for Docker
│   ├── package.json      # Frontend dependencies
│   └── Dockerfile        # Frontend container
├── docker-compose.yml    # Docker orchestration
├── package.json          # Root scripts
└── README.md             # Full specification
```
