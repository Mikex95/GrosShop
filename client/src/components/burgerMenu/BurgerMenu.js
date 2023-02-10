import "./BurgerMenu.css";
import { Link } from "react-router-dom";
const BurgerMenu = () => {
	return (
		<div class="hamburger-menu">
			<div class="row">
				<input
					type="checkbox"
					id="hamburg"
				/>
				<Link to="/filter">
					<label
						for="hamburg"
						class="hamburg"
					>
						<span
							class="line"
							id="line1"
						></span>
						<span class="line"></span>
						<span class="line"></span>
					</label>
				</Link>
			</div>
		</div>
	);
};

export default BurgerMenu;
