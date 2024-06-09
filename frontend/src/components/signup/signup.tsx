import React, { useState } from "react";
import "./signup.css";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";

interface SignupProps {}

const Signup: React.FC<SignupProps> = (props) => {
  const [fullname, setFullName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRePassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [mailCheckMsg, setMailCheckMsg] = useState<string>("");
  const [passwordCheckMsg, setPasswordCheckMsg] = useState<string>("");
  const [isLoder, setIsLOder] = useState<boolean>(false);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);

  console.log(msg);

  const navigate = useNavigate();
  const HomePage = () => {
    navigate("/");
  };

  const SignUpValidation = () => {
    if (
      fullname === "" ||
      password === "" ||
      mail === "" ||
      repassword === ""
    ) {
      setIsModalShow(true);
      setMsg("some data is missing");
    } else {
      const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      );
      const passwordRegex = new RegExp(
        /^(?!.*[#!])(?=.*[A-Z])(?=.*[0-9]).{8,}$/
      );
      if (!emailRegex.test(mail)) {
        setIsModalShow(true);
        setMsg("Mail must meet the specified criteria.");
      } else {
        setMailCheckMsg(`Mail Cheked`);
        if (!passwordRegex.test(password)) {
          setIsModalShow(true);
          setMsg("Password must meet the specified criteria.");
        } else {
          if (repassword === password) {
            setPasswordCheckMsg(`Password Cheked`);
            ToSignUp();
          } else {
            setIsModalShow(true);
            setMsg("Passwords Not Match");
          }
        }
      }
    }
  };

  const ToSignUp = async () => {
    setIsLOder(true);

    const signupData = {
      fullname,
      mail,
      password,
    };

    const Postdata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, ",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    };
    await fetch("http://localhost:5000/signup", Postdata)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.staus === true) {
          ClearInputs();
          setIsLOder(false);
        } else {
          if (data.message.errorResponse.code === 11000) {
            setIsModalShow(true);
            setMsg("User is exists,change mail");
            setIsLOder(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLOder(false);
      });
  };

  const ClearInputs = () => {
    setFullName("");
    setMail("");
    setPassword("");
    setRePassword("");
    setMailCheckMsg("");
    setPasswordCheckMsg("");
  };

  return (
    <>
      {isLoder ? <Loader /> : ""}
      <div className="singUpForm">
        <Form.Group>
          <Form.Label>Full Name :</Form.Label>
          <Form.Control
            value={fullname}
            type="text"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <Form.Label>Mail :</Form.Label>
          <Form.Control
            value={mail}
            type="email"
            required
            onChange={(e) => setMail(e.target.value)}
          />
          <Form.Label>Password :</Form.Label>
          <Form.Control
            value={password}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label>Re-Password :</Form.Label>
          <Form.Control
            value={repassword}
            type="password"
            required
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Group>
        <ButtonGroup className="alert">
          <Button
            type="submit"
            className="btn btn-secondary"
            onClick={SignUpValidation}
          >
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
        <div>
          <h5>{mailCheckMsg}</h5>
          <h5>{passwordCheckMsg}</h5>
        </div>
        <Modal show={isModalShow}>
          <Modal.Header>Error Message</Modal.Header>
          <Modal.Body>{msg}</Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setIsModalShow(false)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Signup;
