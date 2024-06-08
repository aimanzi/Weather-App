import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./timadate.css";

const TimeDate: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const username = useSelector(
    (state: any) => state.AllReducers.user_data.user
  );

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const time: string = `${hours}:${minutes < 10 ? "0" : ""}${minutes} `;

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const date = `${day}/${month < 10 ? "0" : ""}${month}/${year}`;
      setCurrentTime(time);
      setCurrentDate(date);

      const status = ampm === "PM" ? "Good Evening " : "Good Morning ";
      setStatus(status);
    };
    updateCurrentTime();
  }, [status, currentTime]);

  return (
    <div className="timedata-container">
      <h5 className="time-container">{`Date:${currentDate}  , Time:${currentTime}`}</h5>
      <h5 className="name-container">{status + " " + username}</h5>
    </div>
  );
};

export default TimeDate;
