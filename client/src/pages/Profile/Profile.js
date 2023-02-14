import BackArrow from "../../components/backArrow/BackArrow";
import UpdateProfile from "../../components/buttons/UpdateProfile";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import "./Profile.css";

const Profile = () => {
  return (
    <div>
      <HeaderTime />
      <div className="profile-container">
        <div className="headline-details">
          <BackArrow></BackArrow>
          <h5>My Profile</h5>
        </div>
        <div className="profile-image">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5d2629105341497.5f770032e210d.png"
            alt=""
            width="150px"
          />
        </div>
      </div>
      <div className="profile-data">
        <div className="profile-item">
          <p>Name</p>
          <p>Jumsalam, Max</p>
        </div>
        <div className="profile-item">
          <p>E-Mail</p>
          <p>demo123@google.com</p>
        </div>
        <div className="profile-item">
          <p>Adresse</p>
          <p>Musterstraße, 7, 1234 Musterhausen</p>
        </div>
        <div className="profile-item">
          <p>Telefon</p>
          <p>10520 321456 897</p>
        </div>
      </div>
      <UpdateProfile text="Update Profile" />
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default Profile;
