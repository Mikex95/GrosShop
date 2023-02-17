import "./HeaderTime.css";
import { useEffect, useState } from "react";
import { ReactComponent as Battery } from "../../img/battery-symbol.svg";

const HeaderTimeWhite = ({ backgroundcolor, color }) => {
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
      <div class="operator-icons" style={{ color: "black" }}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M428.4 27.8v456.4h60.9V27.8h-60.9zM327 168.2v316h60.8v-316H327zM225.4 273.6v210.6h61V273.6h-61zM124 343.8v140.4h60.9V343.8H124zM22.67 394.9v89.3h60.84v-89.3H22.67z"></path>
        </svg>
        5G
        <div class="battery">7%</div>
      </div>
    </div>
  );
};

export default HeaderTimeWhite;
