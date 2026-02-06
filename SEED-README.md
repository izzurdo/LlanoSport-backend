# Seed de Datos - LlanoSport

Este archivo contiene instrucciones para poblar la base de datos con datos de prueba.

## ¿Qué incluye el seed?

El seed crea datos completos para probar todas las funcionalidades de la aplicación:

### 1. Usuario Administrador
- **Email:** admin@admin.com
- **Contraseña:** admin

### 2. Jugadores (20 jugadores)
- 15 jugadores masculinos con diferentes posiciones
- 5 jugadoras femeninas
- Datos completos: nombres, apellidos, fecha de nacimiento, documento, posición, pie dominante

### 3. Partidos (15 partidos)
- **10 partidos finalizados** (noviembre 2024 - enero 2025)
- **5 partidos futuros** (febrero - marzo 2025)
- Diferentes competencias: Liga Regional, Copa Local, Amistosos

### 4. Convocatorias
- 11-14 jugadores convocados por cada partido finalizado
- Selección aleatoria de jugadores masculinos

### 5. Estadísticas
- Estadísticas realistas para cada jugador convocado (80% de probabilidad de jugar)
- Goles y asistencias según posición:
  - **Delanteros/Extremos:** Mayor probabilidad de goles (0-2 goles)
  - **Mediocampistas:** Mayor probabilidad de asistencias (0-2 asistencias)
  - **Defensas:** Ocasionalmente goles o asistencias
- Minutos jugados: 45-90 minutos
- Tarjetas: 10% amarillas, 2% rojas

### 6. Lesiones (5 lesiones)
- Diferentes tipos de lesiones con descripciones detalladas
- Gravedad: leve, moderada, grave
- Estados: activa (true) o recuperada (false)
- Jugadores afectados con descripciones realistas

## Cómo ejecutar el seed

### Opción 1: Desde el directorio del servidor

```bash
cd server
npm run seed
```

### Opción 2: Desde la raíz del proyecto

```bash
cd server && npm run seed
```

## Resultado esperado

Al ejecutar el seed verás un resumen en consola:

```
Starting seed...
Admin user created (o "Admin user already exists")
Jugadores: 20 creados (0 ya existían)
Partidos: 15 creados (o "Ya existen partidos, no se crean más")
Convocatorias: 59 creadas
Estadísticas: 46 creadas
Lesiones: 5 creadas
Seed completed successfully!
```

## Notas importantes

- El seed es **idempotente** para jugadores (no crea duplicados)
- Los partidos solo se crean si no existen partidos en la base de datos
- Las convocatorias y estadísticas se crean solo para partidos finalizados
- Las lesiones no se duplican si ya existen con la misma fecha

## Reiniciar la base de datos

Si quieres empezar desde cero:

```bash
cd server
npx prisma migrate reset
npm run seed
```

⚠️ **ADVERTENCIA:** `prisma migrate reset` eliminará TODOS los datos de la base de datos.

## Verificar los datos

Después de ejecutar el seed, puedes:

1. **Iniciar sesión** con admin@admin.com / admin
2. **Ver jugadores** en la sección de Jugadores
3. **Ver partidos** finalizados y futuros
4. **Ver estadísticas** en las tres pestañas:
   - Estadísticas del Equipo (totales históricos)
   - Por Jugador (ranking individual)
   - Por Partido (registrar/editar estadísticas)
5. **Ver lesiones** en el panel de lesiones
6. **Generar reportes PDF** de jugadores

## Datos de prueba útiles

### Jugadores destacados (con más estadísticas):
- Sebastián Moreno (Delantero centro) - Doc: 1011
- Camilo Rojas (Extremo) - Doc: 1010
- Nicolás Díaz (Mediocampista ofensivo) - Doc: 1008

### Partidos finalizados para probar estadísticas:
- vs Deportivo Norte - 10/11/2024
- vs Atlético Sur - 17/11/2024
- vs Unión Deportiva - 24/11/2024

### Jugadores con lesiones:
- Luis Martínez - Esguince de tobillo (Recuperado)
- Daniel Torres - Desgarro muscular (Recuperado)
- Sebastián Moreno - Contusión en rodilla (En recuperación)
