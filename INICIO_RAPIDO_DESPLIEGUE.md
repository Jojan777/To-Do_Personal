# ⚡ Inicio Rápido - Despliegue en GitHub Pages

## 🎯 Resumen

Para desplegar tu To-Do App necesitas:
1. **Backend** → Render.com (gratis)
2. **Frontend** → GitHub Pages (gratis)

---

## 📝 Checklist Rápido

### ✅ Paso 1: Desplegar Backend (5 min)

1. Ve a [Render.com](https://render.com) y crea cuenta
2. Click "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: `todo-app-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Agrega variables de entorno:
   ```
   PORT=5000
   MONGODB_URI=tu_cadena_de_mongodb_atlas
   JWT_SECRET=tu_secreto_minimo_32_caracteres
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```
6. Click "Create Web Service"
7. Espera 5-10 minutos
8. **Copia la URL** del backend (ej: `https://todo-app-backend.onrender.com`)

### ✅ Paso 2: Configurar Frontend (2 min)

1. Edita `frontend/vite.config.js`:
   - Cambia `base: '/To-Do_Personal/'` por el nombre de TU repositorio
   
2. Edita `frontend/src/services/api.js`:
   - Reemplaza `'https://tu-backend.onrender.com'` con la URL real de tu backend

3. (Opcional) Agrega secreto en GitHub:
   - Ve a tu repo → Settings → Secrets → Actions
   - Agrega: `VITE_API_URL` = URL de tu backend

### ✅ Paso 3: Configurar GitHub Pages (1 min)

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: Selecciona **"GitHub Actions"**
4. Guarda

### ✅ Paso 4: Desplegar (2 min)

1. Haz commit y push:
```bash
git add .
git commit -m "Configurar despliegue"
git push origin main
```

2. Ve a la pestaña **"Actions"** en GitHub
3. Espera a que termine el workflow (5-10 min)
4. Tu app estará en: `https://tu-usuario.github.io/nombre-repo/`

---

## 🔧 Configuraciones Importantes

### 1. Nombre del Repositorio

**⚠️ CRÍTICO**: El `base` en `vite.config.js` DEBE coincidir exactamente con el nombre de tu repositorio.

Si tu repo se llama `mi-todo-app`, entonces:
```javascript
base: '/mi-todo-app/',
```

### 2. URL del Backend

En `frontend/src/services/api.js`, actualiza:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 
  'https://TU-BACKEND-REAL.onrender.com';
```

### 3. CORS en Backend

Ya está configurado para permitir GitHub Pages. Si tienes problemas, verifica `backend/server.js`.

---

## 🐛 Problemas Comunes

### "404 Not Found" en GitHub Pages
- ✅ Verifica que `base` en `vite.config.js` coincida con tu nombre de repo
- ✅ Usa `HashRouter` (ya está configurado)

### "Cannot connect to API"
- ✅ Verifica que la URL del backend sea correcta
- ✅ Asegúrate de que el backend esté desplegado y funcionando
- ✅ Prueba: `curl https://tu-backend.onrender.com/api`

### El backend se "duerme"
- ✅ Es normal en Render Free
- ✅ La primera petición después puede tardar 30-60 segundos
- ✅ Considera usar un servicio de ping para mantenerlo activo

---

## 📚 Guías Detalladas

- **Backend en Render**: Ver `DESPLIEGUE_RENDER.md`
- **Frontend en GitHub Pages**: Ver `DESPLIEGUE_GITHUB_PAGES.md`
- **Guía General**: Ver `GUIA_DESPLIEGUE.md`

---

## ✅ Verificación Final

Una vez desplegado, verifica:

1. ✅ Backend responde: `https://tu-backend.onrender.com/api`
2. ✅ Frontend carga: `https://tu-usuario.github.io/repo/`
3. ✅ Puedes registrarte
4. ✅ Puedes iniciar sesión
5. ✅ Puedes crear tareas

¡Listo! 🎉