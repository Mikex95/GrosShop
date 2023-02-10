import "./Location.css";
import { ReactComponent as LocationIcon } from "../../img/location.svg";
import { useState } from "react";
import { ReactComponent as ArrowIconHome } from "../../img/arrow-home.svg";
const Location = () => {
	const [open, setOpen] = useState(false);
	const [city, setCity] = useState("Düsseldorf");
	const handleOpen = () => {
		return setOpen(!open);
	};
	return (
		<div className="dropdown">
			<LocationIcon></LocationIcon>
			<p>{city}</p>
			<button
				className="button-arrow-home"
				onClick={handleOpen}
			>
				<ArrowIconHome />
			</button>
			{open ? (
				<ul className="menu">
					<li className="menu-item">
						<button
							onClick={() => (setCity("Düsseldorf") ? null : setOpen(false))}
						>
							Düsseldorf
						</button>
					</li>
					<li className="menu-item">
						<button onClick={() => (setCity("Berlin") ? null : setOpen(false))}>
							Berlin
						</button>
					</li>
					<li className="menu-item">
						<button
							onClick={() => (setCity("Freiburg") ? null : setOpen(false))}
						>
							Freiburg
						</button>
					</li>
					<li className="menu-item">
						<button
							onClick={() => (setCity("München") ? null : setOpen(false))}
						>
							München
						</button>
					</li>
				</ul>
			) : null}
		</div>
	);
};

export default Location;
