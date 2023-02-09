import GreenButton from "../components/buttons/GreenButton";
import HeaderTime from "../components/headerTime/HeaderTime";
import NavbarBottom from "../components/navbar/NavbarBottom";
import BackArrow from "../components/backArrow/BackArrow";

const TestComponents = () => {
	return (
		<div>
			<HeaderTime backgroundcolor="white" />
			<BackArrow />
			<GreenButton text="Sign In" />
			<NavbarBottom />
		</div>
	);
};

export default TestComponents;
