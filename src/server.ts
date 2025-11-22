// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import medicamentoRoutes from "./routes/medicamento.routes";
import farmaceuticoRoutes from "./routes/farmaceutico.routes";
import pacienteRoutes from "./routes/paciente.routes";
import horarioRoutes from "./routes/horario.routes";
import consultaRoutes from "./routes/consulta.routes";
import tratamentoRoutes from "./routes/tratamento.routes";
import homeRoutes from "./routes/home.routes";
import authRoutes from "./routes/auth.routes";
import authMiddleware from "./middlewares/authmiddleware";
import recuperarSenhaRoutes from "./routes/recuperarSenha.routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ----------------------
// Rotas públicas
// ----------------------
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/recuperar-senha", recuperarSenhaRoutes);
app.get("/auth/teste", (req, res) => {
  res.send("Rota Auth funcionando!");
});

// ----------------------
// Rotas protegidas
// ----------------------
// Qualquer rota que você queira proteger com token JWT
app.use("/tratamento", authMiddleware, tratamentoRoutes);

// ----------------------
// Rotas gerais
// ----------------------
app.use("/medicamento", medicamentoRoutes);
app.use("/farmaceutico", farmaceuticoRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/horario", horarioRoutes);
app.use("/consulta", consultaRoutes);

// Porta do servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
