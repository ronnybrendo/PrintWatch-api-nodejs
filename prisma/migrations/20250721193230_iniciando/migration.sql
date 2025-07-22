-- CreateTable
CREATE TABLE `central` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `empresa` INTEGER NOT NULL,
    `setor` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `paginas` INTEGER NOT NULL,
    `copias` INTEGER NOT NULL,
    `impressora` VARCHAR(191) NOT NULL,
    `nomearquivo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `tipopage` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `tamanho` VARCHAR(191) NOT NULL,
    `nomepc` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `mac` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
