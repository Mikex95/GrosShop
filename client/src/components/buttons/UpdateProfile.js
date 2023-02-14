import "./UpdateProfile.css";

const UpdateProfile = ({ text, onClick }) => {
  return (
    <div className="update-button">
      <button type="submit" className="update-link" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default UpdateProfile;
