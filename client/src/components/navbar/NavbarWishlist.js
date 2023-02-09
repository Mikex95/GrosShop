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
				<Link>
					<HomeButton></HomeButton> <p>Home</p>
				</Link>
				<Link>
					<Orders></Orders>
					<p>Orders</p>
				</Link>
				<Link className="cart-button spin circle button">
					<Cart></Cart>
				</Link>
				<Link>
					<Heart></Heart>
					<p>Wishlist</p>
				</Link>
				<Link>
					<Profile></Profile> <p>Profile</p>
				</Link>
			</div>
		</div>
	);
};

export default NavbarWishlist;
