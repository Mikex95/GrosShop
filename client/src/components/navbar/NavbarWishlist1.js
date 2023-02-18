import "./NavbarWishlist1.css";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Cart } from "../../img/Cart.svg";
import HomeIcon from "../../img/HomeIcon";
import OrderIcon from "../../img/OrderIcon";
import WishlistIcon from "../../img/WishlistIcon";
import ProfileIcon from "../../img/ProfileIcon";

const NavbarWishlist1 = () => {
  return (
    <div className="navbar-wishlist-container">
      <div className="navbar-wishlist">
        <NavLink to="/home">
          <HomeIcon />
          <p>Home</p>
        </NavLink>
        <NavLink to="/order-history">
          <OrderIcon />
          <p>Orders</p>
        </NavLink>
        <Link to="/cart" className="cart-button spin circle button">
          <Cart></Cart>
        </Link>
        <NavLink to="/wishlist">
          <WishlistIcon />
          <p>Wishlist</p>
        </NavLink>
        <NavLink to="/profile">
          <ProfileIcon />
          <p>Profile</p>
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarWishlist1;
