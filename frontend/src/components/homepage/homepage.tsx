import React from "react";
import "./homepage.css";
import Header from "../headers/homepageheader/homepageheader";

interface MainpageProps {}

const Mainpage: React.FC<MainpageProps> = (props) => {
  return (
    <>
      <div className="homepage-container">
        <Header />
      </div>
    </>
  );
};

export default Mainpage;
