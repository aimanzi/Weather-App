import { combineReducers } from "redux";
import userdata from "./userdata";
import weatherdata from "./weatherdata";

const AllReducers = combineReducers({
  user_data: userdata,
  weather_Data: weatherdata,
});

export default AllReducers;
