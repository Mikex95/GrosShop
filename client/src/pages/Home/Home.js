import "./Home.css";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import SearchBar from "../../components/searchbar/SearchBar";
import Location from "../../components/location/Location";

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
		</div>
	);
};

export default Home;
