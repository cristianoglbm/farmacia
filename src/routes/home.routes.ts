import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const totalPacientes = await prisma.paciente.count();
    const totalConsultas = await prisma.consulta.count();
    const totalFarmaceuticos = await prisma.farmaceutico.count();

    const ultimasConsultas = await prisma.consulta.findMany({
      take: 5,
      orderBy: { ID: "desc" }, // CORRETO
      include: {
        paciente: true,
        farmaceutico: true,
        // horario: true  // ❌ Não existe no modelo consulta, então removido
      },
    });

    res.json({
      totalPacientes,
      totalConsultas,
      totalFarmaceuticos,
      ultimasConsultas,
    });

  } catch (error) {
    console.error("Erro na rota /home:", error);
    res.status(500).json({ message: "Erro ao carregar dados da Home" });
  }
});

export default router;
