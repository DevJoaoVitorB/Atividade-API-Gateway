import { Router } from "express";
import multer from "multer";
import { FileGatewayController } from "../controllers/FileGatewayController";

const router = Router();
const upload = multer();
const controller = new FileGatewayController();

/**
 * @swagger
 * tags:
 *   name: FilesGateway
 *   description: Endpoints do API Gateway para comunicação com o serviço SOAP
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadFileInput:
 *       type: object
 *       required:
 *         - file
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 *
 *     FileListResponse:
 *       type: object
 *       properties:
 *         files:
 *           type: array
 *           items:
 *             type: string
 *
 *     DownloadFileResponse:
 *       type: string
 *       format: binary
 */

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Lista todos os arquivos disponíveis no serviço SOAP
 *     tags: [FilesGateway]
 *     responses:
 *       200:
 *         description: Lista recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/FileListResponse"
 */
router.get("/", controller.list.bind(controller));

/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Envia um arquivo para o serviço SOAP
 *     tags: [FilesGateway]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/UploadFileInput"
 *     responses:
 *       201:
 *         description: Arquivo enviado com sucesso
 *       400:
 *         description: Erro no envio do arquivo
 */
router.post(
  "/upload",
  upload.single("file"),
  controller.upload.bind(controller)
);

/**
 * @swagger
 * /files/download/{id}:
 *   get:
 *     summary: Faz o download de um arquivo vindo do serviço SOAP
 *     tags: [FilesGateway]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Nome do arquivo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo retornado com sucesso
 *         content:
 *           application/octet-stream:
 *             schema:
 *               $ref: "#/components/schemas/DownloadFileResponse"
 *       404:
 *         description: Arquivo não encontrado
 */
router.get("/download/:id", controller.download.bind(controller));

export default router;
