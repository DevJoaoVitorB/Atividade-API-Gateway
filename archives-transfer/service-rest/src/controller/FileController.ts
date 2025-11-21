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
			console.log("ID recebido:", req.params.id);
			const { id } = req.params;
			const numericId = Number(id);
			if (!Number.isInteger(numericId) || Number.isNaN(numericId)) {
				return res.status(400).json({ message: "ID inválido" });
			}
			const file = await this.fileService.findById(numericId);
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
			console.log("ID recebido:", req.params.id);
			const { id } = req.params;
			const numericId = Number(id);
			if (!Number.isInteger(numericId) || Number.isNaN(numericId)) {
				return res.status(400).json({ message: "ID inválido" });
			}
			const updateFileData = UpdateFileSchema.parse(req.body);
			const updated = await this.fileService.update(numericId, updateFileData);
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
			console.log("ID recebido:", req.params.id);
			const { id } = req.params;
			const numericId = Number(id);
			if (!Number.isInteger(numericId) || Number.isNaN(numericId)) {
				return res.status(400).json({ message: "ID inválido" });
			}
			const deleted = await this.fileService.delete(numericId);
			if (!deleted) {
				return res.status(404).json({ message: "Arquivo não encontrado" });
			}
			return res.status(200).json(deleted);
		} catch (error) {
			next(error);
		}
	};
}
