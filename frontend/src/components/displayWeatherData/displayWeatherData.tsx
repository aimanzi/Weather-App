import React, { useState } from "react";
import "./displayWeatherData.css";
import { ButtonGroup, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  GeoAltFill,
  Search,
  Thermometer,
  ThermometerHigh,
  ThermometerLow,
  TrashFill,
  Wind,
} from "react-bootstrap-icons";
import weatherStatus from "../weatherstatus/weatherstatus";
import Loader from "../loader/loader";
import { useDispatch } from "react-redux";
import { addWeatherData } from "../redux/reducers/weatherdata";

interface DisplayWeatherDataProps {}

const DisplayWeatherData: React.FC<DisplayWeatherDataProps> = (props) => {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<any>({});
  const [weaterDescription, setWeatherDescription] = useState<any>();
  const [show, setShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [isLoder, setIsLOder] = useState<boolean>(false);
  const dispach = useDispatch();

  const sendLocation = async () => {
    setIsLOder(true);
    if (location === "") {
      setIsLOder(false);
      setMsg("Location is empty, please insert a valid location");
      setModalShow(true);
    } else {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d3629488927c8ef15b164107cd100d9&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.cod === "404") {
            setShow(false);
            setMsg(data.message);
            setModalShow(true);
            clearInput();
            setIsLOder(false);
          } else {
            setWeather(data);
            dispach(addWeatherData(data));
            setWeatherDescription(data.weather[0]);
            setIsLOder(false);
            setShow(true);
            setMsg("");
          }
        })
        .catch((error) => {
          console.error("Error fetching the weather data:", error);
          setMsg("An error occurred while fetching the weather data");
          setModalShow(true);
        });
    }
  };

  const clearInput = () => {
    setShow(false);
    setLocation("");
  };

  return (
    <>
      {isLoder ? <Loader></Loader> : ""}
      <div className="mainfetch-container">
        <h5>
          <GeoAltFill style={{ color: "red", width: "35", height: "35" }} />
          Enter Location :
        </h5>
        <ButtonGroup>
          <input
            type="text"
            value={location}
            required
            placeholder="insert location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button className="btn btn-dark" onClick={sendLocation}>
            <Search />
          </Button>
          <Button className="btn btn-danger" onClick={clearInput}>
            <TrashFill />
          </Button>
        </ButtonGroup>
      </div>
      {show ? (
        <div className="weathertemp-con">
          <h2 style={{ color: "blue" }}> {weather.name}</h2>
          <img alt="img" />
          <h5 style={{ color: "turquoise" }}>
            {weaterDescription.description}
          </h5>
          <h5>
            <Thermometer style={{ color: "green" }} />
            temp: {weather.main.temp + "C"}
          </h5>
          <h5>Feels Like: {weather.main.feels_like + "C"}</h5>
          <h5>
            <ThermometerHigh style={{ color: "red" }} /> temp_max:{" "}
            {weather.main.temp_max + "C"}
          </h5>
          <h5>
            <ThermometerLow style={{ color: "blue" }} />
            temp_min : {weather.main.temp_min + "C"}
          </h5>
          <h5>
            <Wind style={{ color: "white" }} />
            Wind Speed : {weather.wind.speed}
          </h5>
          <h5>Pressure: {weather.main.pressure}</h5>
        </div>
      ) : (
        ""
      )}
      <Modal show={modalShow}>
        <Modal.Header>Error Message</Modal.Header>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setModalShow(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayWeatherData;
