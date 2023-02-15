import "./BurgerMenu.css";
import { Link } from "react-router-dom";
const BurgerMenu = () => {
	return (
		<div className="hamburger-menu">
			<div className="row">
				<input
					type="checkbox"
					id="hamburg"
				/>
				<Link to="/filter">
					<label
						htmlFor="hamburg"
						className="hamburg"
					>
						<span
							className="line"
							id="line1"
						></span>
						<span className="line"></span>
						<span className="line"></span>
					</label>
				</Link>
			</div>
		</div>
	);
};

export default BurgerMenu;
