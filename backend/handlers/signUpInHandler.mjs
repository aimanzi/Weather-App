import { createHash, createHmac } from "crypto";
import SignUpSchema from "../models/signup.mjs";
import HmacSHA256 from "crypto-js/hmac-sha256.js";
import { env } from "process";

class User {
  static signUp(req, res) {
    console.log("user signup");
    const userData = req.body;
    const signupdata = SignUpSchema;
    const user = req.body.fullname;
    const mail = userData.mail;
    const password = createHash("sha256")
      .update(userData.password + process.env.KEY)
      .digest("base64");

    const newUserData = {
      user,
      mail,
      password,
    };

    newUserData === ""
      ? console.log("data is missing")
      : signupdata
          .insertMany(newUserData)
          .then((result) => {
            if (result) {
              console.log("user signup succsess");
              res.json({
                message: "user signup succsess",
                staus: true,
                userdata: result,
              });
            }
          })
          .catch((err) => {
            res.json({ message: err, staus: false });
          });
  }

  static signIn(req, res) {
    console.log("user signin");
    const userData = req.body;
    const mail = userData.username;
    const password = createHash("sha256")
      .update(userData.password + process.env.KEY)
      .digest("base64");
    const signindata = SignUpSchema;
    userData === ""
      ? console.log("data is missing")
      : signindata
          .findOne({ mail, password })
          .then((result) => {
            if (result) {
              console.log("user signin succsess");
              res.json({
                message: "user signin succsess",
                staus: true,
                userdata: result,
              });
            } else {
              console.log("user signin failed");
              res.json({
                message: "user signin failed,invalid user/password",
                staus: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({ message: "user signin failed", staus: false });
          });
  }
}

export default { User };
