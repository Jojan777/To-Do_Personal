# 📋 To-Do App - Gestor de Tareas Avanzado

Una aplicación completa de gestión de tareas con autenticación JWT, CRUD completo, prioridades, fechas límite, estados y funcionalidades de búsqueda y filtrado.

## 🚀 Características

- ✅ **Autenticación JWT**: Registro e inicio de sesión seguro
- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar tareas
- ✅ **Prioridades**: Baja, Media, Alta
- ✅ **Estados**: Pendiente, En Progreso, Completada
- ✅ **Fechas Límite**: Asignar y visualizar fechas de vencimiento
- ✅ **Búsqueda**: Buscar tareas por título o descripción
- ✅ **Filtros**: Filtrar por estado y prioridad
- ✅ **Interfaz Moderna**: Diseño responsive y atractivo

## 🛠️ Tecnologías

### Backend
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (hash de contraseñas)

### Frontend
- React 18
- React Router DOM
- Axios
- Vite
- React Icons

## 📦 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (local o Atlas)
  - **Local**: Instalar MongoDB Community Edition
  - **Cloud**: Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratis) - Ver `GUIA_MONGODB_ATLAS.md`

### Backend

1. Navegar a la carpeta backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env`:
```bash
# En Windows (PowerShell)
cd backend
notepad .env

# O en Mac/Linux
cp .env.template .env
```

4. Configurar variables de entorno en `.env`:

**Para MongoDB Local:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion
JWT_EXPIRE=7d
```

**Para MongoDB Atlas (Cloud):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion_minimo_32_caracteres
JWT_EXPIRE=7d
```

📖 **Ver la guía completa**: `GUIA_MONGODB_ATLAS.md` para instrucciones detalladas de configuración de MongoDB Atlas.

5. Iniciar servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### Frontend

1. Navegar a la carpeta frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. La aplicación estará disponible en `http://localhost:3000`

## 📚 Estructura del Proyecto

```
To-Do_Personal/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── models/
│   │   ├── User.model.js
│   │   └── Task.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList.jsx
    │   │   ├── TaskItem.jsx
    │   │   ├── TaskForm.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🔐 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere token)

### Tareas
- `GET /api/tasks` - Obtener todas las tareas (requiere token)
  - Query params: `status`, `priority`, `search`, `sortBy`, `sortOrder`
- `GET /api/tasks/:id` - Obtener una tarea (requiere token)
- `POST /api/tasks` - Crear nueva tarea (requiere token)
- `PUT /api/tasks/:id` - Actualizar tarea (requiere token)
- `DELETE /api/tasks/:id` - Eliminar tarea (requiere token)

## 💡 Uso

1. **Registrarse**: Crea una nueva cuenta con nombre, email y contraseña
2. **Iniciar Sesión**: Accede con tus credenciales
3. **Crear Tarea**: Haz clic en "Nueva Tarea" y completa el formulario
4. **Editar Tarea**: Haz clic en el botón de editar en cualquier tarea
5. **Completar Tarea**: Haz clic en el check o cambia el estado
6. **Filtrar**: Usa los filtros para ver tareas por estado o prioridad
7. **Buscar**: Escribe en la barra de búsqueda para encontrar tareas
8. **Eliminar**: Haz clic en el botón de eliminar (se pedirá confirmación)

## 🎨 Características de UX

- Indicadores visuales de prioridad y estado
- Alertas para tareas vencidas
- Diseño responsive para móviles
- Animaciones y transiciones suaves
- Confirmación antes de eliminar
- Validación de formularios

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT para autenticación
- Middleware de protección de rutas
- Validación de datos en backend
- Sanitización de inputs

## 📝 Notas

- Asegúrate de tener MongoDB corriendo antes de iniciar el backend
- Cambia el `JWT_SECRET` en producción por uno más seguro
- Para producción, configura las variables de entorno apropiadamente
- El frontend está configurado con proxy para desarrollo local

## 🚧 Próximas Mejoras

- Categorías/Etiquetas para tareas
- Notificaciones de tareas vencidas
- Exportar tareas a PDF/CSV
- Tareas compartidas entre usuarios
- Modo oscuro
- Drag and drop para reordenar

## 🚀 Despliegue

Para desplegar la aplicación en producción:

- **Backend**: Ver guía en `DESPLIEGUE_RENDER.md` (Render - Gratis)
- **Frontend**: Ver guía en `DESPLIEGUE_GITHUB_PAGES.md` (GitHub Pages - Gratis)
- **Guía General**: Ver `GUIA_DESPLIEGUE.md` para opciones alternativas

### Despliegue Rápido:

1. **Backend en Render** (5 minutos):
   - Crea cuenta en [Render.com](https://render.com)
   - Conecta tu repositorio
   - Configura variables de entorno
   - Obtén la URL del backend

2. **Frontend en GitHub Pages** (5 minutos):
   - Configura GitHub Actions (ya incluido)
   - Actualiza la URL del backend en el código
   - Push a GitHub
   - ¡Listo!

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y personal.