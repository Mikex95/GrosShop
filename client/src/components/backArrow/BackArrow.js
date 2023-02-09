import { Link } from "react-router-dom";
import { ReactComponent as BackArrowImage } from "../../img/back-arrow.svg";
import "./BackArrow.css";
const BackArrow = ({ props }) => {
	return (
		<div className="back-arrow">
			<Link to="/home">
				<BackArrowImage />
			</Link>
		</div>
	);
};

export default BackArrow;
