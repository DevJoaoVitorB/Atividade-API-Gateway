import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fileRoutes from "./routes/files.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from "./config/swagger";

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
setupSwagger(app);

app.use("/files", fileRoutes);

app.use(errorHandler);

export default app;
