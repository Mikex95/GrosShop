import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import HeaderTime from "../../components/headerTime/HeaderTime";
import Edit from "../../img/edit.svg";
import "./Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SlideButton from "react-slide-button";

const Checkout = ({ accessToken, productFetch }) => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [brutto, setBrutto] = useState(0);
  const [user, setUser] = useState([]);

  // Get Cart Data
  useEffect(() => {
    fetch("http://localhost:2202/api/user/cart", {
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
    fetch("http://localhost:2202/api/user/profile", {
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
  }, []);

  useEffect(() => {
    const totalPrice = cartData.reduce((acc, item) => {
      const product = productFetch.find((p) => p._id === item.itemId);
      return acc + item.quantity * product.product_price;
    }, 0);
    setTaxes((totalPrice / 100) * 19);
    setTotal(totalPrice);
    setBrutto(totalPrice + taxes);
  }, [cartData, productFetch]);

  return (
    <div className="checkout">
      <HeaderTime backgroundcolor="white" />
      <div className="checkout-upper">
        <div className="headline-details">
          <BackArrow></BackArrow>
          <h5>Checkout</h5>
        </div>
        <div className="checkout-items">
          <div className="checkout-headline">
            <h2>Shipping Information</h2>
            <img src={Edit} alt="" width={30} />
          </div>
          <div>
            <img src="" alt="" />
            <p>
              Name: {user.firstname} {user.lastname}
            </p>
          </div>
          <div>
            <img src="" alt="" />
            <p>Address: {user.address} Musterstraße 4</p>
          </div>
          <div>
            <img src="" alt="" />
            <p>Phone: {user.phone} 666 666</p>
          </div>
        </div>
        <div className="checkout-items">
          <div className="checkout-headline">
            <h2>Payments</h2>
            <img src={Edit} alt="" width={30} />
          </div>
          <div>
            <img src="" alt="" />
            <p>67849287623748596857</p>
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
      </div>
      <div className="verification-to-signin">
        <SlideButton
          mainText="Slide to complete your Order"
          overlayText="SWIPE"
          classList="mainText"
          caretClassList="my-cart-class"
          overlayClassList="my-overlay-class"
          onSlideDone={() => {
            navigate("/order-history");
          }}
        />
      </div>
    </div>
  );
};

export default Checkout;
