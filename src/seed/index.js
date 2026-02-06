import { exit } from "node:process";
import { prisma } from "../libs/prisma.js";
import { hash } from "argon2";

const createAdminUser = async () => {
  const userExists = await prisma.usuario.findUnique({
    where: {
      email: "admin@admin.com",
    },
  });

  if (userExists) {
    console.log("Admin user already exists");
    return;
  }

  const passwordHashed = await hash("admin");
  await prisma.usuario.create({
    data: {
      email: "admin@admin.com",
      password: passwordHashed,
      nombre: "Administrador",
    },
  });

  console.log("Admin user created");
};

const jugadoresSeed = [
  {
    nombre: "Carlos",
    segundo_nombre: "Andrés",
    apellido: "Rodríguez",
    segundo_apellido: "",
    fecha_nacimiento: new Date("1998-03-15"),
    documento_identidad: "1001",
    posicion: "Portero",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Juan",
    segundo_nombre: "Pablo",
    apellido: "García",
    segundo_apellido: "López",
    fecha_nacimiento: new Date("1999-07-22"),
    documento_identidad: "1002",
    posicion: "Defensa",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Luis",
    segundo_nombre: "",
    apellido: "Martínez",
    segundo_apellido: "",
    fecha_nacimiento: new Date("2000-01-10"),
    documento_identidad: "1003",
    posicion: "Defensa",
    pie_dominante: "Izquierdo",
    genero: "Masculino",
  },
  {
    nombre: "Diego",
    segundo_nombre: "Felipe",
    apellido: "Hernández",
    segundo_apellido: "",
    fecha_nacimiento: new Date("1997-11-05"),
    documento_identidad: "1004",
    posicion: "Defensa central",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Andrés",
    segundo_nombre: "",
    apellido: "Sánchez",
    segundo_apellido: "Muñoz",
    fecha_nacimiento: new Date("2001-04-18"),
    documento_identidad: "1005",
    posicion: "Lateral derecho",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Santiago",
    segundo_nombre: "Camilo",
    apellido: "Pérez",
    segundo_apellido: "",
    fecha_nacimiento: new Date("1999-09-30"),
    documento_identidad: "1006",
    posicion: "Mediocampista",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Mateo",
    segundo_nombre: "",
    apellido: "González",
    segundo_apellido: "Ruiz",
    fecha_nacimiento: new Date("2000-06-12"),
    documento_identidad: "1007",
    posicion: "Mediocampista defensivo",
    pie_dominante: "Izquierdo",
    genero: "Masculino",
  },
  {
    nombre: "Nicolás",
    segundo_nombre: "Sebastián",
    apellido: "Díaz",
    segundo_apellido: "",
    fecha_nacimiento: new Date("1998-12-08"),
    documento_identidad: "1008",
    posicion: "Mediocampista ofensivo",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Daniel",
    segundo_nombre: "",
    apellido: "Torres",
    segundo_apellido: "Vargas",
    fecha_nacimiento: new Date("2002-02-25"),
    documento_identidad: "1009",
    posicion: "Extremo",
    pie_dominante: "Izquierdo",
    genero: "Masculino",
  },
  {
    nombre: "Camilo",
    segundo_nombre: "Andrés",
    apellido: "Rojas",
    segundo_apellido: "",
    fecha_nacimiento: new Date("1997-08-14"),
    documento_identidad: "1010",
    posicion: "Extremo",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Sebastián",
    segundo_nombre: "",
    apellido: "Moreno",
    segundo_apellido: "Jiménez",
    fecha_nacimiento: new Date("1999-05-03"),
    documento_identidad: "1011",
    posicion: "Delantero centro",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Javier",
    segundo_nombre: "Alejandro",
    apellido: "Ramírez",
    segundo_apellido: "",
    fecha_nacimiento: new Date("2001-10-20"),
    documento_identidad: "1012",
    posicion: "Delantero",
    pie_dominante: "Izquierdo",
    genero: "Masculino",
  },
  {
    nombre: "Miguel",
    segundo_nombre: "",
    apellido: "Flórez",
    segundo_apellido: "Castro",
    fecha_nacimiento: new Date("2000-07-07"),
    documento_identidad: "1013",
    posicion: "Portero",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Óscar",
    segundo_nombre: "Eduardo",
    apellido: "Vega",
    segundo_apellido: "",
    fecha_nacimiento: new Date("1998-04-11"),
    documento_identidad: "1014",
    posicion: "Defensa",
    pie_dominante: "Derecho",
    genero: "Masculino",
  },
  {
    nombre: "Ricardo",
    segundo_nombre: "",
    apellido: "Silva",
    segundo_apellido: "Mendoza",
    fecha_nacimiento: new Date("1999-11-28"),
    documento_identidad: "1015",
    posicion: "Mediocampista",
    pie_dominante: "Ambidiestro",
    genero: "Masculino",
  },
  {
    nombre: "Laura",
    segundo_nombre: "Valentina",
    apellido: "Gómez",
    segundo_apellido: "",
    fecha_nacimiento: new Date("2002-01-15"),
    documento_identidad: "2001",
    posicion: "Delantera",
    pie_dominante: "Derecho",
    genero: "Femenino",
  },
  {
    nombre: "María",
    segundo_nombre: "Fernanda",
    apellido: "López",
    segundo_apellido: "Herrera",
    fecha_nacimiento: new Date("2001-06-22"),
    documento_identidad: "2002",
    posicion: "Mediocampista",
    pie_dominante: "Izquierdo",
    genero: "Femenino",
  },
  {
    nombre: "Ana",
    segundo_nombre: "Sofía",
    apellido: "Martínez",
    segundo_apellido: "",
    fecha_nacimiento: new Date("2003-03-08"),
    documento_identidad: "2003",
    posicion: "Portera",
    pie_dominante: "Derecho",
    genero: "Femenino",
  },
  {
    nombre: "Isabella",
    segundo_nombre: "",
    apellido: "Rodríguez",
    segundo_apellido: "Pérez",
    fecha_nacimiento: new Date("2000-09-12"),
    documento_identidad: "2004",
    posicion: "Defensa",
    pie_dominante: "Derecho",
    genero: "Femenino",
  },
  {
    nombre: "Valentina",
    segundo_nombre: "Camila",
    apellido: "Sánchez",
    segundo_apellido: "",
    fecha_nacimiento: new Date("2002-12-05"),
    documento_identidad: "2005",
    posicion: "Extrema",
    pie_dominante: "Izquierdo",
    genero: "Femenino",
  },
];

const partidosSeed = [
  // Partidos finalizados (pasados)
  {
    fecha: new Date("2024-11-10"),
    hora: "15:00",
    lugar: "Estadio Municipal",
    rival: "Deportivo Norte",
    competencia: "Liga Regional",
    finalizado: true,
  },
  {
    fecha: new Date("2024-11-17"),
    hora: "16:30",
    lugar: "Cancha Principal",
    rival: "Atlético Sur",
    competencia: "Liga Regional",
    finalizado: true,
  },
  {
    fecha: new Date("2024-11-24"),
    hora: "10:00",
    lugar: "Complejo Deportivo",
    rival: "Unión Deportiva",
    competencia: "Copa Local",
    finalizado: true,
  },
  {
    fecha: new Date("2024-12-01"),
    hora: "18:00",
    lugar: "Estadio Municipal",
    rival: "Club Deportivo Central",
    competencia: "Liga Regional",
    finalizado: true,
  },
  {
    fecha: new Date("2024-12-08"),
    hora: "14:00",
    lugar: "Cancha Secundaria",
    rival: "Equipo del Valle",
    competencia: "Amistoso",
    finalizado: true,
  },
  {
    fecha: new Date("2024-12-15"),
    hora: "15:30",
    lugar: "Estadio Municipal",
    rival: "Deportivo Este",
    competencia: "Liga Regional",
    finalizado: true,
  },
  {
    fecha: new Date("2024-12-22"),
    hora: "11:00",
    lugar: "Cancha Principal",
    rival: "Atlético Oeste",
    competencia: "Copa Local",
    finalizado: true,
  },
  {
    fecha: new Date("2025-01-12"),
    hora: "17:00",
    lugar: "Complejo Deportivo",
    rival: "Real Sporting",
    competencia: "Liga Regional",
    finalizado: true,
  },
  {
    fecha: new Date("2025-01-19"),
    hora: "16:00",
    lugar: "Estadio Municipal",
    rival: "Club Victoria",
    competencia: "Liga Regional",
    finalizado: true,
  },
  {
    fecha: new Date("2025-01-26"),
    hora: "09:30",
    lugar: "Cancha Principal",
    rival: "Deportivo Llano",
    competencia: "Amistoso",
    finalizado: true,
  },
  // Partidos futuros
  {
    fecha: new Date("2025-02-15"),
    hora: "15:00",
    lugar: "Estadio Municipal",
    rival: "FC Montaña",
    competencia: "Liga Regional",
    finalizado: false,
  },
  {
    fecha: new Date("2025-02-22"),
    hora: "16:30",
    lugar: "Cancha Principal",
    rival: "Sporting Club",
    competencia: "Copa Local",
    finalizado: false,
  },
  {
    fecha: new Date("2025-03-01"),
    hora: "10:00",
    lugar: "Complejo Deportivo",
    rival: "Atlético Nacional",
    competencia: "Liga Regional",
    finalizado: false,
  },
  {
    fecha: new Date("2025-03-08"),
    hora: "18:00",
    lugar: "Estadio Municipal",
    rival: "Deportivo Cali",
    competencia: "Amistoso",
    finalizado: false,
  },
  {
    fecha: new Date("2025-03-15"),
    hora: "14:00",
    lugar: "Cancha Secundaria",
    rival: "Real Madrid Local",
    competencia: "Liga Regional",
    finalizado: false,
  },
];

const seedJugadores = async () => {
  const result = await prisma.jugador.createMany({
    data: jugadoresSeed,
    skipDuplicates: true,
  });
  console.log(
    `Jugadores: ${result.countCreated} creados (${
      jugadoresSeed.length - result.countCreated
    } ya existían)`
  );
};

const seedPartidos = async () => {
  const count = await prisma.partido.count();
  if (count > 0) {
    console.log("Ya existen partidos, no se crean más");
    return;
  }
  const result = await prisma.partido.createMany({
    data: partidosSeed,
  });
  console.log(`Partidos: ${result.count} creados`);
};

const seedConvocatoriasYEstadisticas = async () => {
  const partidos = await prisma.partido.findMany({
    where: { finalizado: true },
    orderBy: { fecha: "asc" },
  });

  if (partidos.length === 0) {
    console.log("No hay partidos finalizados para crear convocatorias");
    return;
  }

  const jugadores = await prisma.jugador.findMany();
  const jugadoresMasculinos = jugadores.filter((j) => j.genero === "Masculino");

  let convocatoriasCreadas = 0;
  let estadisticasCreadas = 0;

  for (const partido of partidos) {
    // Crear EstadisticaPartido si no existe (con valores temporales)
    let estadisticaPartido = await prisma.estadisticaPartido.findUnique({
      where: { partidoId: partido.id },
    });

    if (!estadisticaPartido) {
      estadisticaPartido = await prisma.estadisticaPartido.create({
        data: {
          partidoId: partido.id,
          goles_a_favor: 0, // Se actualizará después
          goles_en_contra: Math.floor(Math.random() * 4), // 0-3 goles en contra
          asistencias: 0,
          tarjetas_amarillas: 0,
          tarjetas_rojas: 0,
        },
      });
    }

    // Seleccionar 11-14 jugadores aleatorios para cada partido
    const numConvocados = 11 + Math.floor(Math.random() * 4);
    const convocados = jugadoresMasculinos
      .sort(() => Math.random() - 0.5)
      .slice(0, numConvocados);

    // PASO 1: Crear convocatorias y generar goles
    const estadisticasTemp = [];
    let totalGolesPartido = 0;

    for (const jugador of convocados) {
      // Crear convocatoria
      const convocatoriaExiste = await prisma.convocatoria.findFirst({
        where: {
          partidoId: partido.id,
          jugadorId: jugador.id,
        },
      });

      if (!convocatoriaExiste) {
        await prisma.convocatoria.create({
          data: {
            partidoId: partido.id,
            jugadorId: jugador.id,
          },
        });
        convocatoriasCreadas++;
      }

      // Crear estadísticas (80% de probabilidad de jugar)
      if (Math.random() > 0.2) {
        const estadisticaExiste =
          await prisma.estadisticaPartidoJugador.findFirst({
            where: {
              estadisticaPartidoId: estadisticaPartido.id,
              jugadorId: jugador.id,
            },
          });

        if (!estadisticaExiste) {
          // Generar goles según posición
          let goles = 0;
          let minutosJugados = 45 + Math.floor(Math.random() * 46); // 45-90 min

          const posicion = jugador.posicion.toLowerCase();

          // Delanteros y extremos tienen más probabilidad de goles
          if (
            posicion.includes("delantero") ||
            posicion.includes("extremo")
          ) {
            goles = Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0;
          }
          // Mediocampistas ocasionalmente
          else if (posicion.includes("medio")) {
            goles = Math.random() > 0.8 ? 1 : 0;
          }
          // Defensas raramente
          else if (
            posicion.includes("defensa") ||
            posicion.includes("lateral")
          ) {
            goles = Math.random() > 0.95 ? 1 : 0;
          }

          totalGolesPartido += goles;

          // Tarjetas (10% amarilla, 2% roja)
          const tarjetaAmarilla = Math.random() > 0.9 ? 1 : 0;
          const tarjetaRoja = Math.random() > 0.98 ? 1 : 0;

          estadisticasTemp.push({
            jugador,
            goles,
            minutosJugados,
            tarjetaAmarilla,
            tarjetaRoja,
          });
        }
      }
    }

    // PASO 2: Distribuir asistencias (máximo = total de goles)
    let asistenciasRestantes = totalGolesPartido;
    
    for (const stat of estadisticasTemp) {
      let asistencias = 0;
      
      if (asistenciasRestantes > 0) {
        const posicion = stat.jugador.posicion.toLowerCase();
        
        // Mediocampistas y extremos tienen más probabilidad de asistencias
        if (posicion.includes("medio") || posicion.includes("extremo")) {
          const maxAsistencias = Math.min(2, asistenciasRestantes);
          asistencias = Math.random() > 0.4 ? Math.floor(Math.random() * (maxAsistencias + 1)) : 0;
        }
        // Delanteros ocasionalmente
        else if (posicion.includes("delantero")) {
          const maxAsistencias = Math.min(1, asistenciasRestantes);
          asistencias = Math.random() > 0.6 ? maxAsistencias : 0;
        }
        // Defensas raramente
        else if (posicion.includes("defensa") || posicion.includes("lateral")) {
          asistencias = Math.random() > 0.85 && asistenciasRestantes > 0 ? 1 : 0;
        }
        
        asistenciasRestantes -= asistencias;
      }

      // Crear la estadística con goles y asistencias
      await prisma.estadisticaPartidoJugador.create({
        data: {
          estadisticaPartidoId: estadisticaPartido.id,
          jugadorId: stat.jugador.id,
          goles: stat.goles,
          asistencias,
          minutosJugados: stat.minutosJugados,
          tarjetaAmarilla: stat.tarjetaAmarilla,
          tarjetaRoja: stat.tarjetaRoja,
        },
      });
      estadisticasCreadas++;
    }

    // PASO 3: Actualizar goles_a_favor con la suma real de goles de los jugadores
    await prisma.estadisticaPartido.update({
      where: { id: estadisticaPartido.id },
      data: {
        goles_a_favor: totalGolesPartido,
      },
    });
  }

  console.log(`Convocatorias: ${convocatoriasCreadas} creadas`);
  console.log(`Estadísticas: ${estadisticasCreadas} creadas`);
};

const seedLesiones = async () => {
  const jugadores = await prisma.jugador.findMany();
  const lesionesSeed = [
    {
      jugadorId: jugadores[2]?.id, // Luis Martínez
      gravedad: "Moderada",
      descripcion: "Esguince de tobillo durante entrenamiento. Recuperación completa.",
      estaActiva: false,
    },
    {
      jugadorId: jugadores[8]?.id, // Daniel Torres
      gravedad: "Grave",
      descripcion: "Desgarro en isquiotibial derecho. Requirió fisioterapia intensiva.",
      estaActiva: false,
    },
    {
      jugadorId: jugadores[10]?.id, // Sebastián Moreno
      gravedad: "Leve",
      descripcion: "Contusión en rodilla. Golpe durante partido. Evolución favorable.",
      estaActiva: true,
    },
    {
      jugadorId: jugadores[5]?.id, // Santiago Pérez
      gravedad: "Moderada",
      descripcion: "Tendinitis rotuliana. Tratamiento con reposo y fisioterapia.",
      estaActiva: true,
    },
    {
      jugadorId: jugadores[16]?.id, // María López
      gravedad: "Leve",
      descripcion: "Esguince de muñeca. Caída durante entrenamiento. Uso de férula.",
      estaActiva: true,
    },
  ];

  let lesionesCreadas = 0;
  for (const lesion of lesionesSeed) {
    if (lesion.jugadorId) {
      const lesionExiste = await prisma.lesion.findFirst({
        where: {
          jugadorId: lesion.jugadorId,
          descripcion: lesion.descripcion,
        },
      });

      if (!lesionExiste) {
        await prisma.lesion.create({ data: lesion });
        lesionesCreadas++;
      }
    }
  }

  console.log(`Lesiones: ${lesionesCreadas} creadas`);
};

const main = async () => {
  console.log("Starting seed...");
  await createAdminUser();
  await seedJugadores();
  await seedPartidos();
  await seedConvocatoriasYEstadisticas();
  await seedLesiones();
  console.log("Seed completed successfully!");
};

main().then(() => exit(0));
