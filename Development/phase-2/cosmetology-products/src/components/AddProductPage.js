// src/components/AddProductPage.js
import React, { useState } from 'react';
import './AddProductPage.css';

function AddProductPage() {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [inStock, setInStock] = useState(true);
  const [productList, setProductList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure the fields are not empty before proceeding
    if (!productName || !productImage) {
      alert('Please fill in all fields.');
      return;
    }

    // Add the new product to the product list
    const newProduct = {
      name: productName,
      photo: productImage,
      inStock: inStock,
    };

    // Update the product list (assuming you're adding it to the state)
    setProductList([...productList, newProduct]);

    // Reset form fields after submission
    setProductName('');
    setProductImage('');
    setInStock(true);

    // Optionally, alert the user or console log the newly added product
    alert('Product added successfully!');
    console.log('Product added:', newProduct);
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Image URL:</label>
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>In Stock:</label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>
      <div className="product-list">
        {productList.length > 0 ? (
          productList.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.photo} alt={product.name} />
              <h3>{product.name}</h3>
              <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          ))
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </div>
  );
}

export default AddProductPage;