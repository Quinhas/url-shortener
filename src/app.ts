require('express-async-errors');
import { authController } from '@http/controllers/auth.controller';
import { urlController } from '@http/controllers/url.controller';
import { userController } from '@http/controllers/user.controller';
import { errorHandler } from '@http/middlewares/error-handler';
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3033;

app.use(express.json());
app.use(cors());

app.post('/login', authController.login);
app.post('/signup', authController.signup);

// Auth Middleware

app.get('/users/:id', userController.findById);
app.get('/urls/:id', urlController.findById);
app.post('/urls/', urlController.store);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

app.use(errorHandler);
