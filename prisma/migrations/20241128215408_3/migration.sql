/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `role` ENUM('USER', 'EMPREGADO', 'ADM') NOT NULL DEFAULT 'USER',
    ADD PRIMARY KEY (`idUser`);

-- CreateTable
CREATE TABLE `Imovel` (
    `idImovel` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `idUser` INTEGER NOT NULL,
    `idEndereco` INTEGER NOT NULL,

    PRIMARY KEY (`idImovel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `idEndereco` INTEGER NOT NULL AUTO_INCREMENT,
    `idImovel` INTEGER NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEndereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_idImovel_fkey` FOREIGN KEY (`idImovel`) REFERENCES `Imovel`(`idImovel`) ON DELETE RESTRICT ON UPDATE CASCADE;
