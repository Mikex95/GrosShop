import { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../img/search-symbole.svg";

const SearchBarCategory = ({ fetch, onFilter }) => {
	const [inputValue, setInputValue] = useState("");
	const [products, setProducts] = useState(fetch);
	const [filteredProducts, setFilteredProducts] = useState(fetch);
	console.log(inputValue);

	const searchHandlerOnChange = (event) => {
		const value = event.target.value;
		setInputValue(value);
		if (value.length > 0) {
			const filterProducts = products.filter((product) => {
				return product.product_name.toLowerCase().includes(value.toLowerCase());
			});
			setFilteredProducts(filterProducts);
			onFilter(filterProducts);
		} else {
			setFilteredProducts(products);
			onFilter(products);
		}
	};

	return (
		<>
			<form className="form-searchbar">
				<SearchIcon className="form-icon" />
				<input
					type="text"
					placeholder="Search for product"
					value={inputValue}
					onChange={searchHandlerOnChange}
				/>
			</form>
		</>
	);
};

export default SearchBarCategory;
