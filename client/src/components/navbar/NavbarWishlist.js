import "./NavbarWishlist.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavbarWishlist.css";
import { ReactComponent as Cart } from "../../img/Cart.svg";
import OrdersIcon from "../../img/orders.svg";
import HomeIcon from "../../img/Home.svg";
import HeartIcon from "../../img/Heart.svg";
// import ProfileIcon from "../../img/Profile.svg";
import ProfileGreenIcon from "../../img/ProfileGreen.svg";
import HeartGreenIcon from "../../img/HeartGreen.svg";
import OrdersGreenIcon from "../../img/DocumentGreen.svg";
import HomeGreenIcon from "../../img/HomeGreen.svg";

const NavbarWishlist = () => {
  return (
    <div className="navbar-wishlist-container">
      <div className="navbar-wishlist">
        <Link to="/home">
          <HomeButton></HomeButton> <p>Home</p>
        </Link>
        <Link to="/order-history">
          <Orders></Orders>
          <p>Orders</p>
        </Link>
        <Link to="/cart" className="cart-button spin circle button">
          <Cart></Cart>
        </Link>
        <Link to="/wishlist">
          <Heart></Heart>
          <p>Wishlist</p>
        </Link>
        <Link to="/profile">
          <Profile></Profile> <p>Profile</p>
        </Link>
      </div>
    </div>
  );
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheck = (event) => {
    event.preventDefault();
    setIsChecked(!isChecked);
  };
  return (
    <div className="navbar-wishlist-container">
      <div className="navbar-wishlist">
        <Link to="/home" onClick={toggleCheck}>
          <img src={isChecked === false ? HomeGreenIcon : HomeIcon} />
          <p>Home</p>
        </Link>
        <Link to="/order-history" onClick={toggleCheck}>
          <img src={isChecked === false ? OrdersGreenIcon : OrdersIcon} />
          <p>Orders</p>
        </Link>
        <Link to="/cart" className="cart-button spin circle button">
          <Cart></Cart>
        </Link>
        <Link to="/wishlist" onClick={toggleCheck}>
          <img src={isChecked === false ? HeartIcon : HeartGreenIcon} />
          <p>Wishlist</p>
        </Link>
        {/* <Link to="/profile" onClick={toggleCheck}>
          <img src={isChecked === false ? ProfileGreenIcon : ProfileIcon} />
          <p>Profile</p>
        </Link> */}
      </div>
    </div>
  );
};

export default NavbarWishlist;
