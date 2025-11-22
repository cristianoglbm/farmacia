import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ------------------ LISTAR CONSULTAS ------------------
router.get("/", async (req, res) => {
  try {
    const consultas = await prisma.consulta.findMany({
      orderBy: { ID: "desc" },
    });
    res.json(consultas);
  } catch (error) {
    console.error("Erro ao listar consultas:", error);
    res.status(500).json({ message: "Erro ao listar consultas" });
  }
});

// ------------------ LISTAR CONSULTA POR ID ------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const consulta = await prisma.consulta.findUnique({
      where: { ID: Number(id) },
    });

    if (!consulta)
      return res.status(404).json({ message: "Consulta não encontrada" });

    res.json(consulta);
  } catch (error) {
    console.error("Erro ao buscar consulta:", error);
    res.status(500).json({ message: "Erro ao buscar consulta" });
  }
});

// ------------------ CADASTRAR CONSULTA ------------------
router.post("/", async (req, res) => {
  try {
    const { Paciente_ID, Farmaceutico_ID, Data_Consulta} = req.body;

    const novaConsulta = await prisma.consulta.create({
      data: {
        Paciente_ID,
        Farmaceutico_ID,
        Data_Consulta: new Date(Data_Consulta),
          },
    });

    res.status(201).json(novaConsulta);
  } catch (error) {
    console.error("Erro ao cadastrar consulta:", error);
    res.status(500).json({ message: "Erro ao cadastrar consulta" });
  }
});

// ------------------ ATUALIZAR CONSULTA ------------------
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { Paciente_ID, Farmaceutico_ID, Data_Consulta} = req.body;

    const atualizada = await prisma.consulta.update({
      where: { ID: Number(id) },
      data: {
        Paciente_ID,
        Farmaceutico_ID,
        Data_Consulta: new Date(Data_Consulta),
    
      },
    });

    res.json(atualizada);
  } catch (error) {
    console.error("Erro ao atualizar consulta:", error);
    res.status(500).json({ message: "Erro ao atualizar consulta" });
  }
});

// ------------------ DELETAR CONSULTA ------------------
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.consulta.delete({
      where: { ID: Number(id) },
    });

    res.json({ message: "Consulta deletada!" });
  } catch (error) {
    console.error("Erro ao deletar consulta:", error);
    res.status(500).json({ message: "Erro ao deletar consulta" });
  }
});

export default router;
