import "dotenv/config.js";
import express from "express";
import lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./modules/routes.js";
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
lab5(app);
app.listen(process.env.PORT || 4000);