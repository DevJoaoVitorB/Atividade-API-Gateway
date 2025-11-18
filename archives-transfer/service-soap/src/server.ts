import http from 'http';
import path from 'path';
import fs from 'fs';
import { soap } from 'strong-soap';
import { fileService } from "./services/fileService";

const wsdlPath = path.join(__dirname, 'wsdl', 'fileService.wsdl');
const wsdlXML = fs.readFileSync(wsdlPath, "utf8");

const serviceDefinition = {
  FileService: {
    FileServicePort: {
      UploadFile: fileService.UploadFile,
      DownloadFile: fileService.DownloadFile,
      ListFiles: fileService.ListFiles,
    },
  },
};

const server = http.createServer((request, response) => {
    response.statusCode = 404;
    response.end("404: Not Found!");
});

soap.listen(server, "/wsdl", serviceDefinition, wsdlXML);

server.listen(8001, "0.0.0.0", () => {
  console.log("🚀 SOAP Service rodando em http://localhost:8001/wsdl?wsdl");
});