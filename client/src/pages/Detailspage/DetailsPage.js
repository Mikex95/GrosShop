import "./DetailsPage.css";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BackArrow from "../../components/backArrow/BackArrow";
import BrokkoliDetail from "../../img/brokkoli-detail.png";
import { ReactComponent as CartDetails } from "../../img/shopping-cart-detail.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const DetailsPage = (props) => {
	const [count, setCount] = useState(0);
	const { id } = useParams();
	const [foodDetails, setFoodDetails] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch(`http://localhost:2202/api/products`)
			.then((response) => response.json())
			.then((data) => {
				const selectedFood = data.allProducts.find(
					(product) => product._id === id
				);
				setFoodDetails(selectedFood);
				setLoading(false);
			});
	}, [id]);

	console.log(foodDetails);

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
			<div className="headline-details">
				<BackArrow></BackArrow>
				<h5>Grocery Deals</h5>
			</div>
			<section className="detail-image">
				<div>
					<img
						src={foodDetails.product_image}
						alt={foodDetails.product_name}
					/>
				</div>
				<p className="detail-weight">{foodDetails.product_weight}gr.</p>
				<p className="detail-price">${foodDetails.product_price.toFixed(2)}</p>
				<p className="detail-name">{foodDetails.product_name}</p>
				<p className="detail-rating">
					⭐️ {foodDetails.product_rating}
					{".0"}
				</p>
			</section>
			<section className="quantity-container">
				<p className="quantity-tag">Quantity</p>
				<div className="plus-minus-details">
					<p
						onClick={() => setCount(count - 1 < 0 ? count : count - 1)}
						className="counter"
					>
						-
					</p>
					<p className="counter-details">{count}</p>
					<p
						onClick={() => setCount(count + 1 > 20 ? count : count + 1)}
						className="counter"
					>
						+
					</p>
				</div>
				<div className="cart-icon-container">
					<div>
						<CartDetails className="cart-details" />
						<p>{count}</p>
					</div>
				</div>
				<div className="button-details-container">
					<button>Add to Cart</button>
				</div>
			</section>
			<NavbarBottom></NavbarBottom>
		</div>
	);
};

export default DetailsPage;
