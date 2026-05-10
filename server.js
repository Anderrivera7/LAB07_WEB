import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/users.routes.js';
import viewRoutes from './src/routes/views.routes.js';

import seedRoles from './src/utils/seedRoles.js';
import seedUsers from './src/utils/seedUsers.js';

dotenv.config();

const app = express();

// Configuración base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Rutas web (frontend)
app.use('/', viewRoutes);

// Rutas API (backend)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API JWT funcionando 🚀');
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { autoIndex: true })
  .then(async () => {
    console.log('Mongo connected');

    await seedRoles();
    await seedUsers();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con Mongo:', err);
    process.exit(1);
  });