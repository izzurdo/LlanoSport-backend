# 🚀 Despliegue del Backend en Render

## 📋 Situación Actual

- Solo la carpeta `server/` está en GitHub
- El frontend está en otro repositorio o se despliega por separado
- El archivo `render.yaml` está en la raíz del repositorio del servidor

## 🔧 Estructura del Repositorio en GitHub

```
tu-repo-backend/          ← Raíz del repositorio
├── render.yaml           ← Configuración de Render
├── src/
│   └── index.js
├── prisma/
│   └── schema.prisma
├── package.json
├── .env.example
└── .gitignore
```

## 🚀 Pasos para Desplegar

### 1. Verificar que el Repositorio Esté Actualizado

```bash
# Desde la carpeta server/
git add .
git commit -m "Add render.yaml configuration"
git push origin main
```

### 2. Desplegar en Render

#### Opción A: Usando Blueprint (Recomendado)

1. Ve a [render.com](https://render.com)
2. Click en **"New +"** → **"Blueprint"**
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente `render.yaml`
5. Click en **"Apply"**
6. Espera 5-10 minutos

Render creará automáticamente:
- ✅ Base de datos PostgreSQL
- ✅ Servicio web con Node.js
- ✅ Variables de entorno
- ✅ SSL/HTTPS

#### Opción B: Manual (Si Blueprint no funciona)

**Paso 1: Crear Base de Datos**
1. New + → PostgreSQL
2. Name: `llanosport-db`
3. Plan: Free
4. Create Database
5. Copia la **Internal Database URL**

**Paso 2: Crear Web Service**
1. New + → Web Service
2. Conecta tu repositorio
3. Configura:
   - **Name:** `llanosport-api`
   - **Runtime:** Node
   - **Build Command:**
     ```bash
     npm install && npx prisma generate && npx prisma migrate deploy
     ```
   - **Start Command:**
     ```bash
     npm start
     ```
   - **Plan:** Free

**Paso 3: Variables de Entorno**

Agrega en Environment:
```env
DATABASE_URL=<pega-la-internal-database-url>
JWT_SECRET=<genera-un-secreto-aleatorio>
NODE_ENV=production
```

Para generar JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Verificar el Despliegue

#### Health Check
```bash
curl https://tu-api.onrender.com/api/health
```

Respuesta esperada:
```json
{"status":"ok","message":"Server is running"}
```

#### Login Test
```bash
curl -X POST https://tu-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin"}'
```

### 4. Ejecutar Seed (Opcional)

Para poblar la base de datos con datos de prueba:

1. Ve a tu servicio en Render
2. Click en **"Shell"** en el menú lateral
3. Ejecuta:
```bash
npm run seed
```

## 🔍 Solución de Problemas

### Error: "Cannot find module"

**Causa:** Render no encuentra el archivo principal

**Solución:**
1. Verifica que `package.json` tenga:
```json
{
  "scripts": {
    "start": "node src/index.js"
  }
}
```

2. Verifica que el archivo `src/index.js` exista en el repositorio

### Error: "Database connection failed"

**Causa:** DATABASE_URL incorrecta

**Solución:**
1. Usa la **Internal Database URL** (no la External)
2. Verifica que la base de datos esté en la misma región que el servicio

### Error: "Migrations failed"

**Causa:** Migraciones no aplicadas

**Solución:**
```bash
# En Render Shell
npx prisma migrate deploy
```

## 📝 Configuración del Frontend

El frontend debe configurarse para apuntar a tu API en Render:

### En Vercel/Netlify/Render Static Site

Agrega la variable de entorno:
```env
VITE_API_URL=https://tu-api.onrender.com/api
```

### En el código del frontend

Verifica que `client/src/api/client.js` use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
```

## 🔄 Actualizaciones Automáticas

Cada vez que hagas push a GitHub, Render redesplegar automáticamente:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

## 🔒 Seguridad

### Después del Primer Despliegue

1. Cambia las credenciales del admin
2. Configura CORS para tu frontend:

En `src/server.js`:
```javascript
server.use(cors({
  origin: process.env.FRONTEND_URL || "https://tu-frontend.com",
  credentials: true
}));
```

Agrega en Render:
```env
FRONTEND_URL=https://tu-frontend.com
```

## 📊 Monitoreo

### Ver Logs
1. Ve a tu servicio en Render
2. Click en "Logs"
3. Verás los logs en tiempo real

### Métricas
En el dashboard verás:
- CPU usage
- Memory usage
- Request count
- Response time

## 💰 Plan Free de Render

**Incluye:**
- ✅ 750 horas/mes
- ✅ Base de datos PostgreSQL (90 días)
- ✅ SSL automático

**Limitaciones:**
- ⚠️ Se duerme después de 15 min de inactividad
- ⚠️ Primera petición puede tardar 30-60 segundos
- ⚠️ Base de datos se elimina después de 90 días

**Recomendación:**
- Upgrade a Starter ($7/mes) para producción

## ✅ Checklist

- [ ] Repositorio en GitHub con solo el contenido de `server/`
- [ ] `render.yaml` en la raíz del repositorio
- [ ] `package.json` con script `start`
- [ ] `.env` NO incluido en el repositorio
- [ ] `.env.example` incluido como referencia
- [ ] Servicio desplegado en Render
- [ ] Health check funcionando
- [ ] Variables de entorno configuradas
- [ ] Seed ejecutado (opcional)
- [ ] Frontend configurado con la URL de la API

---

## 🎉 ¡Listo!

Tu backend está desplegado en:
```
https://llanosport-api.onrender.com
```

**Credenciales iniciales:**
- Email: `admin@admin.com`
- Password: `admin`

⚠️ **Recuerda cambiar las credenciales después del primer login!**
