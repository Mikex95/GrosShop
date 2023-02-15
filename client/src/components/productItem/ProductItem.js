import heart from "../../img/heart.png";
import heartRed from "../../img/heart-red.png";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../../img/star7.svg";
import { useState } from "react";

import "./ProductItem.css";
const ProductItem = (props) => {
	const [isChecked, setIsChecked] = useState(true);

	const toggleCheck = (event) => {
		event.preventDefault();
		setIsChecked(!isChecked);
		if (isChecked) {
			addItemToWishList(event);
		} else {
			removeItemFromWishList(event);
		}
	};

	const addItemToWishList = (event) => {
		event.preventDefault();
		// Test
		const accessToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ViYzljM2FlNzIxZDQxNDQ3YTI1ZDEiLCJpYXQiOjE2NzY0NTg4NjAsImV4cCI6MTY3NjQ2NDg2MH0.QIz8-55mz4waVzUZcNe9k4FztcPopt3PxwBDn4ucr48";
		// Test
		const product = {
			itemId: props.id,
		};
		fetch("http://localhost:2202/api/user/wishlist/additem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + accessToken,
			},
			body: JSON.stringify(product),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const removeItemFromWishList = (event) => {
		event.preventDefault();
		// Test
		const accessToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ViYzljM2FlNzIxZDQxNDQ3YTI1ZDEiLCJpYXQiOjE2NzY0NTg4NjAsImV4cCI6MTY3NjQ2NDg2MH0.QIz8-55mz4waVzUZcNe9k4FztcPopt3PxwBDn4ucr48";
		// Test
		const productId = props.id;
		fetch(`http://localhost:2202/api/user/wishlist/deleteitem/${productId}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="product-container">
			<Link to={`/product/${props.id}`}>
				<div className="article-container-home category-effect">
					<div className="images-home-container">
						<img
							className="image-item category-effect"
							src={props.image}
							alt={props.name}
						/>

						<img
							onClick={toggleCheck}
							className="heart-home category-effect"
							src={isChecked === false ? heartRed : heart}
							alt={props.name}
						/>
					</div>
					<h5>{props.name.slice(0, 21)}</h5>
				</div>

				<div className="price-rating-container">
					<p className="price">
						{props.price}$ {props.discount}
					</p>
					<p className="rating">
						<Star></Star> {props.rating.toFixed(1)}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default ProductItem;
