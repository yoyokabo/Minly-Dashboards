
import "dotenv/config";
import express, { NextFunction , Request, Response } from "express";
import usersRoutes from "./routes/users"
import postsRoutes from "./routes/posts"
import mediaRoutes from "./routes/media"
import morgan from "morgan"; // logging endpoint acess
import createHttpError, { isHttpError } from "http-errors"; // HTTP status code handling for errors

const app = express();

app.use(morgan("dev"))

app.use(express.json());


app.use("/api/users/", usersRoutes);

app.use("/api/posts/", postsRoutes);

app.use("/api/media/", mediaRoutes);

app.use((req,res,next) => {
    next(createHttpError(404,"Enpoint not found"));
});

app.use((error: unknown, req: Request, res: Response , next: NextFunction) => {
    console.error(error);
        let errorMessage = "An unknown error has occured";
        let statusCode = 500;
        if (isHttpError(error)) {
            errorMessage = error.message;
            statusCode = error.statusCode;
        };
        res.status(statusCode).json({ error : errorMessage});
    
});

export default app;