import React, { useState, useEffect } from 'react';
import Search from './Search';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for form inputs
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Handle product submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new product object
    const productToAdd = {
      name: newProduct.name,
      image: newProduct.image,
      price: newProduct.price,
      inStock: true,  // New product is by default In Stock
    };

    // Add product to the list (optimistically update the UI)
    setProducts([...products, productToAdd]);

    // Clear the form
    setNewProduct({ name: '', image: '', price: '' });

    // Send the new product to the server
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productToAdd),
    })
      .then(response => response.json())
      .then(data => console.log('Product added:', data))
      .catch(error => console.log('Error adding product:', error));
  };

  // Toggle the "In Stock" status
  const toggleStockStatus = (id) => {
    const updatedProducts = products.map(product => 
      product.id === id 
        ? { ...product, inStock: !product.inStock } 
        : product
    );
    setProducts(updatedProducts);

    // Optionally update the server status
    const updatedProduct = updatedProducts.find(product => product.id === id);
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: updatedProduct.inStock }),
    })
      .then(response => response.json())
      .catch(error => console.log('Error updating stock status:', error));
  };

  // Delete product function
  const deleteProduct = (id) => {
    // Remove the product from the local state
    setProducts(products.filter(product => product.id !== id));

    // Send the DELETE request to the json-server
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => console.log(`Product with id ${id} deleted`))
      .catch(error => console.log('Error deleting product:', error));
  };

  return (
    <div className="product-page">
      <h1>Cosmetology Products</h1>

      {/* Search Component */}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Add New Product Form */}
      <div className="add-product-form">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="url"
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>

              {/* Stock Status Toggle */}
              <div className="product-status">
                <button 
                  className={`status-btn ${product.inStock ? 'in-stock' : 'sold'}`}
                  onClick={() => toggleStockStatus(product.id)}
                >
                  {product.inStock ? 'In Stock' : 'Sold'}
                </button>
              </div>

              {/* Delete Button */}
              <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
