import "./NavbarWishlist.css";
import { Link } from "react-router-dom";
import { ReactComponent as HomeButton } from "../../img/home-house.svg";
import { ReactComponent as Orders } from "../../img/orders.svg";
import { ReactComponent as Cart } from "../../img/Cart.svg";
import { ReactComponent as Heart } from "../../img/Heart.svg";
import { ReactComponent as Profile } from "../../img/Profile.svg";

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
				<Link
					to="/cart"
					className="cart-button spin circle button"
				>
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
};

export default NavbarWishlist;
