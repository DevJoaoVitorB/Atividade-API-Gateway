// archives-transfer/web_client/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  // Base URL do API Gateway. Em produção/dev, use NEXT_PUBLIC_API_GATEWAY_URL.
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? 'http://10.25.1.144:4000/files',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
