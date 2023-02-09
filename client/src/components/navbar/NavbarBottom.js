import "./NavbarBottom.css";
import { Link } from "react-router-dom";
import { ReactComponent as Back } from "../../img/navbar-back.svg";
import { ReactComponent as Home } from "../../img/navbar-home.svg";
import { ReactComponent as Recent } from "../../img/navbar-recent.svg";

const NavbarBottom = () => {
	return (
		<div className="navbar-bottom-container">
			<div className="navbar-bottom">
				<Link>
					<Back></Back>
				</Link>
				<Link>
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
