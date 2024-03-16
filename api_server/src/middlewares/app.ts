import express from "express"; // le framework, on utilise Express
import routage from '../routes/index';
import { ConfigApp } from './config';

const app = express();

// 1) Configuration de Express Middelwares

new ConfigApp().configureAppExpress(app);

// 2) LES ROUTES
app.use('/amourconnect/api', routage); // src/routes/

export default app;