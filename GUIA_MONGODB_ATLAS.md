# 🗄️ Guía: Configurar MongoDB Atlas

Esta guía te ayudará a crear una base de datos en MongoDB Atlas y conectarla con tu aplicación To-Do.

## 📋 Paso 1: Crear cuenta en MongoDB Atlas

1. Ve a [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Crea una cuenta (puedes usar tu email de Google/GitHub)
3. Completa el registro

## 🌍 Paso 2: Crear un Cluster

1. Una vez dentro de MongoDB Atlas, verás el dashboard
2. Selecciona **"Build a Database"** o **"Create"** → **"Create Cluster"**
3. Elige el plan **FREE (M0)** - es gratuito y suficiente para desarrollo
4. Selecciona un **Cloud Provider** (AWS, Google Cloud, o Azure)
5. Elige una **región** cercana a ti (ej: `N. Virginia (us-east-1)`)
6. Déjalo como **"M0 Sandbox"** (gratis)
7. Click en **"Create Cluster"**
8. Espera 2-3 minutos mientras se crea el cluster

## 🔐 Paso 3: Crear Usuario de Base de Datos

1. Durante el setup, te pedirá crear un usuario:
   - **Username**: `todoapp_user` (o el que prefieras)
   - **Password**: Crea una contraseña segura (guárdala bien)
   - Click en **"Create Database User"**

   **⚠️ IMPORTANTE**: Guarda este usuario y contraseña, lo necesitarás para la conexión.

## 🌐 Paso 4: Configurar Acceso de Red (IP Whitelist)

1. En la pantalla de "Network Access", selecciona:
   - **"Add IP Address"**
   - Click en **"Allow Access from Anywhere"** (0.0.0.0/0) para desarrollo
   
   **📝 Nota**: En producción, agrega solo las IPs específicas por seguridad.

2. Click en **"Add IP Address"** o **"Finish and Close"**

## 🔗 Paso 5: Obtener la Cadena de Conexión

1. Ve al dashboard principal de MongoDB Atlas
2. Click en **"Connect"** en tu cluster
3. Selecciona **"Connect your application"**
4. Elige **"Driver"**: `Node.js` y **"Version"**: `5.5 or later`
5. Copia la cadena de conexión que aparece, se ve así:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
```

**⚠️ IMPORTANTE**: Los símbolos `<` y `>` NO deben incluirse en la URL final. Son solo placeholders (marcadores de posición) que debes reemplazar con tus credenciales reales.

## ⚙️ Paso 6: Configurar tu Aplicación

1. En tu proyecto, crea el archivo `.env` en la carpeta `backend`:

```bash
cd backend
```

2. Crea el archivo `.env` con el siguiente contenido:

```env
PORT=5000
MONGODB_URI=mongodb+srv://todoapp_user:TU_PASSWORD_AQUI@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion_minimo_32_caracteres
JWT_EXPIRE=7d
```

**🔑 Reemplaza en MONGODB_URI:**

Supongamos que Atlas te dio:
```
mongodb+srv://<db_username>:<db_password>@cluster0.kghon1k.mongodb.net/?appName=Cluster0
```

Y tus credenciales son:
- Usuario: `todoapp_user`
- Contraseña: `MiPassword123`

**Tu URL final debe ser:**
```
mongodb+srv://todoapp_user:MiPassword123@cluster0.kghon1k.mongodb.net/todo-app?retryWrites=true&w=majority
```

**⚠️ Pasos:**
1. Elimina los símbolos `<` y `>` 
2. Reemplaza `<db_username>` con tu usuario real: `todoapp_user`
3. Reemplaza `<db_password>` con tu contraseña real: `MiPassword123`
4. Agrega el nombre de la base de datos (`todo-app`) después de `.net/` y antes del `?`
5. Cambia `?appName=Cluster0` por `?retryWrites=true&w=majority` (opcional pero recomendado)

**📝 Ejemplo completo en el archivo .env:**
```env
MONGODB_URI=mongodb+srv://todoapp_user:MiPassword123@cluster0.kghon1k.mongodb.net/todo-app?retryWrites=true&w=majority
```

**🔒 Si tu contraseña tiene caracteres especiales** (@, #, $, %, &, etc.), debes codificarlos:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- Espacio → `%20`

## 🔧 Paso 7: Instalar Dependencias e Iniciar

1. Asegúrate de tener las dependencias instaladas:

```bash
cd backend
npm install
```

2. Inicia el servidor:

```bash
npm run dev
```

3. Si todo está bien, verás:
```
✅ Conectado a MongoDB
🚀 Servidor corriendo en puerto 5000
```

## ❓ Solución de Problemas

### Error: "Authentication failed"
- Verifica que el usuario y contraseña sean correctos
- Si tu contraseña tiene caracteres especiales, usa URL encoding:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`
  - `&` → `%26`

### Error: "Connection timeout"
- Verifica que hayas agregado tu IP a la whitelist
- Asegúrate de haber seleccionado "Allow Access from Anywhere" (0.0.0.0/0)

### Error: "getaddrinfo ENOTFOUND"
- Verifica que la URL de conexión esté correcta
- Asegúrate de que el nombre del cluster sea correcto

### Crear el archivo .env manualmente en Windows:
```powershell
cd backend
notepad .env
```

Luego pega el contenido y guarda.

## 📚 Recursos Adicionales

- [Documentación de MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html)

## ✅ Verificar Conexión

Una vez que el servidor esté corriendo, puedes probar:

1. **Registrar un usuario**: `POST http://localhost:5000/api/auth/register`
2. **Ver las colecciones**: En MongoDB Atlas, ve a "Collections" y deberías ver las colecciones `users` y `tasks` creadas automáticamente.

¡Listo! Tu base de datos está configurada y funcionando. 🎉