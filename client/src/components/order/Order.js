import "./Order.css";
import { useEffect, useState } from "react";
const Order = (props) => {
	const [color, setColor] = useState("");
	const [colorPaid, setColorPaid] = useState("");

	const statusColors = {
		Processing: "orange",
		Pending: "lightblue",
		Shipped: "green",
		Canceled: "red",
		Picked: "blue",
		Paid: "green",
		Refunded: "lightgreen",
	};

	useEffect(() => {
		setColor(statusColors[props.status] || "");
		setColorPaid(statusColors[props.paid]);
	}, [props.status, statusColors]);

	return (
		<div className="order-history-component">
			<div className="order-container">
				<h3>{props.order}</h3>
				<div className="status-container">
					<p
						className="order-status"
						style={{ backgroundColor: color }}
					>
						{props.status}
					</p>
					<p
						className="paid-status"
						style={{ backgroundColor: colorPaid }}
					>
						{props.paid}
					</p>
				</div>
			</div>
			<div className="price-container-order">
				<p>{props.endPrice}</p>
				<p>{props.date}</p>
			</div>
		</div>
	);
};

export default Order;
