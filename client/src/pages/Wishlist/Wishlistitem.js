import "../Home/Home.css";
import "./WishlistItem.css";
import { useState, useEffect } from "react";
import { ReactComponent as Trash } from "../../img/trash.svg";
import heart from "../../img/heart.png";
import { ReactComponent as Star } from "../../img/star7.svg";

const WishlistItem = (props) => {
	const [counter, setCounter] = useState(0);
	const [isDeleted, setIsDeleted] = useState(false);
	const increase = () => {
		setCounter((count) => count + 1);
	};

	const decrease = () => {
		if (counter > 0) {
			setCounter((count) => count - 1);
		}
	};
	const handleDelete = () => {
		const productId = props.id;
		fetch(`http://localhost:2202/api/user/wishlist/deleteitem/${productId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${props.accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
		setIsDeleted(true);
	};
	if (isDeleted) {
		return null;
	}

	return (
		<div className="cartitem-container">
			<div className="cartitem">
				<div className="cartitem-content">
					<img
						className="cartitem-img"
						src={props.image}
						alt={props.name}
					/>
					<div className="cartitem-data">
						<h3>{props.name}</h3>
						<div className="cartitem-review">
							<p>{props.weight} gr.</p>
							<p className="rating">
								{props.rating.toFixed(1)} <Star></Star>
							</p>
						</div>
						<div className="cartitem-price">
							<p>$ {props.price}</p>
							<img
								src={heart}
								alt="heart"
							/>
						</div>
					</div>
					<div className="cartitem-counter">
						<button onClick={decrease}>-</button>
						<p>{counter}</p>
						<button onClick={increase}>+</button>
					</div>
				</div>
				<div className="trash-item">
					<Trash onClick={handleDelete} />
				</div>
			</div>
		</div>
	);
};

export default WishlistItem;
