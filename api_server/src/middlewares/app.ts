import express from "express";
import routage from '../routes/index';
import { ConfigApp } from './config';

const app = express();

new ConfigApp().configureAppExpress(app);

app.use('/amourconnect/api', routage);

export default app;