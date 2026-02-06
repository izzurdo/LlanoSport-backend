# 🚀 Despliegue Manual en Render - Guía Paso a Paso

## 📋 Requisitos Previos

- Repositorio en GitHub con el código del servidor
- Cuenta en [Render](https://render.com)

---

## 🗄️ PASO 1: Crear Base de Datos PostgreSQL

### 1.1 Crear la Base de Datos

1. Ve a [render.com](https://render.com) y haz login
2. Click en **"New +"** en la esquina superior derecha
3. Selecciona **"PostgreSQL"**

### 1.2 Configurar la Base de Datos

Completa el formulario:

- **Name:** `llanosport-db` (o el nombre que prefieras)
- **Database:** `llanosport`
- **User:** (se genera automáticamente)
- **Region:** Oregon (o el más cercano a ti)
- **PostgreSQL Version:** 16 (o la más reciente)
- **Plan:** Free

### 1.3 Crear

Click en **"Create Database"**

⏱️ Espera 2-3 minutos mientras se crea la base de datos.

### 1.4 Copiar la URL de Conexión

Una vez creada:

1. Ve a la pestaña **"Info"**
2. Busca **"Internal Database URL"**
3. Click en el icono de copiar 📋
4. **Guárdala en un lugar seguro** (la necesitarás en el Paso 2)

La URL se ve así:
```
postgresql://usuario:contraseña@dpg-xxxxx.oregon-postgres.render.com/llanosport
```

⚠️ **IMPORTANTE:** Usa la **Internal Database URL**, NO la External.

---

## 🌐 PASO 2: Crear Web Service

### 2.1 Crear el Servicio

1. Click en **"New +"** → **"Web Service"**
2. Selecciona **"Build and deploy from a Git repository"**
3. Click en **"Next"**

### 2.2 Conectar GitHub

1. Click en **"Connect account"** si es la primera vez
2. Autoriza a Render para acceder a tus repositorios
3. Selecciona tu repositorio del backend
4. Click en **"Connect"**

### 2.3 Configurar el Servicio

Completa el formulario:

**Información Básica:**
- **Name:** `llanosport-api` (o el nombre que prefieras)
- **Region:** Oregon (misma región que la base de datos)
- **Branch:** `main` (o tu rama principal)
- **Root Directory:** (dejar vacío)
- **Runtime:** Node

**Build & Deploy:**
- **Build Command:**
  ```bash
  npm install && npx prisma generate && npx prisma migrate deploy
  ```

- **Start Command:**
  ```bash
  npm start
  ```

**Plan:**
- Selecciona **"Free"**

### 2.4 NO Crear Todavía

⚠️ **NO hagas click en "Create Web Service" todavía**

Primero necesitamos configurar las variables de entorno.

---

## 🔐 PASO 3: Configurar Variables de Entorno

Antes de crear el servicio, scroll hacia abajo hasta la sección **"Environment Variables"**.

### 3.1 Agregar DATABASE_URL

1. Click en **"Add Environment Variable"**
2. **Key:** `DATABASE_URL`
3. **Value:** Pega la Internal Database URL que copiaste en el Paso 1.4
4. ✅ Verifica que sea la URL correcta

### 3.2 Generar JWT_SECRET

Necesitas generar un secreto aleatorio seguro.

**Opción A: Usando Node.js (en tu terminal local)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Opción B: Usando OpenSSL**
```bash
openssl rand -hex 32
```

**Opción C: Generador Online**
Ve a: https://generate-secret.vercel.app/32

Copia el resultado (algo como: `a1b2c3d4e5f6...`)

### 3.3 Agregar JWT_SECRET

1. Click en **"Add Environment Variable"**
2. **Key:** `JWT_SECRET`
3. **Value:** Pega el secreto que generaste
4. ✅ Verifica que tenga al menos 32 caracteres

### 3.4 Agregar NODE_ENV

1. Click en **"Add Environment Variable"**
2. **Key:** `NODE_ENV`
3. **Value:** `production`

### 3.5 Resumen de Variables

Deberías tener estas 3 variables:

```
DATABASE_URL = postgresql://usuario:contraseña@dpg-xxxxx...
JWT_SECRET = a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6...
NODE_ENV = production
```

---

## 🚀 PASO 4: Crear y Desplegar

### 4.1 Crear el Servicio

Ahora sí, click en **"Create Web Service"**

### 4.2 Esperar el Despliegue

⏱️ El primer despliegue tarda **5-10 minutos**.

Verás el progreso en tiempo real:
1. ✅ Clonando repositorio
2. ✅ Instalando dependencias (`npm install`)
3. ✅ Generando Prisma Client (`npx prisma generate`)
4. ✅ Ejecutando migraciones (`npx prisma migrate deploy`)
5. ✅ Iniciando servidor (`npm start`)

### 4.3 Verificar el Estado

Cuando termine, el estado debe ser **"Live"** (verde).

---

## ✅ PASO 5: Verificar el Despliegue

### 5.1 Obtener la URL

En la parte superior verás tu URL:
```
https://llanosport-api.onrender.com
```

### 5.2 Probar el Health Check

Abre una terminal y ejecuta:

```bash
curl https://TU-URL.onrender.com/api/health
```

Deberías ver:
```json
{"status":"ok","message":"Server is running"}
```

### 5.3 Probar el Login

```bash
curl -X POST https://TU-URL.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin"}'
```

Si funciona, recibirás un token JWT.

---

## 🌱 PASO 6: Ejecutar Seed (Opcional)

Para poblar la base de datos con datos de prueba:

### 6.1 Abrir Shell

1. En tu servicio de Render
2. Click en **"Shell"** en el menú lateral
3. Espera a que se abra la terminal

### 6.2 Ejecutar Seed

En la terminal de Render, ejecuta:

```bash
npm run seed
```

Verás:
```
Starting seed...
Admin user created
Jugadores: 20 creados
Partidos: 15 creados
Convocatorias: 59 creadas
Estadísticas: 46 creadas
Lesiones: 5 creadas
Seed completed successfully!
```

---

## 🔄 PASO 7: Actualizaciones Automáticas

### 7.1 Configurar Auto-Deploy

Render ya está configurado para redesplegar automáticamente cuando hagas push a GitHub.

### 7.2 Hacer Cambios

```bash
# Hacer cambios en tu código
git add .
git commit -m "Descripción de cambios"
git push origin main
```

Render detectará el push y redesplegar automáticamente.

---

## 📊 Monitoreo y Logs

### Ver Logs en Tiempo Real

1. Ve a tu servicio en Render
2. Click en **"Logs"** en el menú lateral
3. Verás todos los logs del servidor

### Ver Métricas

En el dashboard verás:
- CPU Usage
- Memory Usage
- Request Count
- Response Time

---

## 🔧 Solución de Problemas

### Error: "Build failed"

**Causa:** Dependencias faltantes o errores de compilación

**Solución:**
1. Revisa los logs de build
2. Verifica que `package.json` tenga todas las dependencias
3. Prueba el build localmente: `npm install && npm run build`

### Error: "Database connection failed"

**Causa:** DATABASE_URL incorrecta

**Solución:**
1. Ve a Environment → Verifica DATABASE_URL
2. Asegúrate de usar la **Internal Database URL**
3. Verifica que la base de datos esté en la misma región

### Error: "Migrations failed"

**Causa:** Migraciones no aplicadas correctamente

**Solución:**
1. Ve a Shell
2. Ejecuta: `npx prisma migrate deploy`
3. Si persiste: `npx prisma migrate reset` (⚠️ elimina datos)

### Servicio se Duerme

**Causa:** Plan Free se duerme después de 15 minutos de inactividad

**Solución:**
- Primera petición tardará 30-60 segundos
- Considera upgrade a plan Starter ($7/mes) para producción

---

## 🎯 Checklist Final

- [ ] Base de datos PostgreSQL creada
- [ ] Internal Database URL copiada
- [ ] Web Service creado
- [ ] Variables de entorno configuradas (DATABASE_URL, JWT_SECRET, NODE_ENV)
- [ ] Despliegue completado exitosamente
- [ ] Health check responde correctamente
- [ ] Login funciona
- [ ] Seed ejecutado (opcional)
- [ ] Auto-deploy configurado

---

## 🎉 ¡Listo!

Tu backend está desplegado en:
```
https://llanosport-api.onrender.com
```

**Credenciales iniciales:**
- Email: `admin@admin.com`
- Password: `admin`

⚠️ **Siguiente paso:** Cambiar las credenciales en la aplicación.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render
2. Verifica las variables de entorno
3. Consulta la documentación de Render: https://render.com/docs
