import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Routes from './routes/index.routes';
import { notFound } from './middleware/notFound.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (_req, res) => {
  res.send('Server is up and running 🚀');
});

app.use('/api', Routes);

app.use(notFound);
app.use(errorHandler);

export default app; 