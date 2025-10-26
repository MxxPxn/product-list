import React, { useState } from "react";
import type { CartItem } from "../types";



interface CartProps {
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveItem, onIncrease, onDecrease }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    setOrderConfirmed(!orderConfirmed);
    if (orderConfirmed) {
      onRemoveItem('ALL');
    }
  };

  return (
    <div>
      <h2>Your Cart ({cart.length})</h2>
      {cart.map(item => (
        <div key={item.product.id} className='cart-item'>
          <div className="cart-item__info">
            <p className="cart-item__name">{item.product.name}</p>
            <p className="cart-item__quantity">{item.quantity}x</p>
            <p className="cart-item__price">
              @{(item.product.price).toFixed(2)}
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <div className="quantity-controls">
            <button
              onClick={() => onDecrease(item.product.id)}
              className="quantity-btn"
            >
              -
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button
              onClick={() => onIncrease(item.product.id)}
              className="quantity-btn"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="cart__total">
        Total: ${total.toFixed(2)}
      </div>
      <button onClick={handleConfirmOrder}>
        {orderConfirmed ? "Start New Order" : "Confirm Order"}
      </button>
    </div>
  );
}

export default Cart;