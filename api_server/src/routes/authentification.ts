import express from 'express';
import { MiddlewareAuth } from '../middlewares/AuthAPi';
import { Authentification } from '../controllers/authentification_ctrl';


const authentification = express.Router();


/**
 * GET Accueil
 * Route public de teste pour savoir si l'API fonctionne
 */
authentification.get('/get/testo', async (req, res) => {
  res.status(200).json({ status: 200, message: 'Bienvenu sur l\'API de AmourConnect' });
});



/**
 * GET Etat de session
 * Pour savoir si l'utilisateur est connectée ou pas
 */
authentification.get('/get/etat_session', MiddlewareAuth.verif_user_connect_cookie, async (req, res) => {
  return res.status(200).json({ status: 200, message: 'Utilisateur connectée' });
});



/**
 * POST PRE-INSCRIRE
 * On vérifie d'abord si l'utilisateur est déjà connectée, si c'est le cas on rejet l'inscription
 * car il est déjà connectée
 */
// Route POST pour traiter le formulaire de la page inscrire
authentification.post('/post/inscrire', MiddlewareAuth.verif_user_no_connect_cookie, async (req, res) => {
  await Authentification.inscription_temporaire(req, res);
});



/**
 * POST Traiter le formulaire de valider inscription
 */
authentification.post('/post/valider_inscription', MiddlewareAuth.verif_user_no_connect_cookie, async (req, res) => {
  await Authentification.inscription_final(req, res);
});



/**
 * POST CONNEXION
 * Route POST pour traiter le formulaire de la page connexion
 */
authentification.post('/post/connexion', MiddlewareAuth.verif_user_no_connect_cookie, async (req, res) => {
  await Authentification.connexion_final(req, res);
});


export default authentification;