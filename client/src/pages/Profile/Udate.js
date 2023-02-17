import BackArrow from "../../components/backArrow/BackArrow";
import UpdateProfile from "../../components/buttons/UpdateProfile";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import Camera from "../../img/Camera.svg";
import Edit from "../../img/edit.svg";
import { useState, useEffect } from "react";
import "./Profile.css";

const Update = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

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
      headers: {},
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
          <h5>Edit Profile</h5>
        </div>
        <div>
          <div className="profile-image">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.0l7k5zqRUVQ5Yq9eTpW2LgHaLJ&pid=Api"
              alt=""
              width="150px"
              height="150px"
            />
            <img src={Camera} />
          </div>
        </div>
      </div>
      <div className="profile-edit-link">
        <p>Save Changes</p>
        <img src={Edit} alt="" width={20} />
      </div>

      <div className="profile-data">
        <div className="profile-item">
          <p>Name </p>
          <input type="text" />
        </div>
        <div className="profile-item">
          <p>E-Mail</p>
          <p>{user.email}</p>
        </div>
        <div className="profile-item">
          <p>Adresse</p>
          <p>
            <input type="text" />
          </p>
        </div>
        <div className="profile-item">
          <p>Telefon</p>
          <input type="text" />
        </div>
      </div>
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default Update;
