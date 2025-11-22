import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// ======================================================
// Solicitar recuperação (gera token)
// ======================================================
export const solicitarRecuperacao = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const usuario = await prisma.farmaceutico.findUnique({
      where: { Email: email },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Email não encontrado." });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.farmaceutico.update({
      where: { ID: usuario.ID },
      data: {
        ResetToken: token,
        ResetTokenExpira: new Date(Date.now() + 1000 * 60 * 30), // 30 min
      },
    });

    return res.json({
      message: "Token gerado",
      token, // ← você vai enviar por email mais tarde
    });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao gerar recuperação" });
  }
};

// ======================================================
// Validar token
// ======================================================
export const validarToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const usuario = await prisma.farmaceutico.findFirst({
      where: {
        ResetToken: token,
        ResetTokenExpira: { gt: new Date() },
      },
    });

    if (!usuario) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    return res.json({ message: "Token válido" });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao validar token" });
  }
};

// ======================================================
// Redefinir senha
// ======================================================
export const redefinirSenha = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { novaSenha } = req.body;

  try {
    const usuario = await prisma.farmaceutico.findFirst({
      where: {
        ResetToken: token,
        ResetTokenExpira: { gt: new Date() },
      },
    });

    if (!usuario) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    const hash = await bcrypt.hash(novaSenha, 10);

    await prisma.farmaceutico.update({
      where: { ID: usuario.ID },
      data: {
        Senha_Hash: hash,
        ResetToken: null,
        ResetTokenExpira: null,
      },
    });

    return res.json({ message: "Senha alterada com sucesso!" });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao alterar senha" });
  }
};
