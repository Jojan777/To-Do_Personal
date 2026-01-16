import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configurar CORS para permitir requests desde GitHub Pages y localhost
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman) o desde localhost/GitHub Pages
    if (!origin || 
        origin.includes('localhost') || 
        origin.includes('127.0.0.1') ||
        origin.includes('github.io')) {
      callback(null, true);
    } else {
      callback(null, true); // En desarrollo, permite todos (cambiar en producción)
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'API To-Do App funcionando correctamente' });
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app')
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  });

export default app;