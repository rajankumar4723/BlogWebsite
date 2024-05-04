import express from "express";
import blogRouter from "./routes/blog.js";
import userRouter from "./routes/user.js";
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

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(errorMiddleware);
// Import Routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);

// Error Middleware

app.get("/", (req, res) => {
    res.send("Nice working");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
