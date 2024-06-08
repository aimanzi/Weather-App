import { createSlice } from "@reduxjs/toolkit";

const weatherData = createSlice({
  name: "weatherData",
  initialState: null,
  reducers: {
    addWeatherData: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { addWeatherData } = weatherData.actions;
export default weatherData.reducer;
