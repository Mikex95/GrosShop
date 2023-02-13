import "./Filter.css";
import { Link } from "react-router-dom";
import BackArrow from "../../components/backArrow/BackArrow";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import ProductItem from "../../components/productItem/ProductItem";
import { useState, useEffect } from "react";
const Filter = () => {
	const [inputValue, setInputValue] = useState(10);
	const [activeButton, setActiveButton] = useState(0);
	const [activeBtnBottom, setActiveBtnBottom] = useState(0);
	const [filterInput, setFilterInput] = useState([]);
	const [productFetch, setProductFetch] = useState([]);
	const [loading, setLoading] = useState(true);
	const buttonTop = ["Lowest", "Highest", "Best", "All"];
	const buttonBottom = [
		"Fruits",
		"Seafood",
		"Bread",
		"Vegetables",
		"Organic",
		"Milk & Egg",
		"Meat",
		"All",
	];
	const [currentUrl, setCurrentUrl] = useState(
		"http://localhost:2202/api/products"
	);

	useEffect(() => {
		setLoading(true);
		fetch(currentUrl)
			.then((response) => response.json())
			.then((data) => {
				setProductFetch(data.allProducts);
				setLoading(false);
			});
	}, [currentUrl]);

	useEffect(() => {
		if (activeButton === 3) {
			setActiveBtnBottom(7);
		}
		if (activeButton !== 3) {
			setActiveBtnBottom(0);
		}
	}, [activeButton]);

	if (loading) {
		return (
			<div className="loader-container">
				<div className="loader"></div>
			</div>
		);
	}

	const eventHandler = (event) => {
		event.preventDefault();
		setInputValue(event.target.value);
	};

	const handleButtonClick = (index, event) => {
		event.preventDefault();
		setActiveButton(index);
	};

	const handleButtonBottom = (index, event) => {
		event.preventDefault();
		setActiveBtnBottom(index);
	};

	const filterHandlerApply = (event) => {
		event.preventDefault();

		const filteredProducts = productFetch.filter((product) => {
			if (activeButton === 0 && activeBtnBottom <= 8 && inputValue) {
				return (
					product.product_price <= inputValue &&
					product.product_category === buttonBottom[activeBtnBottom]
				);
			} else if (activeButton === 1 && activeBtnBottom <= 8 && inputValue) {
				return (
					product.product_price >= inputValue &&
					product.product_category === buttonBottom[activeBtnBottom]
				);
			} else if (activeButton === 2 && activeBtnBottom <= 8) {
				return (
					product.product_rating >= 4.7 &&
					product.product_category === buttonBottom[activeBtnBottom] &&
					product.product_price <= inputValue
				);
			} else if (activeButton === 3 && activeBtnBottom <= 7) {
				return product.product_category && product.product_price <= inputValue;
			}
		});

		setFilterInput(filteredProducts);
	};
	console.log(filterInput);

	return (
		<div className="filter-container">
			<HeaderTime
				backgroundcolor={"green"}
				color={"white"}
			/>
			<div className="headline-details">
				<BackArrow></BackArrow>
				<h5>Filters</h5>
			</div>
			<div className="sortby-container">
				<h3>Sort By</h3>
				<p>All Clear</p>
			</div>
			<div className="filter-checkbox">
				{buttonTop.map((button, index) => (
					<button
						key={index}
						onClick={(event) => handleButtonClick(index, event)}
						style={{
							backgroundColor: activeButton === index ? "green" : "",
							color: activeButton === index ? "white" : "",
						}}
					>
						{button}
					</button>
				))}
			</div>
			<h3 className="filter-price">Price</h3>
			<div className="price-range">
				<p>$10</p>
				<p className="input-value-filter">${inputValue}</p>
				<p>$100</p>
			</div>
			<div className="range-filter-container">
				<input
					type="range"
					className="range-filter"
					min="10"
					max="100"
					step={10}
					onChange={eventHandler}
					value={inputValue}
				/>
			</div>
			<h3 className="filter-price">Category</h3>
			<div className="filter-checkbox">
				{buttonBottom.map((category, index) => {
					return (
						<button
							key={index}
							onClick={(event) => handleButtonBottom(index, event)}
							style={{
								backgroundColor: activeBtnBottom === index ? "green" : "",
								color: activeBtnBottom === index ? "white" : "",
							}}
						>
							{category}
						</button>
					);
				})}
			</div>
			<div className="product-grid-filter">
				{filterInput.map((article, index) => {
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
			<div className="apply-button">
				<Link onClick={filterHandlerApply}>Apply</Link>
			</div>
			<NavbarBottom></NavbarBottom>
		</div>
	);
};

export default Filter;
