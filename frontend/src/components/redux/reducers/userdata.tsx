import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
  name: "userdata",
  initialState: null,
  reducers: {
    addUserData: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUserData } = userSlicer.actions;
export default userSlicer.reducer;
