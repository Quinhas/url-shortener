require('express-async-errors');
import { authController } from '@http/controllers/auth.controller';
import { urlController } from '@http/controllers/url.controller';
import { userController } from '@http/controllers/user.controller';
import { authMiddleware } from '@http/middlewares/auth.middleware';
import { errorHandler } from '@http/middlewares/error-handler';
import cors from 'cors';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import express from 'express';
import cron from 'node-cron';

const app = express();
const port = process.env.PORT || 3033;

dayjs.locale(ptBR);

app.use(express.json());
app.use(cors());

app.post('/login', authController.login);
app.post('/signup', authController.signup);

app.get('/urls/:id', urlController.findById);

app.use(authMiddleware);
app.get('/users/:id', userController.findById);
app.post('/urls/', urlController.store);

cron.schedule('0 0 * * *', urlController.deleteExpiredUrls, {
  scheduled: true,
  name: 'deleteExpiredUrls',
  timezone: 'America/Sao_Paulo',
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

app.use(errorHandler);
