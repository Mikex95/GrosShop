import { Link } from "react-router-dom";
import "./GreenButton.css";
const GreenButton = ({ text }) => {
	return (
		<div className="green-button">
			<Link className="green-button-link">{text}</Link>
		</div>
	);
};

export default GreenButton;
