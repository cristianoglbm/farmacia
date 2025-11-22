import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -------------------- LISTAR --------------------
export const listarTratamentos = async (req: Request, res: Response) => {
  try {
    const tratamentos = await prisma.tratamento.findMany({
      orderBy: { ID: "desc" }
    });
    res.json(tratamentos);
  } catch (error) {
    console.error("Erro ao listar tratamentos:", error);
    res.status(500).json({ error: "Erro ao listar tratamentos" });
  }
};

// -------------------- CRIAR --------------------
export const criarTratamento = async (req: Request, res: Response) => {
  try {
    const {
      Diagnostico,
      Data_inicio,
      Data_termino,
      Status,
      Observacoes
    } = req.body;

    const novo = await prisma.tratamento.create({
      data: {
        Diagnostico,
        Data_inicio: new Date(Data_inicio),
        Data_termino: Data_termino ? new Date(Data_termino) : null,
        Status,
        Observacoes
      },
    });

    res.status(201).json(novo);
  } catch (error) {
    console.error("Erro ao criar tratamento:", error);
    res.status(500).json({ error: "Erro ao criar tratamento" });
  }
};

// -------------------- DELETAR --------------------
export const deletarTratamento = async (req: Request, res: Response) => {
  try {
    const ID = Number(req.params.id);

    await prisma.tratamento.delete({
      where: { ID },
    });

    res.json({ message: "Tratamento excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir tratamento:", error);
    res.status(500).json({ error: "Erro ao excluir tratamento" });
  }
};
