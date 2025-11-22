import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class MedicamentoService {
  async criarMedicamento(data: any) {
    return await prisma.medicamentos.create({
      data: {
        Nome_Medicamento: data.nome,
        Dosagem: data.dosagem,
        Tipo: data.tipo || null,
        Tarja: data.tarja || "Sem tarja",
        Via_consumo: data.via_consumo || null,
        Mg_Ml: data.mg_ml ? Number(data.mg_ml) : null,
        Alertas: data.alertas || null,
      },
    });
  }
}
