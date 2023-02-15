import "./AddToCart.css";
import { Link } from "react-router-dom";

const AddToCart = ({ text, onClick }) => {
	return (
		<Link className="btn">
			<div>
				<button
					type="submit"
					className="btn-link"
					onClick={onClick}
				>
					{text}
				</button>
			</div>
		</Link>
	);
};

export default AddToCart;
