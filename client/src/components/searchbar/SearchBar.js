import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../img/search-symbole.svg";
import "./SearchBar.css";
const SearchBar = (props) => {
	const navigate = useNavigate();
	const [articles, setArticles] = useState(props.fetch);

	const searchHandler = (event) => {
		event.preventDefault();

		let inputValue = event.target[0].value.toLowerCase();
		event.target[0].value = "";
		if (inputValue.length < 2) {
			return;
		}

		const matchingProducts = articles.filter((product) =>
			product.product_name.toLowerCase().includes(inputValue)
		);

		if (matchingProducts.length > 0) {
			navigate(`/${matchingProducts[0]._id}`);
		} else return;
	};

	return (
		<>
			<form
				onSubmit={searchHandler}
				className="form-searchbar"
			>
				<SearchIcon className="form-icon" />
				<input
					type="text"
					placeholder="Search for product"
				/>
			</form>
		</>
	);
};

export default SearchBar;
