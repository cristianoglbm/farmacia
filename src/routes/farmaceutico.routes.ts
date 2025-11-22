import { Router } from "express";
import FarmaceuticoController from "../controllers/farmaceutico.controller";

const router = Router();

router.get("/", FarmaceuticoController.listar);
router.post("/", FarmaceuticoController.criar);

export default router;
