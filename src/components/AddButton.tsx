import React, { useState } from "react";

const AddButton = () => {
    const [quantity, setQuantity] = useState(0);

    const handelAdd = () => {
        setQuantity(1);
    }
    const handleIncrease = () => {
        setQuantity((prev: number) => prev + 1);
    }
    const handleDecrease = () => {
       setQuantity((prev: number) => {
        if (prev === 1){
            return 0;
        }
        return prev - 1;
       })
    }
    if (quantity === 0) {
        return (
            <button
            onClick={handelAdd}
            className="add-to-cart-btn">
                Add to Cart
            </button>
        )
    }
    return (
        <div className="quantity-controls">
        <button
        onClick={handleDecrease}
        className="quantity-btn">
            -
        </button>
        <span className="quantity-display">{quantity}</span>
         <button
        onClick={handleIncrease}
        className="quantity-btn">
            +
        </button>
        </div>
    );
}
 
export default AddButton;