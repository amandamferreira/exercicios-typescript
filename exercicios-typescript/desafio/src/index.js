"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json()); // Para lidar com o corpo da requisição em JSON
// Rota para criar um livro
app.post('/livros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, autor, anoPublicacao } = req.body;
    // Validar se o ano de publicação não é futuro
    if (anoPublicacao > new Date().getFullYear()) {
        return res.status(400).json({ erro: 'Ano de publicação não pode ser no futuro.' });
    }
    try {
        const livro = yield prisma.livro.create({
            data: { titulo, autor, anoPublicacao, disponivel: true },
        });
        return res.status(201).json(livro); // Aqui o return é importante
    }
    catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar livro.' }); // Aqui também
    }
}));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
