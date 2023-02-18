import BackArrow from "../../components/backArrow/BackArrow";
import UpdateProfile from "../../components/buttons/UpdateProfile";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import Paypal from "../../img/Paypal.svg";
import Klarna from "../../img/Klarna.svg";
import Stripe from "../../img/Stripe.svg";
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
      <div>
        <div className="profile-data">
          <h3>Shipping Information</h3>
          <div className="profile-item">
            <p>Vorname </p>
            <input type="text" />
          </div>
          <div className="profile-item">
            <p>Nachname </p>
            <input type="text" />
          </div>
          <div className="profile-item">
            <p>E-Mail</p>
            <p>{user.email}</p>
          </div>
          <div className="profile-item">
            <p>Telefon</p>
            <input type="text" />
          </div>
          <div className="profile-item">
            <label htmlFor="">Adresse:</label>
            <div className="profile-item-input">
              <div className="profile-item-adresse">
                <p>Straße</p>
                <input type="text" name="Straße" />
                <p>Hausnummer</p>
                <input type="text" name="Hausnummer" />
              </div>
              <p>Stadt</p>
              <input type="text" name="Stadt" />
              <p>Postleitzahl</p>
              <input type="text" name="Stadt" />
              <p>Land</p>
              <input type="text" name="Land" />
            </div>

            <div>
              <h3>Payment Information</h3>
              <p>Wähle eine Zahlungsmethode:</p>
              <div className="profile-payment-icons">
                <img src={Paypal} alt="" width={20} />
                <img src={Klarna} alt="" width={30} />
                <img src={Stripe} alt="" width={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfile text="Update Profile" onClick={eventOnClick} />
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default Update;
