-- CreateTable
CREATE TABLE `consulta` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Paciente_ID` INTEGER NOT NULL,
    `Farmaceutico_ID` INTEGER NOT NULL,
    `Data_Consulta` DATETIME(3) NOT NULL,
    `Motivo` VARCHAR(191) NULL,
    `Observacoes` VARCHAR(191) NULL,
    `Data_Criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Data_Atualizacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_Paciente_ID_fkey` FOREIGN KEY (`Paciente_ID`) REFERENCES `paciente`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_Farmaceutico_ID_fkey` FOREIGN KEY (`Farmaceutico_ID`) REFERENCES `farmaceutico`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
