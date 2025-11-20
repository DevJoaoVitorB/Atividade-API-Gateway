import axios from "axios";

export class RestServiceGateway {
  private baseUrl = `${process.env.REST_SERVICE_URL || "http://localhost:8000"}/files`;

  async create(meta: any) {
    const res = await axios.post(this.baseUrl, meta);
    return res.data;
  }

  async findAll() {
    const res = await axios.get(this.baseUrl);
    return res.data;
  }

  async findById(id: number) {
    const res = await axios.get(`${this.baseUrl}/${id}`);
    return res.data;
  }

  async delete(id: number) {
    const res = await axios.delete(`${this.baseUrl}/${id}`);
    return res.data;
  }
}
