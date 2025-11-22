-- CreateTable
CREATE TABLE `farmaceutico` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome_Farmaceutico` VARCHAR(191) NOT NULL,
    `Sobrenome_Farmaceutico` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `RN` VARCHAR(191) NOT NULL,
    `Telefone` VARCHAR(191) NULL,
    `Genero` ENUM('M', 'F', 'T', 'NB') NULL,
    `Data_Criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Data_Atualizacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `farmaceutico_Email_key`(`Email`),
    UNIQUE INDEX `farmaceutico_CPF_key`(`CPF`),
    UNIQUE INDEX `farmaceutico_RN_key`(`RN`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicamentos` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome_Medicamento` VARCHAR(191) NOT NULL,
    `Dosagem` VARCHAR(191) NOT NULL,
    `Tipo` ENUM('Analgesico', 'Antibiotico', 'Anti_inflamatorio', 'Antidepressivo', 'Antialergico', 'Antihipertensivo', 'Diabetes', 'Cardiovascular', 'Gastrointestinal', 'Respiratorio', 'Hormonal', 'Vitaminas', 'Outro') NULL,
    `Tarja` ENUM('Sem_tarja', 'Vermelha', 'Preta', 'Amarela') NULL DEFAULT 'Sem_tarja',
    `Via_consumo` ENUM('Oral', 'Intravenosa', 'Intramuscular', 'Subcutanea', 'Topica', 'Inalatoria', 'Nasal', 'Oftalmica', 'Otologica', 'Retal') NULL,
    `Mg_Ml` DECIMAL(65, 30) NULL,
    `Validade_Medicamento` DATETIME(3) NULL,
    `Principio_Ativo` VARCHAR(191) NULL,
    `Alertas` VARCHAR(191) NULL,
    `Data_Criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Data_Atualizacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paciente` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome_paciente` VARCHAR(191) NOT NULL,
    `Telefone` VARCHAR(191) NULL,
    `Email` VARCHAR(191) NULL,
    `Data_Nascimento` DATETIME(3) NOT NULL,
    `Genero` ENUM('M', 'F', 'T', 'NB') NULL,
    `Profissao` VARCHAR(191) NULL,
    `Data_Criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Data_Atualizacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `paciente_Email_key`(`Email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tratamento` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Diagnostico` VARCHAR(191) NOT NULL,
    `Data_inicio` DATETIME(3) NOT NULL,
    `Data_termino` DATETIME(3) NULL,
    `Status` ENUM('Ativo', 'Pausado', 'Cancelado', 'Concluido', 'Nao_iniciado') NULL DEFAULT 'Nao_iniciado',
    `Observacoes` VARCHAR(191) NULL,
    `Data_Criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Data_Atualizacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tratamento_auditoria` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Tratamento_id` INTEGER NOT NULL,
    `Farmaceutico_id` INTEGER NOT NULL,
    `Medicamento_id` INTEGER NULL,
    `Acao` ENUM('CRIADO', 'ALTERADO', 'EXCLUIDO', 'PAUSADO', 'RETOMADO') NOT NULL,
    `Descricao` VARCHAR(191) NULL,
    `Dados_Antigos` JSON NULL,
    `Dados_Novos` JSON NULL,
    `Data_Auditoria` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tratamento_medicamento` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Tratamento_id` INTEGER NOT NULL,
    `Farmaceutico_id` INTEGER NOT NULL,
    `Frequencia` ENUM('Sem_definicao', 'SID', 'BID', 'TID', 'QID') NULL DEFAULT 'Sem_definicao',
    `Dosagem` VARCHAR(191) NOT NULL,
    `Duracao_dias` INTEGER NOT NULL,
    `Horario_Preferencial` VARCHAR(191) NULL,
    `Quantidade_comprimidos` INTEGER NOT NULL DEFAULT 1,
    `Instrucoes` VARCHAR(191) NULL,
    `Data_Inicio_Tratamento` DATETIME(3) NULL,
    `Data_Fim_Tratamento` DATETIME(3) NULL,
    `Data_Ultimo_Acompanhamento` DATETIME(3) NULL,
    `Observacoes_Acompanhamento` VARCHAR(191) NULL,
    `Efeitos_Colaterais` VARCHAR(191) NULL,
    `Adesao` ENUM('Total', 'Parcial', 'Nenhuma') NULL DEFAULT 'Total',
    `Data_Proximo_Acompanhamento` DATETIME(3) NULL,
    `Data_Criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Data_Atualizacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tratamento_medicamento_has_medicamentos` (
    `tratamento_medicamento_ID` INTEGER NOT NULL,
    `medicamento_ID` INTEGER NOT NULL,
    `Data_Associacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`tratamento_medicamento_ID`, `medicamento_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tratamento_medicamento_has_paciente` (
    `tratamento_medicamento_ID` INTEGER NOT NULL,
    `paciente_ID` INTEGER NOT NULL,
    `Data_Associacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`tratamento_medicamento_ID`, `paciente_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tratamento_auditoria` ADD CONSTRAINT `tratamento_auditoria_Tratamento_id_fkey` FOREIGN KEY (`Tratamento_id`) REFERENCES `tratamento`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_auditoria` ADD CONSTRAINT `tratamento_auditoria_Farmaceutico_id_fkey` FOREIGN KEY (`Farmaceutico_id`) REFERENCES `farmaceutico`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_auditoria` ADD CONSTRAINT `tratamento_auditoria_Medicamento_id_fkey` FOREIGN KEY (`Medicamento_id`) REFERENCES `medicamentos`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_medicamento` ADD CONSTRAINT `tratamento_medicamento_Tratamento_id_fkey` FOREIGN KEY (`Tratamento_id`) REFERENCES `tratamento`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_medicamento` ADD CONSTRAINT `tratamento_medicamento_Farmaceutico_id_fkey` FOREIGN KEY (`Farmaceutico_id`) REFERENCES `farmaceutico`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_medicamento_has_medicamentos` ADD CONSTRAINT `tratamento_medicamento_has_medicamentos_tratamento_medicame_fkey` FOREIGN KEY (`tratamento_medicamento_ID`) REFERENCES `tratamento_medicamento`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_medicamento_has_medicamentos` ADD CONSTRAINT `tratamento_medicamento_has_medicamentos_medicamento_ID_fkey` FOREIGN KEY (`medicamento_ID`) REFERENCES `medicamentos`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_medicamento_has_paciente` ADD CONSTRAINT `tratamento_medicamento_has_paciente_tratamento_medicamento__fkey` FOREIGN KEY (`tratamento_medicamento_ID`) REFERENCES `tratamento_medicamento`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tratamento_medicamento_has_paciente` ADD CONSTRAINT `tratamento_medicamento_has_paciente_paciente_ID_fkey` FOREIGN KEY (`paciente_ID`) REFERENCES `paciente`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
