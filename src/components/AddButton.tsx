import React from "react";

interface AddButtonProps {
    orderConfirmed: boolean;
    quantity: number;
    onAddToCart: () => void;
    onIncrease: () => void;
    onDecrease: () => void;
}


const AddButton: React.FC<AddButtonProps> = ({
    quantity,
    onAddToCart,
    onIncrease,
    onDecrease
}) => {
   
    if (quantity === 0) {
        return (
            <button
            onClick={onAddToCart}
            className="add-to-cart-btn">
                Add to Cart
            </button>
        )
    }
    return (
        <div className="quantity-controls">
        <button
        onClick={onDecrease}
        className="quantity-btn">
            -
        </button>
        <span className="quantity-display">{quantity}</span>
         <button
        onClick={onIncrease}
        className="quantity-btn">
            +
        </button>
        </div>
    );
}
 
export default AddButton;