import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory product catalog
const products = [
  {
    id: 'p1',
    name: 'World of Warcraft: Dragonflight',
    price: 1299,
    currency: 'CZK',
    description: 'Explore the Dragon Isles and harness the power of the dragonflights in this epic expansion.',
    image: 'https://via.placeholder.com/400x300/4A90E2/ffffff?text=Dragonflight'
  },
  {
    id: 'p2',
    name: 'WoW Classic Season of Discovery',
    price: 399,
    currency: 'CZK',
    description: 'Experience Azeroth like never before with new runes and abilities in this seasonal adventure.',
    image: 'https://via.placeholder.com/400x300/7B68EE/ffffff?text=Season+of+Discovery'
  },
  {
    id: 'p3',
    name: 'WoW Game Time 60 Days',
    price: 599,
    currency: 'CZK',
    description: 'Continue your journey through Azeroth with 60 days of game time.',
    image: 'https://via.placeholder.com/400x300/FF6347/ffffff?text=Game+Time'
  },
  {
    id: 'p4',
    name: 'WoW Pet: Dottie',
    price: 249,
    currency: 'CZK',
    description: 'Adopt this adorable celestial companion to join you on your adventures.',
    image: 'https://via.placeholder.com/400x300/32CD32/ffffff?text=Pet+Dottie'
  }
];

// API Routes
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/checkout', (req, res) => {
  const { customer, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      ok: false,
      error: 'Cannot checkout with empty cart'
    });
  }

  if (!customer || !customer.email) {
    return res.status(400).json({
      ok: false,
      error: 'Customer email is required'
    });
  }

  // Calculate total
  let total = 0;
  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    if (product) {
      total += product.price * item.qty;
    }
  }

  // Generate random order ID
  const orderId = 'ORD-' + Math.random().toString(36).substring(2, 11).toUpperCase();

  res.json({
    ok: true,
    orderId,
    total,
    currency: 'CZK',
    message: `Order ${orderId} confirmed! Total: ${total} CZK. Confirmation sent to ${customer.email}`
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
