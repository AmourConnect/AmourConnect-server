import dotenv from 'dotenv';
import app from './src/middlewares/app';

dotenv.config();

app.listen(process.env.PORT_API_BACK_IN_DOCKER, () => {
    console.log(`Server listening on port ${process.env.PORT_API_BACK_IN_DOCKER}`);
});