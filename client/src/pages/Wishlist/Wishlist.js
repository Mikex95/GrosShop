import CartItem from "./Wishlistitem";
import "./Wishlist.css";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import { ReactComponent as Trash } from "../../img/trash.svg";
import AddToCart from "../../components/buttons/AddToCart";
import { useState, useEffect } from "react";
import HeaderTime from "../../components/headerTime/HeaderTime";

const Wishlist = ({ accessToken }) => {
	const [cart, setCart] = useState([]);
	const [wishlistData, setWishlistData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch("http://localhost:2202/api/user/wishlist", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setWishlistData(data);
				setLoading(false);
			});
	}, []);

	console.log(wishlistData);
	if (loading) {
		return (
			<div className="loader-container">
				<div className="loader"></div>
			</div>
		);
	}

	// const addToCart = (product) => {
	//   let newCart = [...cart];
	//   let itemInCart = newCart.find((item) => product.name === item.name);
	//   if (itemInCart) {
	//     itemInCart.quantity++;
	//   } else {
	//     itemInCart = {
	//       ...product,
	//       quantity: 1,
	//     };
	//     newCart.push(itemInCart);
	//   }
	//   setCart(newCart);
	// };

	// const removeFromCart = (productToRemove) => {
	//   setCart(cart.filter((product) => product !== productToRemove));
	// };

	// ==== Anzahl der CatItems=====
	// const getCartTotal = () => {
	//   return cart.reduce((sum, { quantity }) => sum + quantity, 0);
	// };

	return (
		<div>
			<HeaderTime backgroundcolor={"green"} />
			<div className="headline-details">
				<BackArrow></BackArrow>
				<h5>My Wishlist</h5>
				<Trash />
			</div>
			<div className="grid-cart-item">
				<CartItem name={"hallo"} />
			</div>
			<AddToCart text="Add to Cart" />
			<NavbarWishlist />
			<NavbarBottom />
		</div>
	);
};

export default Wishlist;
