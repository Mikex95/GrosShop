import { Link } from "react-router-dom";
import "./VerifyBtn.css";

const VerifyBtn = ({ text, onClick, color, size }) => {
  return (
    <Link to="/successverify" className="verify-green-button">
      <button
        style={{ color: color, fontSize: size }}
        type="submit"
        className="verify-green-button-link verify-category-subhead"
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  );
};

export default VerifyBtn;
