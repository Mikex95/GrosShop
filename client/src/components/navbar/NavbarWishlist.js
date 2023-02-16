import "./NavbarWishlist.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavbarWishlist.css";
import { ReactComponent as Cart } from "../../img/Cart.svg";
import OrdersIcon from "../../img/orders.svg";
import HomeIcon from "../../img/Home.svg";
import HeartIcon from "../../img/Heart.svg";
import ProfileIcon from "../../img/Profile.svg";
import ProfileGreenIcon from "../../img/ProfileGreen.svg";
import HeartGreenIcon from "../../img/HeartGreen.svg";
import OrdersGreenIcon from "../../img/DocumentGreen.svg";
import HomeGreenIcon from "../../img/HomeGreen.svg";

const NavbarWishlist = () => {
  const [homeIsChecked, setHomeIsChecked] = useState(true);
  const [ordersIsChecked, setOrdersIsChecked] = useState(true);
  const [wishIsChecked, setWishIsChecked] = useState(true);
  const [profileIsChecked, setProfileIsChecked] = useState(true);

  const toggleCheck = () => {
    // setIsChecked(!isChecked);
  };
  return (
    <div className="navbar-wishlist-container">
      <div className="navbar-wishlist">
        <Link to="/home" onClick={toggleCheck}>
          <img src={homeIsChecked === false ? HomeGreenIcon : HomeIcon} />
          <p>Home</p>
        </Link>
        <Link to="/order-history" onClick={toggleCheck}>
          <div>
            <img src={ordersIsChecked === false ? OrdersGreenIcon : OrdersIcon} />
            <p>Orders</p>
          </div>
        </Link>
        <Link to="/cart" className="cart-button spin circle button">
          <Cart></Cart>
        </Link>
        <Link to="/wishlist" onClick={toggleCheck}>
          <img src={wishIsChecked === false ? HeartIcon : HeartGreenIcon} />
          <p>Wishlist</p>
        </Link>
        <Link to="/profile" onClick={toggleCheck}>
          <img src={profileIsChecked === false ? ProfileGreenIcon : ProfileIcon} />
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default NavbarWishlist;
