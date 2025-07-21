import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = 3000;

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// Middleware de validação
function validarTarefa(req: Request, res: Response, next: NextFunction) {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ error: "Campo 'titulo' é obrigatório e deve ser uma string não vazia." });
  }

  next(); // Continua se a validação passar
}

// Rota GET /status
app.get("/status", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// Rota POST /tarefas com middleware de validação
app.post("/tarefas", validarTarefa, (req: Request, res: Response) => {
  const { titulo } = req.body;

  // Simulação de criação de tarefa (sem banco ainda)
  res.status(201).json({
    mensagem: "Tarefa criada com sucesso!",
    dados: { titulo }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
