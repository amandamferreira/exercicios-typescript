import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const listarTarefas = async (req: Request, res: Response) => {
  try {
    const { concluida } = req.query;

    let filtro = {};

    if (concluida === "true" || concluida === "false") {
      filtro = {
        concluida: concluida === "true"
      };
    }

    const tarefas = await prisma.tarefa.findMany({
      where: filtro
    });

    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
};


export const criarTarefa = async (req: Request, res: Response) => {
  const { titulo, descricao } = req.body;
  
  try {
    const novaTarefa = await prisma.tarefa.create({
      data: { titulo, descricao, concluida: false },
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
};

export const atualizarTarefa = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { concluida } = req.body;

  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { concluida },
    });

    res.json(tarefa);
  } catch (error) {
    res.status(404).json({ error: "Tarefa não encontrada." });
  }
};
