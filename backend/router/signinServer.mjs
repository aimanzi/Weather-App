import express from "express";
import cors from "cors";
import signInHandler from "../handlers/signUpInHandler.mjs";
const signInRouter = express();
signInRouter.use(cors());
signInRouter.use(express());
signInRouter.post("/login", signInHandler.User.signIn);

export default signInRouter;
