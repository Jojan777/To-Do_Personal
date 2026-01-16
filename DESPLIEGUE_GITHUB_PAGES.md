# 📦 Desplegar Frontend en GitHub Pages - Guía Paso a Paso

## 🎯 Objetivo
Desplegar el frontend de tu To-Do App en GitHub Pages de forma gratuita.

---

## 📋 Prerrequisitos

1. ✅ Backend desplegado en Render/Vercel (necesitas su URL)
2. ✅ Código en un repositorio de GitHub
3. ✅ Node.js instalado localmente

---

## 🔧 Paso 1: Configurar el Frontend para Producción

### 1.1 Actualizar `frontend/src/services/api.js`

Necesitamos que el frontend use la URL del backend desplegado en producción.

```javascript
// frontend/src/services/api.js
import axios from 'axios';

// URL del backend - se usa la variable de entorno o la URL por defecto
const API_URL = import.meta.env.VITE_API_URL || 'https://tu-backend.onrender.com';

const api = axios.create({
  baseURL: API_URL + '/api', // Agrega /api al final
  headers: {
    'Content-Type': 'application/json',
  },
});

// ... resto del código igual
```

### 1.2 Actualizar `frontend/vite.config.js`

Configura Vite para GitHub Pages:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/To-Do_Personal/', // ⚠️ IMPORTANTE: Cambia esto por el nombre de tu repositorio
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
```

**⚠️ IMPORTANTE**: Cambia `/To-Do_Personal/` por el nombre exacto de tu repositorio en GitHub.

### 1.3 Actualizar `frontend/package.json`

Agrega el script de despliegue:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build"
  }
}
```

---

## 🤖 Paso 2: Crear GitHub Actions para Despliegue Automático

### 2.1 Crear el archivo de workflow

Crea la carpeta y el archivo:

**Ruta**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # o 'master' si esa es tu rama principal
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build
        working-directory: ./frontend
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './frontend/dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔐 Paso 3: Configurar Secretos en GitHub (Opcional)

Si quieres usar variables de entorno para la URL del backend:

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click en **"New repository secret"**
4. Nombre: `VITE_API_URL`
5. Valor: `https://tu-backend.onrender.com` (tu URL del backend)
6. Click en **"Add secret"**

**Nota**: Si no configuras esto, el frontend usará la URL por defecto que pongas en el código.

---

## ⚙️ Paso 4: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En **Source**, selecciona **"GitHub Actions"**
4. Guarda los cambios

---

## 🚀 Paso 5: Desplegar

### Opción A: Despliegue Automático (Recomendado)

1. Haz commit y push de todos los cambios:
```bash
git add .
git commit -m "Configurar despliegue en GitHub Pages"
git push origin main
```

2. Ve a la pestaña **"Actions"** en tu repositorio
3. Verás el workflow ejecutándose
4. Espera a que termine (5-10 minutos la primera vez)
5. Una vez completado, ve a **Settings** → **Pages**
6. Verás la URL de tu sitio: `https://tu-usuario.github.io/To-Do_Personal/`

### Opción B: Despliegue Manual

1. Construye el proyecto localmente:
```bash
cd frontend
npm install
npm run build
```

2. Ve a la rama `gh-pages` o crea una nueva rama
3. Copia el contenido de `frontend/dist` a la raíz del repositorio
4. Haz commit y push
5. En GitHub Pages, selecciona la rama `gh-pages` como fuente

---

## 🔧 Paso 6: Actualizar Backend CORS

Asegúrate de que tu backend permita requests desde GitHub Pages.

En `backend/server.js`, actualiza CORS:

```javascript
import cors from 'cors';

// Configurar CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://tu-usuario.github.io', // Tu dominio de GitHub Pages
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

O para desarrollo, permite todos los orígenes:

```javascript
app.use(cors({
  origin: true, // Permite todos los orígenes
  credentials: true,
}));
```

---

## ✅ Verificar Despliegue

1. Abre tu URL de GitHub Pages
2. Intenta registrarte o iniciar sesión
3. Verifica que las tareas se carguen correctamente
4. Revisa la consola del navegador (F12) para errores

---

## 🐛 Solución de Problemas

### Error: "404 Not Found" al navegar
- Verifica que el `base` en `vite.config.js` coincida con tu nombre de repositorio
- Asegúrate de que React Router esté configurado con `HashRouter` o que GitHub Pages esté configurado para SPA

### Error: "Cannot connect to API"
- Verifica que la URL del backend sea correcta
- Revisa CORS en el backend
- Verifica que el backend esté funcionando

### Las rutas no funcionan
Si tienes problemas con las rutas de React Router, cambia a `HashRouter`:

```javascript
// frontend/src/App.jsx
import { HashRouter as Router } from 'react-router-dom';

// ... resto del código igual
```

### El build falla
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs en GitHub Actions
- Asegúrate de que Node.js 18 esté disponible

---

## 📝 Notas Finales

- **Primera vez**: El despliegue puede tardar 10-15 minutos
- **Actualizaciones**: Cada push a `main` desplegará automáticamente
- **URL**: Tu app estará en `https://tu-usuario.github.io/nombre-repositorio/`
- **Personalización**: Puedes usar un dominio personalizado en GitHub Pages Settings

¡Tu aplicación estará en línea! 🎉