# 🔧 Solución al Problema de CORS

## ❌ Error de CORS

Si ves este error en la consola del navegador:

```
Access to XMLHttpRequest at 'https://tu-api.onrender.com/api/...' 
from origin 'https://tu-frontend.com' has been blocked by CORS policy
```

## ✅ Solución

### Paso 1: Agregar Variable de Entorno en Render

1. Ve a tu servicio backend en Render
2. Click en **"Environment"** en el menú lateral
3. Click en **"Add Environment Variable"**
4. Agrega:
   - **Key:** `FRONTEND_URL`
   - **Value:** La URL de tu frontend (ejemplo: `https://tu-frontend.vercel.app`)
5. Click en **"Save Changes"**

### Paso 2: Redesplegar (Automático)

Render redesplegar automáticamente después de agregar la variable.

Espera 2-3 minutos.

### Paso 3: Verificar

Abre tu frontend y prueba hacer login o cualquier petición a la API.

---

## 🌐 Ejemplos de FRONTEND_URL

Según dónde hayas desplegado tu frontend:

### Vercel
```
https://llanosport.vercel.app
```

### Netlify
```
https://llanosport.netlify.app
```

### Render Static Site
```
https://llanosport-client.onrender.com
```

### Dominio Personalizado
```
https://www.tudominio.com
```

⚠️ **IMPORTANTE:** 
- NO incluyas la barra final `/`
- Usa `https://` (no `http://`)
- Copia la URL exacta de tu frontend

---

## 🔍 Verificar la Configuración

### 1. Verificar Variable de Entorno

En Render, ve a Environment y verifica que tengas:

```
FRONTEND_URL = https://tu-frontend.com
```

### 2. Verificar en los Logs

En los logs de Render, deberías ver que el servidor inicia correctamente sin errores de CORS.

### 3. Probar desde el Frontend

Abre la consola del navegador (F12) y verifica que no haya errores de CORS.

---

## 🛠️ Configuración Avanzada

### Múltiples Frontends

Si tienes múltiples frontends (desarrollo, staging, producción), puedes modificar `server/src/server.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',                    // Desarrollo local
  'https://llanosport-dev.vercel.app',       // Staging
  'https://llanosport.vercel.app',           // Producción
  process.env.FRONTEND_URL,                   // Variable de entorno
].filter(Boolean);
```

### Permitir Todos los Orígenes (Solo para Testing)

⚠️ **NO recomendado para producción**

Si solo quieres probar temporalmente, puedes usar:

```javascript
server.use(cors({
  origin: '*',
  credentials: false
}));
```

Pero recuerda cambiarlo después por seguridad.

---

## 🔒 Seguridad

La configuración actual de CORS:

✅ **Permite:**
- Requests desde tu frontend configurado
- Requests desde localhost (desarrollo)
- Requests sin origin (mobile apps, Postman)

❌ **Bloquea:**
- Requests desde otros dominios no autorizados
- Ataques CSRF desde sitios maliciosos

---

## 📝 Checklist

- [ ] Variable `FRONTEND_URL` agregada en Render
- [ ] URL del frontend es correcta (sin `/` al final)
- [ ] Servicio redesplegar en Render
- [ ] No hay errores de CORS en la consola del navegador
- [ ] Login y otras peticiones funcionan correctamente

---

## 🆘 Si el Problema Persiste

### 1. Verificar la URL del Frontend

Abre tu frontend y copia la URL exacta de la barra de direcciones.

### 2. Verificar la Variable en Render

Ve a Environment y verifica que `FRONTEND_URL` tenga el valor correcto.

### 3. Limpiar Caché del Navegador

1. Abre DevTools (F12)
2. Click derecho en el botón de recargar
3. Selecciona "Empty Cache and Hard Reload"

### 4. Verificar en los Logs

En Render, ve a Logs y busca errores relacionados con CORS.

### 5. Probar con Postman

Si funciona en Postman pero no en el navegador, es definitivamente un problema de CORS.

---

## 📞 Soporte

Si después de estos pasos el problema persiste:

1. Verifica que el frontend esté usando la URL correcta de la API
2. Revisa la consola del navegador para ver el error exacto
3. Verifica que `FRONTEND_URL` esté configurada en Render
4. Asegúrate de que el servicio se haya redesplegar después de agregar la variable

---

## 🎉 ¡Listo!

Una vez configurado correctamente, tu frontend podrá comunicarse con el backend sin problemas de CORS.
