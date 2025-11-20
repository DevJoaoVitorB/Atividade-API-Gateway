import { Router } from "express";
import multer from "multer";
import { FileGatewayController } from "../controllers/FileGatewayController";

const router = Router();
const upload = multer();
const controller = new FileGatewayController();

router.get("/", controller.list.bind(controller));
router.post("/upload", upload.single("file"), controller.upload.bind(controller));
router.get("/download/:id", controller.download.bind(controller));

export default router;
