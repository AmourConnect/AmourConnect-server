import express from 'express';
import routes_auth from'./authentification';
import routes_member from'./member';
import { AuthMiddleware } from '../middlewares/AuthAPI';


const routage = express.Router();

const authMiddleware = new AuthMiddleware();


// 1) | Route PUBLIC AUTH | Login - Register - Validate Registration - Session Status
routage.use('/auth', routes_auth);


// 2) | Route PRIVATE Member |  Home Member - Profil -
routage.use('/membre', authMiddleware.verif_user_connect_cookie.bind(authMiddleware), routes_member);


export default routage;