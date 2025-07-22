import express, { Request, Response, NextFunction } from "express";
import tarefaRoutes from "../nivel4/routes/tarefaRoutes";

const app = express();
const port = 3000;

app.use(express.json());

// Middleware de erro global
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Erro capturado:", err.message);
  res.status(500).json({
    error: err.message || "Erro interno no servidor",
    code: 500,
  });
});

// Rota de teste para erro
app.get("/erro", (_req: Request, _res: Response) => {
  throw new Error("Erro proposital para testar o middleware global.");
});

// Rotas reais
app.use("/api", tarefaRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
