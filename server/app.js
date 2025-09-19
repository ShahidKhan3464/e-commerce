import cors from 'cors';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import router from './src/routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 1000,
  legacyHeaders: false,
  standardHeaders: true,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));
app.use('/api', router);

export default app;
