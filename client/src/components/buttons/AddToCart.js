import "./AddToCart.css";

import { Link } from "react-router-dom";

const AddToCart = ({ text, onClick }) => {
  return (
    <Link className="btn">
      <button type="submit" className="btn-link" onClick={onClick}>
        {text}
      </button>
    </Link>
  );
};

export default AddToCart;
