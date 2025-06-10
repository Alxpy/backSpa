import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.routes';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', router);

export default app;