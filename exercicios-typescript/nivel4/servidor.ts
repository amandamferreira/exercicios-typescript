import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", tarefaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
