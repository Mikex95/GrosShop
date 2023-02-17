import "./UpdateProfile.css";
import { Link, LInk } from "react-router-dom";

const UpdateProfile = ({ text, onClick }) => {
  return (
    <Link to="/update-profile">
      <div className="update-button">
        <button type="submit" className="update-link" onClick={onClick}>
          {text}
        </button>
      </div>
    </Link>
  );
};

export default UpdateProfile;
