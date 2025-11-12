import fs from "fs";
import path from "path";

const storagePath = path.resolve(__dirname, "../../storage");

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

export const fileService = {
  UploadFile({ fileName, fileContent }: { fileName: string; fileContent: string }) {
    try {
      const buffer = Buffer.from(fileContent, "base64");
      const filePath = path.join(storagePath, fileName);

      fs.writeFileSync(filePath, buffer);
      console.log(`✅ Arquivo salvo: ${filePath}`);

      return { status: "success", message: `File '${fileName}' uploaded successfully.` };
    } catch (err) {
      console.error("Erro no upload:", err);
      return { status: "error", message: "Upload failed." };
    }
  },

  DownloadFile({ fileName }: { fileName: string }) {
    try {
      const filePath = path.join(storagePath, fileName);

      if (!fs.existsSync(filePath)) {
        return { status: "error", message: "File not found." };
      }

      const fileBuffer = fs.readFileSync(filePath);
      const base64Content = fileBuffer.toString("base64");

      console.log(`📤 Download de '${fileName}' realizado.`);
      return { status: "success", fileContent: base64Content };
    } catch (err) {
      console.error("Erro no download:", err);
      return { status: "error", message: "Download failed." };
    }
  },

  ListFiles() {
    try {
      const files = fs.readdirSync(storagePath);
      return { files };
    } catch (err) {
      console.error("Erro ao listar arquivos:", err);
      return { files: [] };
    }
  },
};
