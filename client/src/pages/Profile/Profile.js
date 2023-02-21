import BackArrow from "../../components/backArrow/BackArrow";
import UpdateProfile from "../../components/buttons/UpdateProfile";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import Camera from "../../img/Camera.svg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ accessToken }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const eventOnClick = (event) => {
    event.preventDefault();

    navigate("/update-profile");
    // Hier wird der Fetch mit "PUT" eingefügt!
  };

  console.log(user);
  useEffect(() => {
    fetch("http://localhost:2202/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="profile-component-container">
      <HeaderTime backgroundcolor={"green"} color={"white"} />
      <div className="profile-container">
        <div className="headline-details">
          <BackArrow></BackArrow>
          <h5>My Profile</h5>
        </div>

        <div>
          <div className="profile-image">
            <img
              src={
                `${user.cloudinaryUrl}` ||
                "https://tse3.mm.bing.net/th?id=OIP.0l7k5zqRUVQ5Yq9eTpW2LgHaLJ&pid=Api"
              }
              alt={user.name}
              width="150px"
              height="150px"
            />
          </div>
        </div>
      </div>
      <div className="profile-data">
        <fieldset>
          <div className="profile-item">
            <h3>Profile Information</h3>
            <p>Name </p>
            <p>
              {user.lastname} {user.firstname}
            </p>
          </div>
          <div className="profile-item">
            <p>E-Mail</p>
            <p>{user.email}</p>
          </div>
          <div className="profile-item">
            <p>Adresse</p>
            <p>
              {user.shippingAddress.address + ","} {user.shippingAddress.city}
            </p>
          </div>
        </fieldset>
      </div>

      <div className="profile-data-shipping brna">
        <fieldset>
          <div className="profile-item">
            <h3>Shipping Information</h3>
            <p>Vor- und Zuname</p>
            <p>{user.shippingAddress.fullname}</p>
          </div>
          <div className="profile-item">
            <p>Straße</p>
            <p>{user.shippingAddress.address}</p>
          </div>
          <div className="profile-item">
            <p>Stadt</p>
            <p>{user.shippingAddress.city}</p>
          </div>
          <div className="profile-item">
            <p>Postleitzahl</p>
            <p>{user.shippingAddress.postalCode}</p>
          </div>
          <div className="profile-item">
            <p>Land</p>
            <p>{user.shippingAddress.state}</p>
          </div>
          <div className="profile-item">
            <p>Phone</p>
            <p>{user.shippingAddress.phone}</p>
          </div>
        </fieldset>
        <UpdateProfile text="Update Profile" onClick={eventOnClick} />
      </div>

      <NavbarWishlist1 />

      <NavbarBottom />
    </div>
  );
};

export default Profile;
