import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../img/search-symbole.svg";
import "./SearchBar.css";
const SearchBar = () => {
	const navigate = useNavigate();

	const searchHandler = (event) => {
		// Neu laden verhindern
		event.preventDefault();

		// Feld auslesen und leeren
		let inputValue = event.target[0].value.toLowerCase();
		event.target[0].value = "";

		// Fetch Pokemon-Daten
		fetch(`http://localhost:2202/api/products`)
			.then((response) => response.json())
			.then((data) => {
				navigate(`/details/${data._id}`);
			});
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
