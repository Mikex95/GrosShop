import "./AddToCart.css";
import { CartProvider, useCart } from "react-use-cart";

import { Link } from "react-router-dom";

const AddToCart = ({ text, onClick }) => {
  const { addItem } = useCart();

  return (
    <Link className="btn">
      <div>
        <button type="submit" className="btn-link" onClick={onClick}>
          {text}
        </button>
      </div>
    </Link>
  );
};

export default AddToCart;
