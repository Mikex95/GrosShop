import "./Cart.css";
import "../Home/Home.css";
import { apiBaseUrl } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import heart from "../../img/heart.png";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../../img/star7.svg";

const CartItem = (props) => {
	const [counter, setCounter] = useState(0);
	// const [product, setProduct] = useState();
	// const { id: productId } = useParams();

	// useEffect(() => {
	//   fetch(`${apiBaseUrl}/products/${productId}`)
	//     .then((res) => res.json())
	//     .then((productResult) => setProduct(productResult));
	// }, [productId]);

	const increase = () => {
		setCounter((count) => count + 1);
	};

	const decrease = () => {
		if (counter > 0) {
			setCounter((count) => count - 1);
		}
	};

	return (
		<div className="cartitem-container">
			<div className="cartitem">
				<input type="radio" />
				<div className="cartitem-content">
					<img
						className="cartitem-img"
						src={props.product_image}
						alt={props.product_name}
					/>
					<div className="cartitem-data">
						<h3>{props.product_name}</h3>
						<div className="cartitem-review">
							<p>{props.product_weight} gr.</p>
							<p className="rating">
								<Star>{props.product_rating}</Star>
							</p>
						</div>
						<div className="cartitem-price">
							<p>$ {props.product_price}</p>
							<img
								src={heart}
								alt=""
							/>
						</div>
					</div>
					<div className="cartitem-counter">
						<button onClick={decrease}>-</button>
						<p>{counter}</p>
						<button onClick={increase}>+</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
