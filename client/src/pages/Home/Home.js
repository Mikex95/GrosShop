import "./Home.css";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import SearchBar from "../../components/searchbar/SearchBar";
import Location from "../../components/location/Location";
import CategoriesHome from "../../components/categoriesHome/CategoriesHome";
import fries from "../../img/fries-home.png";
import ProductItem from "../../components/productItem/ProductItem";
import { useEffect, useState } from "react";

const Home = () => {
	const [articles, setArticle] = useState([]);
	const [loading, setLoading] = useState(true);

	const [currentUrl, setCurrentUrl] = useState(
		"http://localhost:2202/api/products"
	);

	useEffect(() => {
		setLoading(true);
		fetch(currentUrl)
			.then((response) => response.json())
			.then((data) => {
				setArticle(data.allProducts);
				setLoading(false);
			});
	}, [currentUrl]);

	if (loading) {
		return (
			<div className="loader-container">
				<div className="loader"></div>
			</div>
		);
	}

	return (
		<div>
			<HeaderTime backgroundcolor="green" />
			<Location />
			<div className="searchbar-container">
				<BurgerMenu />
				<SearchBar fetch={articles} />
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
			<CategoriesHome />
			<section className="product-deals-home">
				<h5 className="deals">Today Grocery Deals</h5>
				<div className="product-grid">
					{articles.slice(16, 22).map((article, index) => {
						return (
							<ProductItem
								key={index}
								name={article.product_name}
								price={article.product_price}
								rating={article.product_rating}
								image={article.product_image}
								id={article._id}
							></ProductItem>
						);
					})}
				</div>
			</section>
			<NavbarWishlist />
			<NavbarBottom></NavbarBottom>
			<section className="image-fries-home">
				<img
					src={fries}
					alt="fries"
				/>
			</section>
			<section className="product-deals-home">
				<h5 className="deals">Grocery Member Deals</h5>
				<div className="product-grid">
					{articles.slice(5, 8).map((article, index) => {
						return (
							<ProductItem
								key={index}
								name={article.product_name}
								price={article.product_price}
								rating={article.product_rating}
								image={article.product_image}
								id={article._id}
							></ProductItem>
						);
					})}
				</div>
			</section>
		</div>
	);
};

export default Home;
