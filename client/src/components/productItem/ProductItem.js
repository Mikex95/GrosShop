import brokkoli from "../../img/brokkoli-test.png";
import heart from "../../img/heart.png";

import "./ProductItem.css";
const ProductItem = (props) => {
	return (
		<div className="product-grid">
			<div className="product-container">
				<div className="article-container-home">
					<div className="images-home-container">
						<img
							className="image-item"
							src={brokkoli}
							alt={props.name}
						/>

						<img
							className="heart-home"
							src={heart}
							alt={props.name}
						/>
					</div>
				</div>

				<h5>{props.name} Test</h5>
				<div className="price-rating-container">
					<p className="price">
						{props.price} 5$ {props.discount} 4$
					</p>
					<p className="rating">☆{props.rating} 5.0</p>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
