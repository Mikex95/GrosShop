import BackArrow from "../../components/backArrow/BackArrow";
import UpdateProfile from "../../components/buttons/UpdateProfile";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import { useState, useEffect } from "react";
import "./Profile.css";

const Profile = ({ accessToken }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const pseudoUser = {
    firstname: "Fadi",
    lastname: "Michael",
    email: "fadi3@fadi.com",
    straße: "Musterstraße 7",
    stadt: "Musterhausen",
    plz: "1234",
    telefon: "666 666",
  };

  const eventOnClick = (event) => {
    event.preventDefault();
    console.log("hallo");
    // Hier wird der Fetch mit "PUT" eingefügt!
  };

  // der richtige Fetch für später =  fetch("http://localhost:2202/api/user/profile", requestOptions)
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
  }, []);

  console.log(user);

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
            {user.straße}, {user.stadt}
          </p>
        </div>
        <div className="profile-item">
          <p>Telefon</p>
          <p>{user.telefon}</p>
        </div>
      </div>
      <UpdateProfile text="Update Profile" onClick={eventOnClick} />
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default Profile;
