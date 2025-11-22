import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../database/db";
import { RowDataPacket } from "mysql2";

interface Farmaceutico extends RowDataPacket {
  id: number;
  nome_completo: string;
  email: string;
  senha_hash: string;
  telefone: string;
  cpf: string;
  perfil_id: number;
}

const router = Router(); // <<<<<< FALTAVA ISSO EM MUITOS CASOS

router.post("/login", async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      message: "Email e senha são obrigatórios.",
    });
  }

  try {
    const sql = `SELECT * FROM farmaceutico WHERE email = ? LIMIT 1`;
    const result = await prisma.$queryRaw<Farmaceutico[]>`
  SELECT * FROM farmaceutico WHERE email = ${email} LIMIT 1
`;


    if (!result || result.length === 0) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(senha, user.senha_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nome: user.nome_completo,
        perfil: user.perfil_id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome_completo,
        perfil: user.perfil_id,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

export default router; // <<<<<< IMPORTANTE
