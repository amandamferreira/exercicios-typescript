import { Request, Response, NextFunction } from "express";

export function validarTarefa(req: Request, res: Response, next: NextFunction): void {
  const { titulo } = req.body;

  // Verificação: campo obrigatório
  if (!titulo || typeof titulo !== "string") {
    res.status(400).json({
      erro: "O campo 'titulo' é obrigatório e deve ser uma string.",
    });
    return;
  }
  next();
}

