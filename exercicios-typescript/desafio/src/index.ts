import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());  // Para lidar com o corpo da requisição em JSON

// Rota para criar um livro
app.post('/livros', async (req, res) => {
  const { titulo, autor, anoPublicacao } = req.body;

  // Validar se o ano de publicação não é futuro
  if (anoPublicacao > new Date().getFullYear()) {
    return res.status(400).json({ erro: 'Ano de publicação não pode ser no futuro.' });
  }

  try {
    const livro = await prisma.livro.create({
      data: { titulo, autor, anoPublicacao, disponivel: true },
    });
    return res.status(201).json(livro);  // Aqui o return é importante
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao criar livro.' }); // Aqui também
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
