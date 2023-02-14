import "./Checkout.css";

import { Link } from "react-router-dom";
const Checkout = ({ text, onClick }) => {
  return (
    <Link className="btn">
      <button type="submit" className="btn-link" onClick={onClick}>
        {text}
      </button>
    </Link>
  );
};

export default Checkout;
