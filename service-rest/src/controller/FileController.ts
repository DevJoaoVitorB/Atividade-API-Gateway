import { Request, Response, NextFunction } from "express";
import { CreateFileSchema, UpdateFileSchema } from "../types/dto/File.dto.js";
import { FileService } from "../service/FileService.js";

export class FileController {
    private fileService: FileService;

    constructor() {
        this.fileService = new FileService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createFileData = CreateFileSchema.parse(req.body);
            const file = await this.fileService.create(createFileData);
            return res.status(201).json(file);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const files = await this.fileService.findAll();
            return res.status(200).json(files);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const file = await this.fileService.findById(Number(id));
            if (!file) {
                return res.status(404).json({ message: "Arquivo não encontrado" });
            }
            return res.status(200).json(file);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const updateFileData = UpdateFileSchema.parse(req.body);
            const updated = await this.fileService.update(Number(id), updateFileData);
            if (!updated) {
                return res.status(404).json({ message: "Arquivo não encontrado" });
            }
            return res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const deleted = await this.fileService.delete(Number(id));
            if (!deleted) {
                return res.status(404).json({ message: "Arquivo não encontrado" });
            }
            return res.status(200).json(deleted);
        } catch (error) {
            next(error);
        }
    };
}
