-- CreateTable
CREATE TABLE "Favorito" (
    "idFavorito" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idImovel" INTEGER NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("idFavorito")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_idUser_idImovel_key" ON "Favorito"("idUser", "idImovel");

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_idImovel_fkey" FOREIGN KEY ("idImovel") REFERENCES "Imovel"("idImovel") ON DELETE RESTRICT ON UPDATE CASCADE;
