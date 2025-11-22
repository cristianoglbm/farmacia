import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarMedicamento = async (req: Request, res: Response) => {
  try {
    const { nome, dosagem, tipo, tarja, via_consumo, mg_ml, alertas } = req.body;

    const novoMedicamento = await prisma.medicamento.create({
      data: {
        nome,
        dosagem,
        tipo,
        tarja,
        via_consumo,
        mg_ml,
        alertas,
      },
    });

    res.status(201).json(novoMedicamento);
  } catch (err) {
    console.error("Erro ao adicionar medicamento:", err);
    res.status(500).json({ error: "Erro ao adicionar medicamento" });
  }
};
