import express from 'express';
import { AuthMiddleware } from '../middlewares/AuthAPI';
import AuthUser from '../controllers/route/AuthUser';

const authentification = express.Router();

const Authuser = new AuthUser();

const authMiddleware = new AuthMiddleware();

authentification.get('/get/SessionStatus', authMiddleware.verif_user_connect_cookie.bind(authMiddleware), Authuser.SessionUserStatus.bind(Authuser));
authentification.post('/post/validate_registration', authMiddleware.verif_user_no_connect_cookie.bind(authMiddleware), Authuser.ValidateRegistration.bind(Authuser));
authentification.post('/post/register', authMiddleware.verif_user_no_connect_cookie.bind(authMiddleware),  Authuser.Register.bind(Authuser));
authentification.post('/post/login', authMiddleware.verif_user_no_connect_cookie.bind(authMiddleware),  Authuser.Login.bind(Authuser));


export default authentification;