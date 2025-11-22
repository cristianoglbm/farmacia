import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_, res) => {
  try {
    const horarios = await prisma.horario.findMany();
    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar horários." });
  }
});

export default router;
