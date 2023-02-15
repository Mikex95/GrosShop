import "./Error404.css";
import { Link } from "react-router-dom";
import GreenButton from "../../components/buttons/GreenButton";
const Error404 = () => {
	return (
		<div className="error404">
			<h1>
				Error 404 <br></br> Page Not Found
			</h1>
			<p>Sorry, the page you are looking for does not exist.</p>
			<Link>
				<GreenButton
					text={"Back to Login"}
					color="white"
					size="18px"
				></GreenButton>
			</Link>
		</div>
	);
};

export default Error404;
