import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateENV"; // Validates that all env variables are initalized

const cors = require("cors");
app.use(cors());
const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose Connected Sucessfully");
    app.listen(port, () => {
      console.log(`Sever running on port ${port}`);
    });
  })
  .catch(console.error);
