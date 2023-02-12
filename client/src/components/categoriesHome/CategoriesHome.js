import { Link } from "react-router-dom";
import vegetables from "../../img/vegetables-home.png";
import fruits from "../../img/fruits-home.png";
import meat from "../../img/meat-home.png";
import arrowright from "../../img/ArrowRight.png";
import "./CategoriesHome.css";
const CategoriesHome = () => {
	return (
		<section className="categories-grid-home">
			<div>
				<Link to="/vegetables">
					<img
						src={vegetables}
						alt="vegetables"
					/>
				</Link>
				<div className="shadow-container">
					<div className="shadow-categories"></div>
				</div>
				<p>Vegetables</p>
			</div>
			<div>
				<Link to="/fruits">
					<img
						src={fruits}
						alt="fruits"
					/>
				</Link>
				<div className="shadow-container">
					<div className="shadow-categories"></div>
				</div>
				<p>Fruits</p>
			</div>
			<div>
				<Link to="/meat">
					<img
						src={meat}
						alt="meat"
					/>
				</Link>
				<div className="shadow-container">
					<div className="shadow-categories"></div>
				</div>
				<p>Meat</p>
			</div>
			<div>
				<Link to="/categories">
					<div className="gray-circle">
						<img
							src={arrowright}
							alt="arrow-symbol"
						/>
					</div>
				</Link>
				<div className="shadow-container">
					<div className="shadow-categories"></div>
				</div>
				<p>More</p>
			</div>
		</section>
	);
};

export default CategoriesHome;
