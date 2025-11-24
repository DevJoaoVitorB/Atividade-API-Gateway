import { soap } from 'strong-soap';

export class SoapServiceGateway {
    private wsdl =
        process.env.SOAP_WSDL_URL ||
        process.env.SOAP_SERVICE_URL ||
        'http://localhost:8001/fileService?wsdl';

    private call<T>(method: string, args: Record<string, unknown>): Promise<T> {
        return new Promise((resolve, reject) => {
            soap.createClient(this.wsdl, {}, (err: unknown, client: any) => {
                if (err) return reject(err);

                // Try the most common shapes: first plain args, then wrapped under the
                // operation element. Log `describe()` on failure to help diagnose
                // WSDL/namespace mismatches.
                const callClient = (payload: Record<string, unknown>) =>
                    new Promise<T>((res, rej) => {
                        try {
                            client[method](
                                payload,
                                (err2: unknown, result: T) => {
                                    if (err2) return rej(err2);
                                    res(result);
                                },
                            );
                        } catch (err) {
                            rej(err);
                        }
                    });

                // attempt 1: plain args (document-literal typical)
                callClient(args as Record<string, unknown>)
                    .then(resolve)
                    .catch(async (firstErr) => {
                        // attempt 2: wrap under operation name
                        const wrapped: Record<string, unknown> = {};
                        wrapped[method] = args;

                        try {
                            const second = await callClient(wrapped);
                            return resolve(second);
                        } catch (secondErr) {
                            // Emit helpful diagnostic info and prefer the first error
                            try {
                                // `describe()` is synchronous and helps inspect expected
                                // method/input shapes exposed by the client.
                                // eslint-disable-next-line no-console
                                console.debug(
                                    '[SOAP] client.describe():',
                                    client.describe && client.describe(),
                                );
                            } catch (dErr) {
                                // ignore
                            }

                            // prefer the original (first) error so stack/shape is preserved
                            return reject(firstErr || secondErr);
                        }
                    });
            });
        });
    }

    async uploadFile(fileName: string, base64: string) {
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("Nome:" + fileName);
        console.log("base demais: " + base64);
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        const response = await this.call<{
            UploadFileResponse: { status: string; message: string };
        }>('UploadFile', {
            fileName,
            fileContent: base64,
        });

        return response.UploadFileResponse;
    }

    async downloadFile(fileName: string) {
        const response = await this.call<{
            DownloadFileResponse: { fileContent: string };
        }>('DownloadFile', { fileName });

        return response.DownloadFileResponse;
    }

    async listFiles() {
        const response = await this.call<{
            ListFilesResponse: { files: string[] };
        }>('ListFiles', {});

        return response.ListFilesResponse;
    }
}
