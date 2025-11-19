import express from "express";
import routes from "./Routes.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();

app.use(express.json());

app.use("/", routes);

setupSwagger(app);

export default app;