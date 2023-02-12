import heart from "../../img/heart.png";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../../img/star7.svg";

import "./ProductItem.css";
const ProductItem = (props) => {
	return (
		<div className="product-container">
			<Link to={`/${props.id}`}>
				<div className="article-container-home">
					<div className="images-home-container">
						<img
							className="image-item"
							src={props.image}
							alt={props.name}
						/>

						<img
							className="heart-home"
							src={heart}
							alt={props.name}
						/>
					</div>
				</div>

				<h5>{props.name}</h5>
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
