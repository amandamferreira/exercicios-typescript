import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.post('/livros', async (req: Request, res: Response) => {
  const { titulo, autor, anoPublicacao, disponivel } = req.body;

  const anoAtual = new Date().getFullYear();
  if (anoPublicacao > anoAtual) {
    return res.status(400).json({ erro: 'Ano de publicação não pode ser no futuro.' });
  }

  try {
    const livro = await prisma.livro.create({
      data: { titulo, autor, anoPublicacao, disponivel },
    });
    res.status(201).json(livro);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar livro.' });
  }
});

app.get('/livros', async (req: Request, res: Response) => {
  const { autor, disponivel } = req.query;

  const where: any = {};
  if (autor) where.autor = autor;
  if (disponivel) where.disponivel = disponivel === 'true';

  try {
    const livros = await prisma.livro.findMany({ where });
    res.json(livros);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar livros.' });
  }
});

app.patch('/livros/:id/emprestar', async (req: Request, res: Response) => {
  const { id } = req.params;
  const livroId = parseInt(id);

  try {
    const livro = await prisma.livro.findUnique({ where: { id: livroId } });
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    if (!livro.disponivel) {
      return res.status(400).json({ erro: 'Livro já está indisponível.' });
    }

    const updatedLivro = await prisma.livro.update({
      where: { id: livroId },
      data: { disponivel: false },
    });
    res.json(updatedLivro);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao emprestar livro.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
