import CartItem from "./Wishlistitem";
import "./Wishlist.css";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import { ReactComponent as Trash } from "../../img/trash.svg";
import AddToCart from "../../components/buttons/AddToCart";
import { useState, useEffect } from "react";
import HeaderTime from "../../components/headerTime/HeaderTime";
import WishlistItem from "./Wishlistitem";

const Wishlist = ({ accessToken, productFetch }) => {
	const [wishlistData, setWishlistData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filteredProducts, setFilteredProducts] = useState([]);

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

	useEffect(() => {
		const filtered = productFetch.filter((product) => {
			return wishlistData.some((wishlist) => wishlist.itemId === product._id);
		});

		setFilteredProducts(filtered);
	}, [wishlistData, productFetch]);

	if (loading) {
		return (
			<div className="loader-container">
				<div className="loader"></div>
			</div>
		);
	}

	return (
		<div>
			<HeaderTime backgroundcolor={"green"} />
			<div className="backarrow-trash-container">
				<div className="headline-details">
					<BackArrow></BackArrow>
					<h5>My Wishlist</h5>
				</div>
			</div>
			<div className="grid-cart-item">
				{filteredProducts.map((wishlistProduct, index) => {
					return (
						<WishlistItem
							key={index}
							id={wishlistProduct._id}
							name={wishlistProduct.product_name}
							weight={wishlistProduct.product_weight}
							price={wishlistProduct.product_price}
							rating={wishlistProduct.product_rating}
							image={wishlistProduct.product_image}
							accessToken={accessToken}
							setWishlistData={setWishlistData}
						/>
					);
				})}
			</div>
			<AddToCart text="Add to Cart" />
			<NavbarWishlist />
			<NavbarBottom />
		</div>
	);
};

export default Wishlist;
