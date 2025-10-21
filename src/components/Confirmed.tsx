import { useState } from "react";
// import AddButton from "./AddButton";

interface ConfirmedProps {
    onConfirm: () => void;
}

const Confirmed = ({onConfirm}: ConfirmedProps) => {
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const handleConfirmed =() => {
        if (!orderConfirmed){
            setOrderConfirmed(true);
            onConfirm();
        }else{
            setOrderConfirmed(false);
            onConfirm();
        }
    }
    return (
        <button
        onClick={handleConfirmed}
        className="confirm-order-btn">
            {orderConfirmed ? "Start New Order" : "Confirm Order"}
        </button>
    );
}
export default Confirmed;