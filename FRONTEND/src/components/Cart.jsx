import React from 'react';

const Cart = ({ cartItems, onRemove, onIncrement, onDecrement, onClose, total, onPay }) => {
  return (
    <div className="cart-modal-backdrop">
  <div className="cart-modal-content" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <div className="cart-box">El carrito está vacío</div>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="item-details">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">${item.price.toLocaleString()} COP</p>
                    </div>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button onClick={() => onDecrement(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onIncrement(item.id)}>+</button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="btn-danger">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ${total.toLocaleString()} COP</h3>
            </div>
            <div className="cart-actions">
              <button className="btn-success" onClick={onPay}>Pagar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;