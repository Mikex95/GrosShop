import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import HeaderTime from "../../components/headerTime/HeaderTime";
import Edit from "../../img/edit.svg";
import "./Checkout.css";

const Checkout = () => {
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
            <p>Daniele Johnson</p>
          </div>
          <div>
            <img src="" alt="" />
            <p>Address</p>
          </div>
          <div>
            <img src="" alt="" />
            <p>Phone</p>
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
            <p>100$</p>
          </div>
          <div className="checkout-flex">
            <p>Taxes:</p>
            <p>1$</p>
          </div>
          <div className="checkout-flex">
            <p className="checkout-totalprice">Total Price:</p>
            <p className="checkout-totalprice">101$</p>
          </div>
        </div>
      </div>
      <div className="verification-to-signin"></div>
    </div>
  );
};

export default Checkout;
