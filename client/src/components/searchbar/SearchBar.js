import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../img/search-symbole.svg";
import "./SearchBar.css";
const SearchBar = () => {
	//Hier kommt normalerweise der Fetch hin anstatt das Testobject
	const food = [
		{
			name: "Banane",
			price: 5,
			rating: 5,
		},
		{
			name: "Burger",
			price: 8,
			rating: 4,
		},
		{
			name: "Nuesse",
			price: 3,
			rating: 5,
		},
		{
			name: "Fleisch",
			price: 10,
			rating: 5,
		},
	];
	const [searchInput, setSearchInput] = useState("");
	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};
	const filteredFood = food.filter((article, index) => {
		if (searchInput.length > 0) {
			const lowerCase = article.name.toLowerCase();
			return lowerCase.includes(searchInput.toLowerCase());
		}
	});
	return (
		<>
			<form className="form-searchbar">
				<SearchIcon className="form-icon" />
				<input
					type="text"
					placeholder="Search for product"
					onChange={handleChange}
					value={searchInput}
				/>
			</form>
			<div>
				{filteredFood.map((article, index) => {
					return (
						<div key={index}>
							<h5>{article.name}</h5>
							<p>{article.price}€</p>
							<p>⭐️{article.rating}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default SearchBar;
