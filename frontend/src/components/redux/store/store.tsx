import { configureStore } from "@reduxjs/toolkit";
import allReducers from "../reducers/allreducers";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "weatherApp",
  storage,
};

const AllReducers = persistReducer(persistConfig, allReducers);

const store = configureStore({
  reducer: {
    AllReducers,
  },
});

store.subscribe(() => {
  var data = store.getState();
  console.log(data);
});

export const persistor = persistStore(store);
export default store;
