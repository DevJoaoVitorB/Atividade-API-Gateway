import app from "./app.js"

const PORT = Number(process.env.PORT) ?? 8000

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🔥 Server rodando na porta ${PORT}: http://0.0.0.0:${PORT}`)
    console.log(`📕 Documentação em http://0.0.0.0:${PORT}/docs`);
});
