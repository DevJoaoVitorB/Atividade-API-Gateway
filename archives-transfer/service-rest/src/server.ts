import app from "./app.js"

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`🔥 Server rodando na porta ${PORT}: http://localhost:${PORT}`)
    console.log(`📕 Documentação em http://localhost:${PORT}/docs`);
});