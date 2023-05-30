import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function fire() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🛢️ Connected To Database");
    app.listen(config.port, () => {
      console.log(`Server Fire in http:localhost//${config.port}`);
    });
  } catch (error) {
    console.log("Error to connect Database");
  }
}
fire();
