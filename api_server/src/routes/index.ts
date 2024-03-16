import express from 'express';
import routes_auth from'./authentification';
// import routes_membre from'./membre';


const routage = express.Router();



// 1) | Route PUBLIC AUTH | Login - Register - Welcome - Validate Registration - Session Status
routage.use('/auth', routes_auth);


// 2) | Route PRIVE Membre |  Accueil Membre - Profil -
// routage.use('/membre', MiddlewareAuth.verif_user_connect_cookie, routes_membre);


export default routage;