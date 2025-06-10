import app from './app';
import { PORT } from './config';
import { createProducts } from './controllers/product.controller';
import { connectDB } from './db/connect';

createProducts()

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });