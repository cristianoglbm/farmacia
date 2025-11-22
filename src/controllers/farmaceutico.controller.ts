import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const listarFarmaceuticos = async (req: Request, res: Response) => {
  try {
    const farmaceuticos = await prisma.farmaceutico.findMany();
    res.json(farmaceuticos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar farmacêuticos" });
  }
};

export default {
  listar: async (req: Request, res: Response) => {
    try {
      const dados = await prisma.farmaceutico.findMany();
      return res.json(dados);
    } catch (e) {
      return res.status(500).json({ message: "Erro ao listar" });
    }
  },

  criar: async (req: Request, res: Response) => {
    try {
      const {
        Nome_Farmaceutico,
        Sobrenome_Farmaceutico,
        Email,
        CPF,
        RN,
        Telefone,
        Genero,
        Senha,
      } = req.body;

      // Hash da senha
      const hash = await bcrypt.hash(Senha, 10);

      const novo = await prisma.farmaceutico.create({
        data: {
          Nome_Farmaceutico,
          Sobrenome_Farmaceutico,
          Email,
          CPF,
          RN,
          Telefone,
          Genero,
          Senha_Hash: hash, // campo do modelo Prisma
        },
      });

      return res.json(novo);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Erro ao criar" });
    }
  },
};
