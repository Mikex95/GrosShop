import "./Home.css";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import SearchBar from "../../components/searchbar/SearchBar";
import Location from "../../components/location/Location";
import vegetables from "../../img/vegetables-home.png";
import fruits from "../../img/fruits-home.png";
import meat from "../../img/meat-home.png";
import arrowright from "../../img/ArrowRight.png";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<HeaderTime backgroundcolor="green" />
			<Location />
			<div className="searchbar-container">
				<BurgerMenu />
				<SearchBar />
			</div>
			<div className="discount-grid-container">
				<div className="image-container-discount">
					<div className="text-container">
						<h3>Get 20% off</h3>
					</div>
				</div>
				<div className="image-container-discount">
					<div className="text-container">
						<h3>Get 20% off</h3>
					</div>
				</div>
			</div>
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
					<p>Vegetable</p>
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
			<NavbarWishlist />
			<NavbarBottom></NavbarBottom>
		</div>
	);
};

export default Home;
