import { Router } from "express";
import { FileController } from "./controller/FileController.js";

const fileRoutes = Router();
const fileController = new FileController();

// Rotas CRUD
fileRoutes.post("/", fileController.create);
fileRoutes.get("/", fileController.findAll);
fileRoutes.get("/:id", fileController.findById);
fileRoutes.put("/:id", fileController.update);
fileRoutes.delete("/:id", fileController.delete);

export default fileRoutes;
