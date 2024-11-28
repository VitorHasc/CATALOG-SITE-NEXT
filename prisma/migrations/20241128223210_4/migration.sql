/*
  Warnings:

  - You are about to drop the column `idEndereco` on the `imovel` table. All the data in the column will be lost.
  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bairro` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Imovel_idUser_fkey` ON `imovel`;

-- AlterTable
ALTER TABLE `imovel` DROP COLUMN `idEndereco`,
    ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `numero` VARCHAR(191) NOT NULL,
    ADD COLUMN `rua` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `endereco`;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;
