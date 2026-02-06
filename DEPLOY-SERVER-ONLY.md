# 🚀 Despliegue del Backend en Render

## 📋 Situación Actual

- Solo la carpeta `server/` está en GitHub
- El frontend está en otro repositorio o se despliega por separado
- Despliegue manual (sin render.yaml)

## 📚 Guía Completa de Despliegue

Para desplegar tu backend en Render, sigue la guía paso a paso:

👉 **[DEPLOY-MANUAL.md](./DEPLOY-MANUAL.md)**

Esta guía incluye:
- ✅ Crear base de datos PostgreSQL
- ✅ Crear Web Service
- ✅ Configurar variables de entorno
- ✅ Verificar el despliegue
- ✅ Ejecutar seed
- ✅ Solución de problemas

## ⚡ Resumen Rápido

### 1. Crear Base de Datos
- New + → PostgreSQL
- Name: `llanosport-db`
- Plan: Free
- Copiar Internal Database URL

### 2. Crear Web Service
- New + → Web Service
- Conectar repositorio
- Build: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start: `npm start`

### 3. Variables de Entorno
```env
DATABASE_URL=<internal-database-url>
JWT_SECRET=<generar-aleatorio-32-chars>
NODE_ENV=production
```

### 4. Verificar
```bash
curl https://tu-api.onrender.com/api/health
```

---

Para instrucciones detalladas con capturas y solución de problemas, consulta **[DEPLOY-MANUAL.md](./DEPLOY-MANUAL.md)**

