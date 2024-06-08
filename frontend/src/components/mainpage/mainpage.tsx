import React from "react";
import "./mainpage.css";
import Mainpageheader from "../headers/mainpageheader/mainpageheader";
import DisplayWeatherData from "../displayWeatherData/displayWeatherData";

interface MainpageProps {}

const Mainpage: React.FC<MainpageProps> = (props) => {
  return (
    <div className="mainpage-container">
      <div className="header-con">
        <Mainpageheader />
      </div>
      <div className="display-con">
        <DisplayWeatherData />
      </div>
    </div>
  );
};

export default Mainpage;
