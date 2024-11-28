-- DropIndex
DROP INDEX `Endereco_idImovel_fkey` ON `endereco`;

-- DropIndex
DROP INDEX `Imovel_idUser_fkey` ON `imovel`;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_idImovel_fkey` FOREIGN KEY (`idImovel`) REFERENCES `Imovel`(`idImovel`) ON DELETE RESTRICT ON UPDATE CASCADE;
