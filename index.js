import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router.js';
const app = express();

const PORT = process.env.PORT || 5002;
// parses JSON
app.use(express.json());
app.use(morgan('dev'));
// Enable Cross-Origin Resource Sharing
app.use(cors());

app.use('/vm2/api', router);

app.use('*', (req, res) => {
  res.status(404).send('<h1>No resourse found!</h1>');
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
