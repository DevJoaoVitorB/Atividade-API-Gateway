// archives-transfer/web_client/src/types/api.ts

export interface FileMetadata {
  id: number;
  name: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  _links: {
    self: { href: string };
    download: { href: string };
    delete: { href: string };
  };
}

export interface UploadFileResponse {
  id: number;
  name: string;
  size: number;
  _links: {
    self: { href: string };
    download: { href: string };
    delete: { href: string };
  };
}

export interface ErrorResponse {
  error: string;
  message?: string;
}
