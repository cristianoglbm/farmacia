import { Router, Request, Response } from "express";
import prisma from "../database/db";

const router = Router();

// =========================
// LISTAR
// =========================
router.get("/", async (req: Request, res: Response) => {
  try {
    const lista = await prisma.medicamentos.findMany();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar medicamentos.", error });
  }
});

// =========================
// CRIAR
// =========================
router.post("/", async (req: Request, res: Response) => {
  try {
    const dados = req.body;

    const novo = await prisma.medicamentos.create({
      data: {
        Nome_Medicamento: dados.Nome_Medicamento,
        Dosagem: dados.Dosagem,
        Tipo: dados.Tipo,
        Tarja: dados.Tarja,
        Via_consumo: dados.Via_consumo,
        Mg_Ml: dados.Mg_Ml ? Number(dados.Mg_Ml) : null,
        Validade_Medicamento: dados.Validade_Medicamento
          ? new Date(dados.Validade_Medicamento)
          : null,
        Principio_Ativo: dados.Principio_Ativo,
        Alertas: dados.Alertas
      },
    });

    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar medicamento.", error });
  }
});

// =========================
// ATUALIZAR
// =========================
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dados = req.body;

    const atualizado = await prisma.medicamentos.update({
      where: { ID: Number(id) },
      data: {
        Nome_Medicamento: dados.Nome_Medicamento,
        Dosagem: dados.Dosagem,
        Tipo: dados.Tipo,
        Tarja: dados.Tarja,
        Via_consumo: dados.Via_consumo,
        Mg_Ml: dados.Mg_Ml ? Number(dados.Mg_Ml) : null,
        Validade_Medicamento: dados.Validade_Medicamento
          ? new Date(dados.Validade_Medicamento)
          : null,
        Principio_Ativo: dados.Principio_Ativo,
        Alertas: dados.Alertas
      },
    });

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar medicamento.", error });
  }
});

// =========================
// DELETAR
// =========================
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.medicamentos.delete({
      where: { ID: Number(id) }
    });

    res.json({ message: "Medicamento removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir medicamento.", error });
  }
});

export default router;
