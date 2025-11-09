import React, { useState } from "react";
import type { CartItem } from "../types";
import OrderConfirmationModal from "./OrderConfirmationModal";
import './Cart.css';



interface CartProps {
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveItem, onClearCart}) => {
  const [showModal, setShowModal] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

const handleConfirmOrder = () => {
 setShowModal(true);
};
const handleStartNewOrder = () => {
  setShowModal(false);  // Hide modal
  onClearCart();        // Clear the cart
};

  if (cart.length === 0) {
    return (
      <div className="dessert__cart">
        <h2>Your Cart (0)</h2>
        <div className="cart-empty">
          <img src="/src/assets/images/illustration-empty-cart.svg" alt="Empty cart" />
          <p>Your added items will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="dessert__cart">
        <h2>Your Cart ({cart.length})</h2>
        
        <div className="cart-item__body">
          {cart.map(item => (
            <div key={item.product.id} className='cart-item'>
              <div className="cart-item__info">
                <span className="cart-item__name">{item.product.name}</span>
                <div className="cart-item__price-row">
                  <span className="cart-item__quantity">{item.quantity}x</span>
                  <span className="cart-item__unit-price">@ ${item.product.price.toFixed(2)}</span>
                  <span className="cart-item__total-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button 
                className="cart-item__remove"
                onClick={() => onRemoveItem(item.product.id)}
                aria-label="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart__total">
          <span className="cart__total-label">Order Total</span>
          <span className="cart__total-amount">${total.toFixed(2)}</span>
        </div>
        
        <div className="cart__carbon">
          <span className="cart__carbon-icon">🌳</span>
          <span>This is a <strong>carbon-neutral</strong> delivery</span>
        </div>
        
        <button onClick={handleConfirmOrder} className="confirm-order-btn">
          Confirm Order
        </button>
      </div>

      {showModal && (
        <OrderConfirmationModal 
          cart={cart}
          total={total}
          onClose={handleStartNewOrder}
        />
      )}
    </>
  );
}

export default Cart;