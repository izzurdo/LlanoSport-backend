-- DropForeignKey
ALTER TABLE "Convocatoria" DROP CONSTRAINT "Convocatoria_jugadorId_fkey";

-- DropForeignKey
ALTER TABLE "Convocatoria" DROP CONSTRAINT "Convocatoria_partidoId_fkey";

-- DropForeignKey
ALTER TABLE "EstadisticaPartido" DROP CONSTRAINT "EstadisticaPartido_partidoId_fkey";

-- DropForeignKey
ALTER TABLE "EstadisticaPartidoJugador" DROP CONSTRAINT "EstadisticaPartidoJugador_estadisticaPartidoId_fkey";

-- DropForeignKey
ALTER TABLE "EstadisticaPartidoJugador" DROP CONSTRAINT "EstadisticaPartidoJugador_jugadorId_fkey";

-- DropForeignKey
ALTER TABLE "Lesion" DROP CONSTRAINT "Lesion_jugadorId_fkey";

-- DropForeignKey
ALTER TABLE "Lesion" DROP CONSTRAINT "Lesion_partidoId_fkey";

-- AddForeignKey
ALTER TABLE "Convocatoria" ADD CONSTRAINT "Convocatoria_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convocatoria" ADD CONSTRAINT "Convocatoria_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaPartido" ADD CONSTRAINT "EstadisticaPartido_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaPartidoJugador" ADD CONSTRAINT "EstadisticaPartidoJugador_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaPartidoJugador" ADD CONSTRAINT "EstadisticaPartidoJugador_estadisticaPartidoId_fkey" FOREIGN KEY ("estadisticaPartidoId") REFERENCES "EstadisticaPartido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesion" ADD CONSTRAINT "Lesion_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesion" ADD CONSTRAINT "Lesion_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE CASCADE ON UPDATE CASCADE;
