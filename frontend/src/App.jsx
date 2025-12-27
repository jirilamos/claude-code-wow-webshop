import React, { useState, useEffect } from 'react';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addToCart = (product, qty = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prevCart, { ...product, qty }];
    });
  };

  const updateCartQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, qty } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const styles = {
    app: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#1a1a2e',
      color: 'white',
      borderRadius: '8px'
    },
    nav: {
      display: 'flex',
      gap: '20px'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      backgroundColor: '#16213e',
      cursor: 'pointer'
    },
    cartBadge: {
      backgroundColor: '#e94560',
      borderRadius: '50%',
      padding: '4px 8px',
      fontSize: '12px',
      marginLeft: '8px'
    }
  };

  let content;
  if (route === '#/' || route === '#/products' || route === '') {
    content = <ProductList addToCart={addToCart} />;
  } else if (route.startsWith('#/product/')) {
    const productId = route.split('/')[2];
    content = <ProductDetail productId={productId} addToCart={addToCart} />;
  } else if (route === '#/cart') {
    content = (
      <Cart
        cart={cart}
        updateCartQty={updateCartQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    );
  } else {
    content = <div>Page not found</div>;
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>WOW Webshop</h1>
        <nav style={styles.nav}>
          <a href="#/" style={styles.link}>Products</a>
          <a href="#/cart" style={styles.link}>
            Cart
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </a>
        </nav>
      </header>
      {content}
    </div>
  );
}

export default App;
