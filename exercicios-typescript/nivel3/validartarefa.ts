import { Request, Response, NextFunction } from 'express';

function validarTarefa(req: Request, res: Response, next: NextFunction) {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    return res.status(400).json({ error: "Campo 'titulo' é obrigatório e deve ser uma string não vazia." });
  }

  next(); // Se a validação passar, continua para o próximo middleware ou rota
}
