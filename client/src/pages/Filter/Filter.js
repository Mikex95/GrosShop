import "./Filter.css";
import { Link } from "react-router-dom";
import BackArrow from "../../components/backArrow/BackArrow";
import HeaderTime from "../../components/headerTime/HeaderTime";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import { useState } from "react";
const Filter = () => {
	const buttonTop = ["Lowest", "Highest", "Best", "Newest"];
	const buttonBottom = [
		"Fruits",
		"Seafood",
		"Bread",
		"Frozen",
		"Organic",
		"Milk & Egg",
		"Meat",
	];
	const [inputValue, setInputValue] = useState(60);
	const [activeButton, setActiveButton] = useState(0);
	const [activeBtnBottom, setActiveBtnBottom] = useState(0);

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
				<p>$0</p>
				<p className="input-value-filter">${inputValue}</p>
				<p>$100</p>
			</div>
			<div className="range-filter-container">
				<input
					type="range"
					className="range-filter"
					min="0"
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
			<div className="apply-button">
				<Link to="/category">Apply</Link>
			</div>
			<NavbarBottom></NavbarBottom>
		</div>
	);
};

export default Filter;
