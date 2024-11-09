import React, { useState } from "react";

function ProductCard({ product, onDeleteProduct, onUpdatePrice }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  function handleToggleStock() {
    setIsSoldOut(!isSoldOut);
  }

  function handleDelete() {
    fetch(`http://localhost:5000/products/${product.id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteProduct(product.id))
      .catch((error) => console.error("Error deleting product:", error));
  }

  function handlePriceUpdate(e) {
    const newPrice = parseFloat(e.target.value);
    fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => onUpdatePrice(updatedProduct))
      .catch((error) => console.error("Error updating price:", error));
  }

  return (
    <li className="card" data-testid="product-item">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>Price: {product.price}</p>
      <input
        type="number"
        step="0.01"
        defaultValue={product.price}
        onBlur={handlePriceUpdate}
      />
      <button onClick={handleToggleStock} className={isSoldOut ? "" : "primary"}>
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </li>
  );
}

export default ProductCard;
