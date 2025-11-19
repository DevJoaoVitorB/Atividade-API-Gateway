import { Router } from "express";
import { FileController } from "./controller/FileController.js";

const fileRoutes = Router();
const fileController = new FileController();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Endpoints para manipulação de arquivos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateFileInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *
 *     UpdateFileInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /files:
 *   post:
 *     summary: Cria um novo arquivo
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateFileInput"
 *     responses:
 *       201:
 *         description: Arquivo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/File"
 */
fileRoutes.post("/", fileController.create);

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Lista todos os arquivos
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Lista de arquivos encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/File"
 */
fileRoutes.get("/", fileController.findAll);

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Busca um arquivo pelo ID
 *     tags: [Files]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do arquivo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Arquivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/File"
 *       404:
 *         description: Arquivo não encontrado
 */
fileRoutes.get("/:id", fileController.findById);

/**
 * @swagger
 * /files/{id}:
 *   put:
 *     summary: Atualiza um arquivo
 *     tags: [Files]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do arquivo
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateFileInput"
 *     responses:
 *       200:
 *         description: Arquivo atualizado com sucesso
 *       404:
 *         description: Arquivo não encontrado
 */
fileRoutes.put("/:id", fileController.update);

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Remove um arquivo
 *     tags: [Files]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do arquivo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Arquivo deletado
 *       404:
 *         description: Arquivo não encontrado
 */
fileRoutes.delete("/:id", fileController.delete);

export default fileRoutes;
