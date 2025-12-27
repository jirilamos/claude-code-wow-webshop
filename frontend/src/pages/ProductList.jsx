import React, { useState, useEffect } from 'react';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      padding: '20px'
    },
    searchInput: {
      width: '100%',
      maxWidth: '600px',
      padding: '12px 16px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginTop: '12px',
      boxSizing: 'border-box'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '4px',
      marginBottom: '12px'
    },
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    price: {
      fontSize: '20px',
      color: '#e94560',
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold'
    }
  };

  if (loading) return <div style={styles.container}>Loading products...</div>;
  if (error) return <div style={styles.container}>{error}</div>;

  // Filter products based on search term (case-insensitive)
  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase();
    return product.name.toLowerCase().includes(search) ||
           product.description.toLowerCase().includes(search);
  });

  return (
    <div style={styles.container}>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search products by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <div style={styles.grid}>
        {filteredProducts.map(product => (
          <div key={product.id} style={styles.card}>
            <div onClick={() => window.location.hash = `#/product/${product.id}`}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <div style={styles.name}>{product.name}</div>
              <div style={styles.price}>{product.price} {product.currency}</div>
            </div>
            <button
              style={styles.button}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                alert('Added to cart!');
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
