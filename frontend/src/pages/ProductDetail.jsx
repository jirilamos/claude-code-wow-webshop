import React, { useState, useEffect } from 'react';

function ProductDetail({ productId, addToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

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
    detail: {
      display: 'flex',
      gap: '40px',
      marginTop: '20px',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    image: {
      width: '400px',
      height: '300px',
      objectFit: 'cover',
      borderRadius: '8px'
    },
    info: {
      flex: 1
    },
    name: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    price: {
      fontSize: '28px',
      color: '#e94560',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    description: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '30px',
      color: '#555'
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    error: {
      color: '#e94560',
      fontSize: '18px'
    }
  };

  if (loading) return <div style={styles.container}>Loading product...</div>;
  if (error) return (
    <div style={styles.container}>
      <a href="#/" style={styles.backLink}>← Back to Products</a>
      <div style={styles.error}>{error}</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <a href="#/" style={styles.backLink}>← Back to Products</a>
      <div style={styles.detail}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <h1 style={styles.name}>{product.name}</h1>
          <div style={styles.price}>{product.price} {product.currency}</div>
          <p style={styles.description}>{product.description}</p>
          <button
            style={styles.button}
            onClick={() => {
              addToCart(product);
              alert('Added to cart!');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
