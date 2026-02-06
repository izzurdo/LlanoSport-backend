-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jugador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "segundo_nombre" TEXT DEFAULT '',
    "apellido" TEXT NOT NULL,
    "segundo_apellido" TEXT DEFAULT '',
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "documento_identidad" TEXT NOT NULL,
    "posicion" TEXT NOT NULL,
    "pie_dominante" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jugador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partido" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "rival" TEXT NOT NULL,
    "competencia" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Convocatoria" (
    "id" SERIAL NOT NULL,
    "partidoId" INTEGER NOT NULL,
    "jugadorId" INTEGER NOT NULL,
    "esTitular" BOOLEAN NOT NULL DEFAULT false,
    "dorsal" INTEGER,
    "asistio" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Convocatoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadisticaPartido" (
    "id" SERIAL NOT NULL,
    "partidoId" INTEGER NOT NULL,
    "goles_a_favor" INTEGER NOT NULL,
    "goles_en_contra" INTEGER NOT NULL,
    "asistencias" INTEGER NOT NULL,
    "tarjetas_amarillas" INTEGER NOT NULL,
    "tarjetas_rojas" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstadisticaPartido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadisticaPartidoJugador" (
    "id" SERIAL NOT NULL,
    "estadisticaPartidoId" INTEGER NOT NULL,
    "jugadorId" INTEGER NOT NULL,
    "goles" INTEGER NOT NULL DEFAULT 0,
    "asistencias" INTEGER NOT NULL DEFAULT 0,
    "minutosJugados" INTEGER NOT NULL DEFAULT 0,
    "tarjetaAmarilla" INTEGER NOT NULL DEFAULT 0,
    "tarjetaRoja" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstadisticaPartidoJugador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesion" (
    "id" SERIAL NOT NULL,
    "gravedad" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estaActiva" BOOLEAN NOT NULL DEFAULT true,
    "jugadorId" INTEGER NOT NULL,
    "partidoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jugador_documento_identidad_key" ON "Jugador"("documento_identidad");

-- CreateIndex
CREATE UNIQUE INDEX "Convocatoria_partidoId_jugadorId_key" ON "Convocatoria"("partidoId", "jugadorId");

-- CreateIndex
CREATE UNIQUE INDEX "EstadisticaPartido_partidoId_key" ON "EstadisticaPartido"("partidoId");

-- CreateIndex
CREATE UNIQUE INDEX "EstadisticaPartidoJugador_estadisticaPartidoId_jugadorId_key" ON "EstadisticaPartidoJugador"("estadisticaPartidoId", "jugadorId");

-- AddForeignKey
ALTER TABLE "Convocatoria" ADD CONSTRAINT "Convocatoria_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convocatoria" ADD CONSTRAINT "Convocatoria_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaPartido" ADD CONSTRAINT "EstadisticaPartido_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaPartidoJugador" ADD CONSTRAINT "EstadisticaPartidoJugador_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaPartidoJugador" ADD CONSTRAINT "EstadisticaPartidoJugador_estadisticaPartidoId_fkey" FOREIGN KEY ("estadisticaPartidoId") REFERENCES "EstadisticaPartido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesion" ADD CONSTRAINT "Lesion_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesion" ADD CONSTRAINT "Lesion_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE SET NULL ON UPDATE CASCADE;
