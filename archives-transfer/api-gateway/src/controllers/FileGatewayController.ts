import { Request, Response, NextFunction } from "express";
import { RestServiceGateway } from "../services/RestServiceGateway";
import { SoapServiceGateway } from "../services/SoapServiceGateway";
import { buildHateoas } from "../utils/buildHateoas";
import { FileMeta } from "../@types/FileMeta";

const rest = new RestServiceGateway();
const soap = new SoapServiceGateway();

export class FileGatewayController {
  // LIST (REST)
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const metas = await rest.findAll();

      const withLinks = metas.map((m: FileMeta & { _links: any }) => ({
        ...m,
        _links: buildHateoas("files", m.id)
      }));

      return res.json(withLinks);
    } catch (err) {
      next(err instanceof Error ? err : new Error(String(err)));
    }
  }

  // UPLOAD (REST + SOAP)
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file)
        return res.status(400).json({ message: "Arquivo é obrigatório" });

      const { originalname, buffer, size } = req.file;

      // 1 — cria o metadado no REST
      const meta = await rest.create({ name: originalname, size });

      // 2 — envia o arquivo para o SOAP
      const base64 = buffer.toString("base64");
      await soap.uploadFile(originalname, base64);

      return res.status(201).json({
        ...meta,
        _links: buildHateoas("files", meta.id)
      });
    } catch (err) {
      next(err instanceof Error ? err : new Error(String(err)));
    }
  }

  // DOWNLOAD (REST + SOAP)
  async download(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const meta = await rest.findById(id);
      if (!meta) return res.status(404).json({ message: "Not found" });

      const soapFile = await soap.downloadFile(meta.name);

      if (!soapFile.fileContent)
        return res.status(500).json({ message: "Erro ao baixar no SOAP" });

      const buffer = Buffer.from(soapFile.fileContent, "base64");

      res.setHeader("Content-Disposition", `attachment; filename="${meta.name}"`);
      res.send(buffer);
    } catch (err) {
      next(err instanceof Error ? err : new Error(String(err)));
    }
  }
}
