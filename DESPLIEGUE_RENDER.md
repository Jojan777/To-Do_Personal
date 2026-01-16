# 🚀 Desplegar Backend en Render - Guía Paso a Paso

## 📋 Prerrequisitos

1. ✅ Cuenta en [Render.com](https://render.com) (gratis)
2. ✅ Código en GitHub
3. ✅ MongoDB Atlas configurado

---

## 🔧 Paso 1: Crear Cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Click en **"Get Started for Free"**
3. Regístrate con tu cuenta de GitHub (recomendado) o email
4. Confirma tu email

---

## 🌐 Paso 2: Crear Web Service

1. En el dashboard de Render, click en **"New +"** → **"Web Service"**

2. **Conectar Repositorio:**
   - Si es la primera vez, conecta tu cuenta de GitHub
   - Autoriza a Render a acceder a tus repositorios
   - Selecciona el repositorio con tu proyecto To-Do

3. **Configurar el Servicio:**

   **Información Básica:**
   - **Name**: `todo-app-backend` (o el nombre que prefieras)
   - **Region**: Elige la región más cercana a ti
   - **Branch**: `main` (o la rama que uses)
   - **Root Directory**: `backend` (importante: especifica la carpeta del backend)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

   **Plan:**
   - Selecciona **"Free"** (suficiente para desarrollo)

4. **Variables de Entorno:**
   - Click en **"Advanced"** → **"Add Environment Variable"**
   - Agrega estas variables una por una:

     ```
     PORT=5000
     ```
     
     ```
     MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
     ```
     (Reemplaza con tu cadena de conexión real de MongoDB Atlas)
     
     ```
     JWT_SECRET=tu_secreto_super_seguro_minimo_32_caracteres_cambiar_en_produccion
     ```
     
     ```
     JWT_EXPIRE=7d
     ```
     
     ```
     NODE_ENV=production
     ```

5. Click en **"Create Web Service"**

---

## ⏳ Paso 3: Esperar el Despliegue

1. Render comenzará a construir tu aplicación
2. Esto puede tardar 5-10 minutos la primera vez
3. Verás los logs en tiempo real
4. Una vez completado, verás: **"Your service is live"**

---

## 🔗 Paso 4: Obtener URL del Backend

1. Una vez desplegado, verás una URL como:
   ```
   https://todo-app-backend.onrender.com
   ```

2. **Copia esta URL** - la necesitarás para configurar el frontend

3. Prueba que funciona:
   ```bash
   curl https://todo-app-backend.onrender.com/api
   ```
   
   Deberías recibir:
   ```json
   {"message":"API To-Do App funcionando correctamente"}
   ```

---

## 🔧 Paso 5: Configurar MongoDB Atlas

Asegúrate de que MongoDB Atlas permita conexiones desde Render:

1. Ve a MongoDB Atlas → **Network Access**
2. Agrega la IP `0.0.0.0/0` (permite todas las IPs) para desarrollo
   - O agrega las IPs específicas de Render si las conoces

---

## ✅ Verificar que Todo Funciona

1. Prueba el endpoint de registro:
   ```bash
   curl -X POST https://tu-backend.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","password":"123456"}'
   ```

2. Si recibes un token JWT, ¡todo está funcionando!

---

## 🔄 Actualizar Variables de Entorno

Si necesitas cambiar las variables de entorno:

1. Ve a tu servicio en Render
2. Click en **"Environment"**
3. Edita las variables necesarias
4. Click en **"Save Changes"**
5. Render reiniciará automáticamente el servicio

---

## 📝 Notas Importantes

### Render Free Tier:
- ✅ Gratis para siempre
- ⚠️ El servicio se "duerme" después de 15 minutos de inactividad
- ⚠️ La primera petición después de dormir puede tardar 30-60 segundos
- ✅ Perfecto para desarrollo y proyectos pequeños

### Para Producción:
- Considera usar el plan **Starter** ($7/mes) para evitar el "sleep"
- O usa **Railway** o **Fly.io** que tienen planes gratuitos sin sleep

---

## 🐛 Solución de Problemas

### Error: "Build failed"
- Verifica que `package.json` tenga el script `start`
- Revisa los logs de build en Render
- Asegúrate de que `Root Directory` esté configurado como `backend`

### Error: "Application failed to respond"
- Verifica que el puerto sea `5000` o usa `process.env.PORT`
- Revisa los logs de runtime en Render
- Asegúrate de que MongoDB Atlas permita conexiones

### Error: "MongoDB connection failed"
- Verifica la variable `MONGODB_URI` en Render
- Revisa la whitelist de IPs en MongoDB Atlas
- Asegúrate de que la contraseña esté correctamente codificada si tiene caracteres especiales

### El servicio se duerme
- Es normal en el plan gratuito
- La primera petición después de dormir puede tardar
- Considera usar un servicio de "ping" para mantenerlo activo (hay servicios gratuitos)

---

## 🎉 ¡Listo!

Tu backend está desplegado. Ahora puedes:
1. Usar esta URL para configurar el frontend
2. Probar los endpoints con Postman o curl
3. Ver los logs en tiempo real en Render

**Siguiente paso**: Configura el frontend para usar esta URL. Ver `DESPLIEGUE_GITHUB_PAGES.md`