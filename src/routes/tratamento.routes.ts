import { Router } from "express";
import {
  listarTratamentos,
  criarTratamento,
  deletarTratamento,
} from "../controllers/tratamento.controller";

const router = Router();

router.get("/", listarTratamentos);
router.post("/", criarTratamento);
router.delete("/:id", deletarTratamento);

export default router;
