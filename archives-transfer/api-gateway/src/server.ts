import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server rodando na porta ${PORT}: http://localhost:${PORT}`)
  console.log(`📕 Documentação em http://localhost:${PORT}/docs`);
});