import express from "express"
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB } from "./database/db.js";

const app = express();

config({
    path:"./database/config.env",
});
connectDB();

app.use(express.json({limite:"16kb"}));
app.use(cookieParser({
    origin: [process.env.FORNTED_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,

}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

//Import Router
import blogRouter from "./routes/blog.js"
import userRouter from "./routes/user.js"


app.use('/users',userRouter );
app.use('/blogs',blogRouter );








app.listen(process.env.PORT, () => {
    console.log(`Server is Working ${process.env.PORT}`);
    // console.log(`Server is Working on port: ${process.env.PORT} in ${process.env.NODE_ENV})Mode`);
});