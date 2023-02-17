import "./UpdateProfile.css";
import { Link } from "react-router-dom";

const UpdateProfile = ({ text, onClick }) => {
  return (
    <Link to="/update-profile" className="update-button">
      <button type="submit" className="update-link" onClick={onClick}>
        {text}
      </button>
    </Link>
  );
};

export default UpdateProfile;
