import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config("../.env");
const mainserver = express();
mainserver.use(cors());
mainserver.use(express.json());
const port = process.env.PORT;
import ConnectingToDb from "../connectToDb/connectToDB.mjs";
import signUpRouter from "../router/signupServer.mjs";
import signInRouter from "../router/signinServer.mjs";

mainserver.get("/", (req, res) => {
  console.log("main server is running");
  res.json({ message: "main server is running", status: true });
});

ConnectingToDb.ConnectToDB.connent();
mainserver.use(signUpRouter);
mainserver.use(signInRouter);

mainserver.listen(port, () => {
  console.log(`the server is listen to port http://localhost:${port}`);
});
