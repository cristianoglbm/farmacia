import { Router } from "express";
import controller from "../controllers/paciente.controller";

const router = Router();

// Todas as rotas apontam para o controller oficial
router.get("/", controller.listar);       // GET listar pacientes
router.post("/", controller.criar);       // POST criar paciente
router.put("/:id", controller.editar); // PUT editar paciente
router.delete("/:id", controller.deletar);// DELETE excluir paciente

export default router;
