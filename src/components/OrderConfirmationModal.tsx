import React from "react";
import type { CartItem } from '../types'
import "./OrderConfirmationModal.css";

interface OrderConfirmationModalProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;

  
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  cart,
  total,
  onClose
}) => {
  return (
    <>
      <div className="modal-backdrop"></div>

      <div className="modal">
        <div className="modal-icon">✓</div>

        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>

        <div className="modal-items">
          {cart.map(item => (
            <div key={item.product.id} className="modal-item">
              <img src={item.product.image} alt={item.product.name} />
              
              <div className="modal-item-info">
                <p className="modal-item-name">{item.product.name}</p>
                <div className="modal-item-details">
                  <span className="modal-item-quantity">{item.quantity}x</span>
                  <span className="modal-item-unit-price">@ ${item.product.price.toFixed(2)}</span>
                </div>
              </div>

              <span className="modal-item-price">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="modal-total">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button onClick={onClose} className="modal-close-btn">
          Start New Order
        </button>
      </div>
    </>
  );
};
export default OrderConfirmationModal;