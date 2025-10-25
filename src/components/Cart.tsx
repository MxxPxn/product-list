import React, { useState } from "react";
import type { CartItem } from "../types";


interface CartProps {
    cart: CartItem[];
    onRemoveItem: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({cart, onRemoveItem}) => {
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
            <p>{item.product.name}</p>
            <p>${(item.product.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => onRemoveItem(item.product.id)}>Remove</button>
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