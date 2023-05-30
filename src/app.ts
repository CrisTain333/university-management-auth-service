import express, { Application } from 'express';
import cors from 'cors';
import usersRouter from './app/modules/users/users.route';

const app: Application = express();
// const a = 0;

// Parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users/', usersRouter);

export default app;
