import HeaderTime from "../../components/headerTime/HeaderTime";
import BackArrow from "../../components/backArrow/BackArrow";
import SearchBar from "../../components/searchbar/SearchBar";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import ProductItem from "../../components/productItem/ProductItem";
import { useState, useEffect } from "react";
import baguette from "../../img/baguette.png";
import SearchBarCategory from "../../components/searchbar/SearchBarCategory";
import "./Category.css";
const Category = () => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("All");

	const [loading, setLoading] = useState(true);
	const [isActive, setIsActive] = useState(0);

	const categoryButtons = [
		"All",
		"Vegetables",
		"Fruits",
		"Meat",
		"Seafood",
		"Bread",
	];

	useEffect(() => {
		setLoading(true);
		fetch("http://localhost:2202/api/products")
			.then((response) => response.json())
			.then((data) => {
				setCategories([...data.allProducts]);
				setAllProducts(data.allProducts);
				setLoading(false);
			});
	}, []);

	const handleFilteredProducts = (products) => {
		setFilteredProducts(products);
		setCategories(products.length > 0 ? [...products] : [...allProducts]);
	};

	console.log(categories);
	const handlerOnClick = (index, event, category) => {
		event.preventDefault();
		setIsActive(index);
		handleCategoryChange(category);
	};

	const handleCategoryChange = (param) => {
		setSelectedCategory(param);
	};

	function getFilteredList() {
		if (selectedCategory === "All") {
			return categories;
		}
		return categories.filter(
			(category) => category.product_category === selectedCategory
		);
	}

	const filteredList = getFilteredList();

	if (loading) {
		return (
			<div className="loader-container">
				<div className="loader"></div>
			</div>
		);
	}
	return (
		<div>
			<div>
				<HeaderTime
					backgroundcolor="green"
					color={"white"}
				/>
			</div>
			<div className="headline-category">
				<BackArrow></BackArrow>
				<SearchBarCategory
					fetch={allProducts}
					onFilter={handleFilteredProducts}
				/>
			</div>
			<div className="category-buttons">
				{categoryButtons.map((category, index) => {
					return (
						<button
							key={index}
							onClick={(event) => handlerOnClick(index, event, category)}
							style={{
								borderBottom: isActive === index ? "1px solid green" : "",
							}}
						>
							{category}
						</button>
					);
				})}
			</div>
			<div className="product-grid">
				{filteredList.slice(0, 6).map((article, index) => {
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
			<div>
				<img
					src={baguette}
					alt="baguette"
				/>
			</div>
			<div className="category-buttons-bottom">
				{filteredList.slice(7, categories.length).map((article, index) => {
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
			<h3 className="category-available-soon">
				More products will be available soon!
			</h3>
			<NavbarBottom></NavbarBottom>
		</div>
	);
};

export default Category;
