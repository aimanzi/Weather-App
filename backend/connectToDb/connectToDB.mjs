import { url } from "inspector";
import mongoos from "mongoose";

class ConnectToDB {
  static async connent() {
    const url =
      "mongodb+srv://aimanzi:12345@cluster0.uwqonav.mongodb.net/WhetherApp";
    await mongoos
      .connect(url)
      .then(() => {
        console.log("Data Base Status:Connected to MongoDB");
      })
      .catch((err) => {
        console.error("DataBase Status:Conection Faild :", err);
      });
  }

  static async DisConnect() {
    mongoos
      .disconnect()
      .then(() => {
        console.log("DataBase staus:", "disconnecting from MongoDB Succsess");
      })
      .catch((err) => {
        console.error("DataBase Status:DisConection Faild :", err);
      });
  }
}

export default { ConnectToDB };
