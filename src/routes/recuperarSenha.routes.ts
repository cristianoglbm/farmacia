import { Router } from "express";
import {
  solicitarRecuperacao,
  redefinirSenha,
} from "../controllers/recuperarSenha.controller";

const router = Router();

router.post("/", solicitarRecuperacao);
router.post("/reset", redefinirSenha);

export default router;
