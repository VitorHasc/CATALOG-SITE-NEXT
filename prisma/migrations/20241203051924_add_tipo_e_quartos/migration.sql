/*
  Warnings:

  - Added the required column `quartos` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoImovel" AS ENUM ('CASA', 'APARTAMENTO', 'TERRENO');

-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN     "quartos" INTEGER NOT NULL,
ADD COLUMN     "tipo" "TipoImovel" NOT NULL;
