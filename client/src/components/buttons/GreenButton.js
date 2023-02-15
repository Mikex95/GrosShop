import "./GreenButton.css";
import { Link } from "react-router-dom";
const GreenButton = ({ text, onClick, color, size }) => {
	return (
		<Link
			to="/signin"
			className="green-button"
		>
			<button
				style={{ color: color, fontSize: size }}
				type="submit"
				className="green-button-link category-subhead"
				onClick={onClick}
			>
				{text}
			</button>
		</Link>
	);
};

export default GreenButton;
