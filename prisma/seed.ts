import prisma from "../src/database/db";
import bcrypt from "bcrypt";

async function main() {
  const senha = "123456";
  const hash = await bcrypt.hash(senha, 10);

  await prisma.farmaceutico.upsert({
    where: { Email: "teste@farmacia.com" },
    update: {},
    create: {
      Nome_Farmaceutico: "Cristiano",
      Sobrenome_Farmaceutico: "Anunciaçã",
      Email: "teste@farmacia.com",
      CPF: "12345678900",
      RN: "RN123456",
      Senha_Hash: hash,
      Perfil_ID: 1, // aqui agora é reconhecido
    },
  });

  console.log("Seed finalizado!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
