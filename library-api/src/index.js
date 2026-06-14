import express from 'express';
import { pathToFileURL } from 'node:url';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
export { resetBooks } from './services/book.service.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Express funcionando correctamente' });
});

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use(errorMiddleware);

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
  });
}

export default app;
