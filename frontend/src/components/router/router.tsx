import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../signin/signin";
import Signup from "../signup/signup";
import Mainpage from "../mainpage/mainpage";
import homepage from "../homepage/homepage";

interface RouterProps {}

const Router: React.FC<RouterProps> = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" Component={homepage} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/mainpage" Component={Mainpage} />
      </Routes>
    </>
  );
};

export default Router;
