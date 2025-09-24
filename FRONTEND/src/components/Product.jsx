import React, { useState } from 'react';

const Product = ({ product, onAddToCart }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Precio: ${product.price.toLocaleString()} COP</p>

      {showDesc && <p className="description">{product.description}</p>}
      <button onClick={() => setShowDesc(!showDesc)}>
        {showDesc ? "Ocultar Descripción" : "Mostrar Descripción"}
      </button>

      <button className="btn-primary" onClick={() => onAddToCart(product)}>
        Agregar al Carrito
      </button>
    </div>
  );
};

export default Product;
