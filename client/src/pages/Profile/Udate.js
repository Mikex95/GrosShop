import BackArrow from "../../components/backArrow/BackArrow";
import UpdateProfile from "../../components/buttons/UpdateProfile";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import Paypal from "../../img/Paypal.svg";
import Klarna from "../../img/Klarna.svg";
import Stripe from "../../img/Stripe.svg";
import Camera from "../../img/Camera.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import "./Profile.css";
import "./Update.css";

const Update = ({ accessToken }) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    fullname: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    profileImage: "",
  });

  useEffect(() => {
    fetch(`${apiBaseUrl}user/profile`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [accessToken]);

  const eventOnClick = () => {
    const formDatas = new FormData();
    for (let key in formData) {
      formDatas.append(key, formData[key]);
    }
    fetch(`${apiBaseUrl}user/profile-update`, {
      method: "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + accessToken,
      },
      body: formDatas, // JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated profile data:", data);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating profile data:", error);
      });
  };

  return (
    <div className="update-component-container">
      <HeaderTime backgroundcolor={"green"} color={"white"} />
      <div className="update-container">
        <div className="headline-details">
          <BackArrow></BackArrow>
          <h5>Edit Profile</h5>
        </div>

        <div>
          <div className="profile-image">
            <img
              src={`${userData.cloudinaryUrl}`}
              alt=""
              width="150px"
              height="150px"
            />
            <label htmlFor="upload-input" className="label-image-upload">
              <img src={Camera} alt="the owner of this profile" />
            </label>
            <input
              id="upload-input"
              type="file"
              name="profileImage"
              onChange={(e) =>
                setFormData({ ...formData, profileImage: e.target.files[0] })
              }
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="update-data">
        <fieldset>
          <h3> Profile Information</h3>
          <div className="update-item">
            <p>First Name </p>
            <input
              placeholder={userData.firstname}
              type="text"
              name="Vorname"
              value={formData.firstname}
              onFocus={(e) => (e.target.placeholder = "")}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
          </div>
          <div className="update-item">
            <p>Last Name </p>
            <input
              type="text"
              name="Nachname"
              placeholder={userData.lastname}
              value={formData.lastname}
              onFocus={(e) => (e.target.placeholder = "")}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </div>
          <div className="update-item">
            <p>E-Mail</p>
            <input
              type="email"
              name="email"
              placeholder={userData.email}
              value={formData.email}
              readOnly
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="update-item-input">
            <h3>Shipping Information</h3>
            <p>Full Name</p>
            {userData && userData.shippingAddress && (
              <input
                type="text"
                name="fullname"
                placeholder={`${userData.shippingAddress.fullname}`}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = `${userData.shippingAdress.fullname}`)
                }
                value={formData.fullname ? formData.fullname : ""}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            )}
          </div>

          <div className="update-item-input">
            <div className="update-item-adresse">
              <p>Street</p>
              {userData && userData.shippingAddress && (
                <input
                  type="text"
                  name="Straße"
                  placeholder={userData.shippingAddress.address}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) =>
                    (e.target.placeholder = userData.shippingAddress.address)
                  }
                  value={formData.address ? formData.address : ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              )}
            </div>
            <p>City</p>
            {userData && userData.shippingAddress && (
              <input
                type="text"
                name="Stadt"
                placeholder={userData.shippingAddress.city}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = userData.shippingAddress.city)
                }
                value={formData.city ? formData.city : ""}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            )}
            <p>Postalcode</p>
            {userData && userData.shippingAddress && (
              <input
                type="text"
                name="PLZ"
                placeholder={userData.shippingAddress.postalCode}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = userData.shippingAddress.postalCode)
                }
                value={formData.postalCode ? formData.postalCode : ""}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
              />
            )}
            <p>State</p>
            {userData && userData.shippingAddress && (
              <input
                type="text"
                name="Land"
                placeholder={userData.shippingAddress.state}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = userData.shippingAddress.state)
                }
                value={formData.state ? formData.state : ""}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            )}
            <p>Phone</p>
            {userData && userData.shippingAddress && (
              <input
                type="text"
                name="Land"
                placeholder={userData.shippingAddress.phone}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = userData.shippingAddress.phone)
                }
                value={formData.phone ? formData.phone : ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            )}
          </div>
        </fieldset>
        <fieldset>
          <div>
            <h3>Payment Information</h3>
            <p>Choose your Payment Method:</p>
            <div className="update-payment-icons">
              <img src={Paypal} alt="" width={20} />
              <img src={Klarna} alt="" width={30} />
              <img src={Stripe} alt="" width={50} />
            </div>
          </div>
        </fieldset>

        <UpdateProfile text="Save Changes" onClick={eventOnClick} />
      </div>

      <NavbarWishlist1 />
      <NavbarBottom />
    </div>
  );
};

export default Update;
