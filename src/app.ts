import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();
// const a = 0;

// Parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
