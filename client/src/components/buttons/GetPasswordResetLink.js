import { Link } from "react-router-dom";
const GetPasswordResetLink = ({ text, onClick, color, size }) => {
  return (
    <Link to="/signin" className="verify-green-button">
      <button
        style={{ color: color, fontSize: size }}
        type="submit"
        className="verify-green-button-link verify-category-subhead"
        onClick={onClick}>
        {text}
      </button>
    </Link>
  );
};

export default GetPasswordResetLink;
