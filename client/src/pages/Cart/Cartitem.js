import "./Cart.css";
import "../Home/Home.css";
import { useState, useEffect } from "react";
import heart from "../../img/heart.png";
import { ReactComponent as Star } from "../../img/star7.svg";

const CartItem = (props) => {
	const [counter, setCounter] = useState(0);

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
