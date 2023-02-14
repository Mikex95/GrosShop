import "./NavbarBottom.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "../../img/navbar-back.svg";
import { ReactComponent as Home } from "../../img/navbar-home.svg";
import { ReactComponent as Recent } from "../../img/navbar-recent.svg";

const NavbarBottom = () => {
	const navigate = useNavigate();
	return (
		<div className="navbar-bottom-container">
			<div className="navbar-bottom">
				<Link onClick={() => navigate(-1)}>
					<Back></Back>
				</Link>
				<Link to="/home">
					<Home></Home>
				</Link>
				<Link>
					<Recent></Recent>
				</Link>
			</div>
		</div>
	);
};

export default NavbarBottom;
