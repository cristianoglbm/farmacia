import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../database/db";

export const loginController = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const user = await prisma.farmaceutico.findUnique({
      where: { Email: email },
    });

    if (!user || !user.Senha_Hash) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const validPassword = await bcrypt.compare(senha, user.Senha_Hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      {
        id: user.ID,
        email: user.Email,
        nome: `${user.Nome_Farmaceutico} ${user.Sobrenome_Farmaceutico}`,
        perfil: user.Perfil_ID,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.ID,
        email: user.Email,
        nome: `${user.Nome_Farmaceutico} ${user.Sobrenome_Farmaceutico}`,
        perfil: user.Perfil_ID,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};
