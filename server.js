import express from "express"
import blogRouter from "./routes/blog.js"
import userRouter from "./routes/user.js"
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB } from "./database/db.js";
import cors from "cors";

const app = express();

config({
    path: "./database/config.env",
});
connectDB();

    app.use(express.json({ limite: "16kb" }));
    app.use(cookieParser());
    app.use(
        cors({
            origin: [process.env.FRONTEND_URL],
            methods: ["GET", "POST", "PUT", "DELETE"],//Frontend Connection..
            credentials: true,
        })
    );
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

//Import Router

app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);


app.use(errorMiddleware);//Error Handler used

    
app.get("/", (req, res) => {
    res.send("Nice working");
});

app.listen(process.env.PORT, () => {
    // console.log(`Server is Working ${process.env.PORT}`);
    console.log(`Server is Working on port: ${process.env.PORT} in ${process.env.NODE_ENV}) Mode`);
});