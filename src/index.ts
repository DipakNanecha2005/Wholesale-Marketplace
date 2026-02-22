import 'dotenv/config';
import './config/db';
import express from 'express';
import { PORT } from './config/config';

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
