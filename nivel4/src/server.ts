import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/tarefas", async (req: Request, res: Response) => {
  const { concluida } = req.query;

app.delete("/tarefas/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { deletadoEm: new Date() },
    });

    res.json({ mensagem: "Tarefa marcada como deletada", tarefa });
  } catch (erro) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
});


  const filtro: any = {
    deletadoEm: null,
    ...(concluida !== undefined && { concluida: concluida === "true" }),
  };

  const tarefas = await prisma.tarefa.findMany({
    where: filtro,
  });

  res.json(tarefas);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
