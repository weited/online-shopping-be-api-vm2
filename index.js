import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router.js';
const app = express();

const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/vm2/api', router);
app.get('/vm2/api', (req, res) => {
  res.json({ hello: 'World' });
  console.log('Server Sent A Hello World!');
});
app.post('/', (req, res) => {
  res.json({ hello: 'World, post' });
  console.log('Server Sent A Hello World!');
});
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
