import fs from "fs";
import path from "path";

const storagePath = path.resolve(__dirname, "../../storage");
if (!fs.existsSync(storagePath)) fs.mkdirSync(storagePath, { recursive: true });

export interface UploadArgs {
  fileName: string;
  fileContent: string;
}

export interface DownloadArgs {
  fileName: string;
}

export interface SoapCallback<T> {
  (err: any, result: T): void;
}

export const fileService = {
  UploadFile(args: UploadArgs, callback: SoapCallback<any>) {
    try {
      const buffer = Buffer.from(args.fileContent, "base64");
      fs.writeFileSync(path.join(storagePath, args.fileName), buffer);

      callback(null, {
        UploadFileResponse: {
          status: "success",
          message: `File '${args.fileName}' uploaded successfully.`
        }
      });
    } catch {
      callback(null, {
        UploadFileResponse: {
          status: "error",
          message: "Upload failed."
        }
      });
    }
  },

  DownloadFile(args: DownloadArgs, callback: SoapCallback<any>) {
    try {
      const filePath = path.join(storagePath, args.fileName);

      if (!fs.existsSync(filePath)) {
        return callback(null, { DownloadFileResponse: { fileContent: "" } });
      }

      const fileBase64 = fs.readFileSync(filePath).toString("base64");

      callback(null, {
        DownloadFileResponse: {
          fileContent: fileBase64
        }
      });

    } catch {
      callback(null, { DownloadFileResponse: { fileContent: "" } });
    }
  },

  ListFiles(_: any, callback: SoapCallback<any>) {
    try {
      const files = fs.readdirSync(storagePath);

      callback(null, {
        ListFilesResponse: { files }
      });

    } catch {
      callback(null, {
        ListFilesResponse: { files: [] }
      });
    }
  }
};
