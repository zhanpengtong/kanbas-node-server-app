import "dotenv/config.js";
import express from "express";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs5610-fa23");
import "dotenv/config.js";
import session from "express-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas-cs5610-fa23';
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
app.use(session(sessionOptions));
  
  
app.use(express.json());

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);