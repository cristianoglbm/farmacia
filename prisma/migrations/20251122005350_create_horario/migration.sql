-- CreateTable
CREATE TABLE `horario` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Tratamento_medicamento_ID` INTEGER NOT NULL,
    `Horario` DATETIME(3) NOT NULL,
    `Data_Criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Data_Atualizacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `horario` ADD CONSTRAINT `horario_Tratamento_medicamento_ID_fkey` FOREIGN KEY (`Tratamento_medicamento_ID`) REFERENCES `tratamento_medicamento`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
