import { Router } from "express";
import { listarTarefas, criarTarefa, atualizarTarefa } from "../controllers/tarefaController";
import { validarTarefa } from "../validacoes/validarTarefa";

const router = Router();

router.get("/tarefas", listarTarefas);
router.post("/tarefas", validarTarefa, criarTarefa);
router.put("/tarefas/:id", atualizarTarefa);

export default router;
