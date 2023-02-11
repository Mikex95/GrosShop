import "./DetailsPage.css";
import { useParams } from "react-router-dom";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BackArrow from "../../components/backArrow/BackArrow";
import { useState, useEffect } from "react";
const DetailsPage = (props) => {
	const { id } = useParams();
	const [foodDetails, setFoodDetails] = useState([]);
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	setLoading(true);
	// 	fetch(`http://localhost:2202/api/products/${id}`)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setFoodDetails(data);
	// 			setLoading(false);
	// 		});
	// }, [id]);

	if (loading) {
		return (
			<div className="loader-container">
				<div className="loader"></div>
			</div>
		);
	}

	return (
		<div>
			<HeaderTime backgroundcolor={"green"} />
			<div className="headline-details">
				<BackArrow></BackArrow>
				<h5>Grocery Deals</h5>
			</div>
			<section>
				<div>
					<img
						src=""
						alt={props.name}
					/>
				</div>
				<p>{props.weight}</p>
				<p>{props.name}</p>
				<p>{props.rating}</p>
			</section>
		</div>
	);
};

export default DetailsPage;
