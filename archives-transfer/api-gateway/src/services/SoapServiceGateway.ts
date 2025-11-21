import { soap } from "strong-soap";

export class SoapServiceGateway {
  private wsdl: string =
    process.env.SOAP_SERVICE_URL || "http://localhost:8001/wsdl?wsdl";

  private call<T>(method: string, args: Record<string, unknown>): Promise<T> {
    return new Promise((resolve, reject) => {
      soap.createClient(this.wsdl, {}, (err: unknown, client: any) => {
        if (err) return reject(err);

        client[method](args, (err2: unknown, result: T) => {
          if (err2) return reject(err2);
          resolve(result);
        });
      });
    });
  }

  uploadFile(fileName: string, base64: string) {
    return this.call<{ status: string; message: string }>("UploadFile", {
      fileName,
      fileContent: base64,
    });
  }

  downloadFile(fileName: string) {
    return this.call<{ status: string; fileContent?: string }>("DownloadFile", {
      fileName,
    });
  }

  listFiles() {
    return this.call<{ files: string[] }>("ListFiles", {});
  }
}
