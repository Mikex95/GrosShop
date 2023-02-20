import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import HeaderTime from "../../components/headerTime/HeaderTime";
import Edit from "../../img/edit.svg";
import { Link } from "react-router-dom";
import "./Checkout.css";
import { useState, useEffect } from "react";
import { apiBaseUrl } from "../../api";

const Checkout = ({ accessToken, productFetch }) => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [brutto, setBrutto] = useState(0);
  const [user, setUser] = useState([]);

  // Get Cart Data
  useEffect(() => {
    fetch(`${apiBaseUrl}/user/cart`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [accessToken]);
  console.log(user);

  // Get User Data
  useEffect(() => {
    fetch(`${apiBaseUrl}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [accessToken]);

  useEffect(() => {
    const totalPrice = cartData.reduce((acc, item) => {
      const product = productFetch.find((p) => p._id === item.itemId);
      return acc + item.quantity * product.product_price;
    }, 0);
    setTaxes((totalPrice / 107) * 7);
    setTotal(totalPrice - taxes);
    setBrutto(totalPrice);
  }, [cartData, productFetch]);

  return (
    <div className="checkout">
      <HeaderTime backgroundcolor="white" color="white" />
      <div className="checkout-upper">
        <div className="headline-details">
          <BackArrow></BackArrow>
          <h5>Checkout</h5>
        </div>
        <div className="checkout-items">
          <div className="checkout-headline">
            <h2>Shipping Information</h2>
            <Link to="/update-profile">
              <img src={Edit} alt="" width={30} />
            </Link>
          </div>
          <div className="checkout-detail">
            {user && (
              <p>
                Name: {user.firstname} {user.lastname}
              </p>
            )}
          </div>
          <div className="checkout-detail">
            {user && user.shippingAddress && <p>Straße: {user.shippingAddress.address}</p>}
          </div>
          <div className="checkout-detail">
            {user && user.shippingAddress && <p>Postleitzahl: {user.shippingAddress.postalCode}</p>}
          </div>
          <div className="checkout-detail">
            {user && user.shippingAddress && <p>Stadt: {user.shippingAddress.city}</p>}
          </div>
          <div className="checkout-detail">
            {user && user.shippingAddress && <p>Country: {user.shippingAddress.state}</p>}
          </div>
          <div className="checkout-detail">
            {user && user.shippingAddress && <p>Phone: {user.shippingAddress.phone}</p>}
          </div>
        </div>
        <div className="checkout-items">
          <div className="checkout-headline">
            <h2>Payments</h2>
            <Link to="/addcredit">
              <img src={Edit} alt="" width={30} />
            </Link>
          </div>
          <div className="checkout-detail">
            <p>456878545648</p>
          </div>
        </div>
        <div className="checkout-total">
          <div className="checkout-flex">
            <p>Subtotal:</p>
            <p>{total.toFixed(2)}$</p>
          </div>
          <div className="checkout-flex">
            <p>Taxes:</p>
            <p>{taxes.toFixed(2)}$</p>
          </div>
          <div className="checkout-flex">
            <p className="checkout-totalprice">Total Price:</p>
            <p className="checkout-totalprice">{brutto.toFixed(2)}$</p>
          </div>
        </div>
        <NavbarBottom />
      </div>
      <div className="verification-to-signin"></div>
    </div>
  );
};

export default Checkout;
