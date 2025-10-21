import { useState, useEffect, useRef } from "react";

interface AddButtonProps {
    orderConfirmed: boolean;
}


const AddButton:React.FC<AddButtonProps> = ({orderConfirmed}) => {
    const [quantity, setQuantity] = useState(0);

    // Reset quantity only when orderConfirmed transitions from `true` -> `false`
    const prevOrderConfirmed = useRef(orderConfirmed);
    useEffect(() => {
        if (prevOrderConfirmed.current === true && orderConfirmed === false) {
            setQuantity(0);
        }
        prevOrderConfirmed.current = orderConfirmed;
    }, [orderConfirmed]);

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