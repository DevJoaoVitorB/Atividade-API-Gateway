import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server rodando na porta ${PORT}: http://localhost:${PORT}`)
  console.log(`📕 Documentação em http://localhost:${PORT}/docs`);
});