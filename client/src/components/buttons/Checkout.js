import "./Checkout.css";

import { Link } from "react-router-dom";
const Checkout = ({ text, onClick }) => {
  return (
    <Link to="/checkout" className="btn">
      <button type="submit" className="btn-link" onClick={onClick}>
        {text}
      </button>
    </Link>
  );
};

export default Checkout;
