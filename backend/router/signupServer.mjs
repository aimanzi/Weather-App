import express from "express";
import cors from "cors";
const signUpRouter = express();
import signUpHandler from "../handlers/signUpInHandler.mjs";
signUpRouter.use(cors());
signUpRouter.use(express.json());

signUpRouter.post("/signup", signUpHandler.User.signUp);

export default signUpRouter;
