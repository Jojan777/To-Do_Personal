# 🚀 Guía de Despliegue - To-Do App

Esta guía te ayudará a desplegar tu aplicación To-Do completa en producción.

## 📋 Estrategia de Despliegue

Como GitHub Pages solo sirve archivos estáticos, necesitamos:
- **Backend**: Desplegar en Render, Railway, o Vercel (gratis)
- **Frontend**: Desplegar en GitHub Pages (gratis)

---

## 🔧 Parte 1: Desplegar Backend en Render (Gratis)

### Paso 1: Preparar el Backend

1. Asegúrate de tener tu código en GitHub
2. Verifica que tengas un archivo `.env` configurado con MongoDB Atlas

### Paso 2: Crear cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Regístrate con tu cuenta de GitHub (recomendado)
3. Confirma tu email

### Paso 3: Crear Web Service en Render

1. En el dashboard de Render, click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio con tu proyecto To-Do
4. Configura el servicio:

   **Configuración básica:**
   - **Name**: `todo-app-backend` (o el nombre que prefieras)
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Deja vacío (o especifica `backend` si Render lo requiere)

   **Variables de Entorno:**
   - Click en **"Advanced"** → **"Add Environment Variable"**
   - Agrega estas variables:
     ```
     PORT=5000
     MONGODB_URI=tu_cadena_de_conexion_de_mongodb_atlas
     JWT_SECRET=tu_secreto_super_seguro_minimo_32_caracteres
     JWT_EXPIRE=7d
     NODE_ENV=production
     ```

5. Selecciona el plan **FREE**
6. Click en **"Create Web Service"**

### Paso 4: Obtener URL del Backend

1. Espera a que Render termine de construir y desplegar (5-10 minutos)
2. Una vez desplegado, verás una URL como: `https://todo-app-backend.onrender.com`
3. **Copia esta URL** - la necesitarás para el frontend

### Paso 5: Verificar Backend

Prueba que tu backend funciona:
```bash
curl https://tu-backend.onrender.com/api
```

Deberías recibir: `{"message":"API To-Do App funcionando correctamente"}`

---

## 🌐 Parte 2: Desplegar Frontend en GitHub Pages

### Paso 1: Configurar Vite para GitHub Pages

Necesitamos ajustar la configuración para que funcione con GitHub Pages.

### Paso 2: Actualizar configuración del Frontend

1. Actualiza `frontend/src/services/api.js` para usar la URL del backend desplegado
2. Actualiza `frontend/vite.config.js` para configurar la base path
3. Actualiza `frontend/package.json` para agregar script de despliegue

### Paso 3: Crear GitHub Actions (Automatización)

Crea el archivo `.github/workflows/deploy.yml` para automatizar el despliegue.

### Paso 4: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En **Source**, selecciona **"GitHub Actions"**
4. Guarda los cambios

### Paso 5: Hacer Push y Desplegar

1. Haz commit y push de tus cambios
2. GitHub Actions construirá y desplegará automáticamente
3. Espera unos minutos
4. Tu app estará disponible en: `https://tu-usuario.github.io/tu-repositorio/`

---

## 🔄 Alternativa: Desplegar Todo en Vercel (Más Fácil)

Si prefieres una solución más simple, puedes desplegar todo en Vercel:

### Backend en Vercel:

1. Ve a [https://vercel.com](https://vercel.com)
2. Conecta tu repositorio
3. Configura:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: (deja vacío)
   - **Install Command**: `npm install`
   - **Start Command**: `npm start`
4. Agrega las variables de entorno
5. Despliega

### Frontend en Vercel:

1. Crea otro proyecto en Vercel
2. Configura:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Agrega variable de entorno:
   ```
   VITE_API_URL=https://tu-backend.vercel.app
   ```
4. Despliega

---

## 📝 Notas Importantes

### CORS
Asegúrate de que tu backend tenga configurado CORS para permitir requests desde tu dominio de GitHub Pages:

```javascript
app.use(cors({
  origin: ['https://tu-usuario.github.io', 'http://localhost:3000'],
  credentials: true
}));
```

### Variables de Entorno
- **Backend**: Configúralas en Render/Vercel
- **Frontend**: Si usas Vite, las variables deben empezar con `VITE_`

### MongoDB Atlas
Asegúrate de agregar las IPs de Render/Vercel a la whitelist de MongoDB Atlas, o usa `0.0.0.0/0` para desarrollo.

---

## ✅ Checklist de Despliegue

- [ ] Backend desplegado en Render/Vercel
- [ ] Variables de entorno configuradas en el backend
- [ ] URL del backend funcionando
- [ ] Frontend configurado para usar URL del backend
- [ ] GitHub Actions configurado (si usas GitHub Pages)
- [ ] CORS configurado correctamente
- [ ] MongoDB Atlas permite conexiones desde el servidor
- [ ] Frontend desplegado y funcionando

---

## 🆘 Solución de Problemas

### Error: "Cannot GET /"
- Verifica que el backend esté corriendo
- Revisa la URL en el frontend

### Error: "CORS policy"
- Agrega tu dominio de GitHub Pages a la configuración CORS del backend

### Error: "MongoDB connection failed"
- Verifica las variables de entorno
- Revisa la whitelist de IPs en MongoDB Atlas

### Frontend no carga
- Verifica que la base path esté configurada correctamente
- Revisa la consola del navegador para errores

---

¡Sigue los pasos detallados en las siguientes secciones para cada plataforma!