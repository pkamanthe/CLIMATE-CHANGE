import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, onDeleteProduct, onUpdatePrice }) {
  return (
    <ul className="cards">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDeleteProduct={onDeleteProduct}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </ul>
  );
}

export default ProductList;
