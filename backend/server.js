import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// CORS CONFIGURACIÓN CORRECTA
// ==============================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://jojan777.github.io/To-Do_Personal/',
  'https://to-do-backend-1hcr.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite Postman y server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, origin);
    }

    return callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOptions));
// ==============================

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
  .connect(process.env.MONGODB_URI)
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
