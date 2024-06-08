import React from "react";
import TimeDate from "../../timedata/timedate";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";
import "./mainpageheader.css";

interface MainpageheaderProps {}

const Mainpageheader: React.FC<MainpageheaderProps> = (props) => {
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/");
    localStorage.removeItem("persist:weatherApp");
  };

  return (
    <>
      <div className="mainpageheader-container">
        <div>
          <TimeDate />
        </div>
        <div className="buttons-container">
          <Button className="btn btn-danger" onClick={LogOut}>
            <BoxArrowInRight width={25} height={25} />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Mainpageheader;
