import React, { useState } from "react";
import "./signin.css";
import { ButtonGroup, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserData } from "../redux/reducers/userdata";
import Loader1 from "../loader/loader";

interface SigninProps {}

const Signin: React.FC<SigninProps> = (props) => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errormsg, setErrorMsg] = useState<string>("");
  const [isLoder, setIsLOder] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HomePage = () => {
    navigate("/");
  };

  const LogIn = async () => {
    if (username === "" && password === "") {
      setErrorMsg("user & mail is empty");
    } else {
      if (username === "") {
        setErrorMsg("username is missing");
      } else {
        if (password === "") {
          setErrorMsg("password is missing");
        } else {
          const loginData = {
            username,
            password,
          };

          const Postdata = {
            method: "POST",
            headers: {
              "Access-Control": "Allow-Origin",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          };

          setIsLOder(true);
          await fetch("http://localhost:5000/login", Postdata)
            .then((response) => response.json())
            .then((data) => {
              if (data.staus) {
                dispatch(addUserData(data.userdata));
                navigate("/mainpage");
              } else {
                setErrorMsg(data.message);
              }
            })
            .catch((error) => {
              console.log(error);
              setIsLOder(false);
            });
        }
      }
    }
  };

  return (
    <>
      {isLoder ? <Loader1 /> : ""}
      <div className="singInForm">
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <ButtonGroup className="alert">
          <Button type="submit" className="btn btn-secondary" onClick={LogIn}>
            Submit
          </Button>
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={HomePage}
          >
            Home Page
          </Button>
        </ButtonGroup>
        <div className="register-link">
          <h6>
            Not Register yet ?
            <Link className="link" to={"/signup"}>
              Sign Up
            </Link>
          </h6>
        </div>
        <div className="msg-container">
          <label>{errormsg}</label>
        </div>
      </div>
    </>
  );
};

export default Signin;

