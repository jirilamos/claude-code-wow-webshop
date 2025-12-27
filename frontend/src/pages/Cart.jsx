import React, { useState } from 'react';

function Cart({ cart, updateCartQty, removeFromCart, clearCart }) {
  const [email, setEmail] = useState('');
  const [checkoutResult, setCheckoutResult] = useState(null);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setError('Cannot checkout with empty cart');
      return;
    }

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: { email },
          items: cart.map(item => ({ id: item.id, qty: item.qty }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Checkout failed');
        return;
      }

      setCheckoutResult(data);
      setError(null);
      clearCart();
      setEmail('');
    } catch (err) {
      setError('Checkout failed. Please try again.');
    }
  };

  const styles = {
    container: {
      padding: '20px'
    },
    backLink: {
      color: '#4CAF50',
      textDecoration: 'none',
      marginBottom: '20px',
      display: 'inline-block'
    },
    cart: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginTop: '20px'
    },
    empty: {
      textAlign: 'center',
      padding: '40px',
      color: '#888'
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderBottom: '1px solid #eee'
    },
    itemInfo: {
      flex: 1
    },
    itemName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    itemPrice: {
      color: '#666'
    },
    qtyControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    input: {
      width: '60px',
      padding: '6px',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    removeBtn: {
      padding: '6px 12px',
      backgroundColor: '#e94560',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    total: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'right'
    },
    checkoutSection: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '4px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold'
    },
    emailInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px'
    },
    checkoutBtn: {
      padding: '12px 24px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%'
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '20px',
      borderRadius: '4px',
      marginTop: '20px',
      border: '1px solid #c3e6cb'
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '12px',
      borderRadius: '4px',
      marginTop: '12px',
      border: '1px solid #f5c6cb'
    }
  };

  if (checkoutResult) {
    return (
      <div style={styles.container}>
        <a href="#/" style={styles.backLink}>← Back to Products</a>
        <div style={styles.success}>
          <h2>Order Confirmed!</h2>
          <p><strong>Order ID:</strong> {checkoutResult.orderId}</p>
          <p><strong>Total:</strong> {checkoutResult.total} {checkoutResult.currency}</p>
          <p>{checkoutResult.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <a href="#/" style={styles.backLink}>← Back to Products</a>
      <h2>Shopping Cart</h2>
      <div style={styles.cart}>
        {cart.length === 0 ? (
          <div style={styles.empty}>
            <p>Your cart is empty</p>
            <a href="#/" style={styles.backLink}>Start Shopping</a>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={styles.item}>
                <div style={styles.itemInfo}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemPrice}>{item.price} {item.currency}</div>
                </div>
                <div style={styles.qtyControl}>
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateCartQty(item.id, parseInt(e.target.value) || 1)}
                    style={styles.input}
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div style={styles.total}>
              Total: {total} CZK
            </div>
            <div style={styles.checkoutSection}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={styles.emailInput}
              />
              <button onClick={handleCheckout} style={styles.checkoutBtn}>
                Checkout (Mock)
              </button>
              {error && <div style={styles.error}>{error}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
