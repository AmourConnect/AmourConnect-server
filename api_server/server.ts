import dotenv from 'dotenv';
import app from './src/middlewares/app';

dotenv.config();

app.listen(process.env.PORT_API_BACK_IN_DOCKER, () => {
    console.log(`Serveur en écoute sur le port ${process.env.PORT_API_BACK_IN_DOCKER}`);
});