import "./GreenButton.css";
import { Link } from "react-router-dom";
const GreenButton = ({ text, onClick }) => {
	return (
		<Link className="green-button">
			<button
				type="submit"
				className="green-button-link"
				onClick={onClick}
			>
				{text}
			</button>
		</Link>
	);
};

export default GreenButton;
