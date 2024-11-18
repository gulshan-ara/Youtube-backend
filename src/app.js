import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// enabling cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// for recieving json data
app.use(
  express.json({
    limit: "16kb",
  })
);

// for recieving urls
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// for using static files like image/pdf etc
app.use(express.static("public"));

// cookieparser
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";

//routes for users
app.use("/api/v1/users", userRouter);

export { app };
