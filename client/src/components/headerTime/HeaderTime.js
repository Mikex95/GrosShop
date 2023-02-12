import "./HeaderTime.css";
import { useEffect, useState } from "react";
import { ReactComponent as Battery } from "../../img/battery-symbol.svg";

const HeaderTime = ({ backgroundcolor, color }) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const hour = time.getHours();
	const minutes = time.getMinutes();

	function addZero(minutes) {
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return minutes;
	}
	return (
		<div className={`header-time-container ${backgroundcolor}`}>
			<p style={{ color: color }}>
				<span>{hour}</span>:<span>{addZero(minutes)}</span>
			</p>
			<p>
				<Battery></Battery>
			</p>
		</div>
	);
};

export default HeaderTime;
