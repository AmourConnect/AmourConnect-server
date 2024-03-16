import express from 'express';
import routes_authentification from'./authentification';
import routes_membre from'./membre';
import { MiddlewareAuth } from '../middlewares/AuthAPI';


const routage = express.Router();


// importation des routes et middlewares


// 1) | Route PUBLIC Authentification | Connexion - Inscription - Accueil - Valider Inscription - Etat Session
routage.use('/auth', routes_authentification);


// 2) | Route PRIVE Membre |  Accueil Membre - Profil -
routage.use('/membre', MiddlewareAuth.verif_user_connect_cookie, routes_membre);


export default routage;