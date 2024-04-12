import app from "./app"
import mongoose from "mongoose";
import env from "./utils/validateENV" // Crashes if any env var is undefined


const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
    console.log("Mongoose Connected Sucessfully")
    app.listen(port, () => {
        console.log(`Sever running on port ${port}`);
    });
})
.catch(console.error);





