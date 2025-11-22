import { Request, Response } from "express";
import prisma from "../database/db";

export default {
  // ========================
  // LISTAR PACIENTES
  // ========================
  async listar(req: Request, res: Response) {
    try {
      const pacientes = await prisma.paciente.findMany();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar pacientes.", error });
    }
  },

  // ========================
  // CRIAR PACIENTE
  // ========================
  async criar(req: Request, res: Response) {
    try {
      const {
        Nome_paciente,
        Telefone,
        Email,
        Data_Nascimento,
        Genero,
        Profissao,
      } = req.body;

      const novo = await prisma.paciente.create({
        data: {
          Nome_paciente,
          Telefone,
          Email,
          Data_Nascimento: new Date(Data_Nascimento),
          Genero,
          Profissao,
        },
      });

      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar paciente.", error });
    }
  },

  // ========================
  // EDITAR PACIENTE
  // ========================
  async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        Nome_paciente,
        Telefone,
        Email,
        Data_Nascimento,
        Genero,
        Profissao,
      } = req.body;

      const atualizado = await prisma.paciente.update({
        where: { ID: Number(id) },
        data: {
          Nome_paciente,
          Telefone,
          Email,
          Data_Nascimento: Data_Nascimento ? new Date(Data_Nascimento) : undefined,
          Genero,
          Profissao,
        },
      });

      res.json(atualizado);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar paciente.", error });
    }
  },

  // ========================
  // DELETAR PACIENTE
  // ========================
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.paciente.delete({
        where: { ID: Number(id) },
      });

      res.json({ message: "Paciente removido com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir paciente.", error });
    }
  },
};
