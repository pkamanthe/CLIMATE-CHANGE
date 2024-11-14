import React, { useState } from 'react';
import './ProductPage.css';

function ProductPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'beauty blender', photo: '/images/beauty blender.jpg', price: 17.09, inStock: true },
    { id: 2, name: 'eye lashes', photo: '/images/eye lashes.jpg', price: 5.99, inStock: false },
    { id: 3, name: 'make-up brushes', photo: '/images/make-up brushes.jpg', price: 12.11, inStock: true },
    { id: 4, name: 'Mascara', photo: '/images/Mascara.jpg', price: 10.37, inStock: true },
    { id: 5, name: 'Matte-lipstick', photo: '/images/Matte-lipstick.jpg', price: 25.99, inStock: true },
    { id: 6, name: 'setting powder', photo: '/images/setting powder.jpg', price: 30.00, inStock: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    photo: '',
    price: '',
    inStock: true,
  });
  const [filter, setFilter] = useState('all'); // Default to 'all'
  const [editProduct, setEditProduct] = useState(null);

  const toggleStockStatus = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, inStock: !product.inStock } : product
      )
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (newProduct.name && newProduct.photo && newProduct.price) {
      const newProductId = products.length + 1;
      const newProductData = {
        ...newProduct,
        id: newProductId,
        price: parseFloat(newProduct.price),
      };
      setProducts((prevProducts) => [...prevProducts, newProductData]);
      setNewProduct({ name: '', photo: '', price: '', inStock: true });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    if (editProduct.name && editProduct.photo && editProduct.price) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProduct.id ? { ...editProduct, price: parseFloat(editProduct.price) } : product
        )
      );
      setEditProduct(null);
    } else {
      alert('Please fill in all fields');
    }
  };

  // Filter products based on search term and filter
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      if (filter === 'inStock') return product.inStock;
      if (filter === 'outOfStock') return !product.inStock;
      return true;
    });

  return (
    <div className="product-page">
      <h2>Products List</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Dropdown Filter */}
      <div className="filter-dropdown">
        <label htmlFor="filter">Filter by Stock Status: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>

      {/* Product list */}
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.photo} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                <button onClick={() => toggleStockStatus(product.id)}>
                  {product.inStock ? 'Out of Stock' : 'In Stock'}
                </button>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Product Form */}
      {editProduct && (
        <div className="edit-product-form">
          <h3>Edit Product</h3>
          <form onSubmit={handleUpdateProduct}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            />
            <input
              type="text"
              name="photo"
              placeholder="Product Image URL"
              value={editProduct.photo}
              onChange={(e) => setEditProduct({ ...editProduct, photo: e.target.value })}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            />
            <select
              name="inStock"
              value={editProduct.inStock}
              onChange={(e) => setEditProduct({ ...editProduct, inStock: e.target.value === 'true' })}
            >
              <option value={true}>In Stock</option>
              <option value={false}>Out of Stock</option>
            </select>
            <button type="submit">Update Product</button>
          </form>
        </div>
      )}

      <h3>Add New Product</h3>
      <form onSubmit={handleAddProduct} className="add-product-form-horizontal">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          placeholder="Product Image URL"
          value={newProduct.photo}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <select
          name="inStock"
          value={newProduct.inStock}
          onChange={(e) => handleChange({ target: { name: 'inStock', value: e.target.value === 'true' } })}
        >
          <option value={true}>In Stock</option>
          <option value={false}>Out of Stock</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductPage;
