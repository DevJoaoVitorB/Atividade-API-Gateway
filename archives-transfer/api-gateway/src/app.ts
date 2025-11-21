import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger/swagger.json";
import fileRoutes from "./routes/files.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Configuração de CORS mais permissiva para depuração
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/files", fileRoutes);

app.use(errorHandler);

export default app;
