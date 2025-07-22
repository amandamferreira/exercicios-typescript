"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tarefaRoutes_1 = __importDefault(require("../nivel4/routes/tarefaRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Middleware de erro global
app.use((err, _req, res, _next) => {
    console.error("Erro capturado:", err.message);
    res.status(500).json({
        error: err.message || "Erro interno no servidor",
        code: 500,
    });
});
// Rota de teste para erro
app.get("/erro", (_req, _res) => {
    throw new Error("Erro proposital para testar o middleware global.");
});
// Rotas reais
app.use("/api", tarefaRoutes_1.default);
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
