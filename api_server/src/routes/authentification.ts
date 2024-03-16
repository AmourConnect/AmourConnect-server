import express from 'express';
import { MiddlewareAuth } from '../middlewares/AuthAPI';
import { UserValidator } from '../controllers/UserValidator';
import { Request, Response } from 'express';
import { UserChecker } from '../controllers/UserChecker';
import { UserCreator } from '../controllers/UserCreator';
import { SendEmail } from '../controllers/Email/SendEmail';

const authentification = express.Router();


/**
 * GET Welcome
 * Public test route to find out if the API works
 */
authentification.get('/get/testo', async (res: Response) => {
  res.status(200).json({ status: 200, message: 'Welcome to the AmourConnect API' });
});



/**
 * POST PRE-REGISTER
 * It will send an email to the user to confirm inscription and if no account already exists in the registration and user table
 * The Middleware first check if the user is already connected, if this is the case we reject the registration because they are already connected
 */
authentification.post('/post/register', MiddlewareAuth.verif_user_no_connect_cookie, async (req: Request, res: Response) => {
  try 
  {
    await new UserValidator().checkRegexRegister(req.body);
    const user_check = await new UserChecker();
    await user_check.checkIfUserExistsInBDUser(req.body);
    await user_check.CheckIfUserExistsInDBInscription(req.body);
    const value_cookie = await new UserCreator().createUser(req.body);
    await new SendEmail().SendUserMailInscriptionConfirmation(value_cookie, req.body);
    res.status(200).json({ status: 200, message: 'Pre-Registration completed successfully and send email to validate registration' });
  }
  catch (error)
  {
    res.status(401).json({ status: 401, message: error.message });
  }
});



// /**
//  * GET Etat de session
//  * Pour savoir si l'utilisateur est connectée ou pas
//  */
// authentification.get('/get/etat_session', MiddlewareAuth.verif_user_connect_cookie, async (res: Response) => {
//   return res.status(200).json({ status: 200, message: 'Utilisateur connectée' });
// });


// /**
//  * POST Traiter le formulaire de valider inscription
//  */
// authentification.post('/post/valider_inscription', MiddlewareAuth.verif_user_no_connect_cookie, async (req, res) => {
//   await Authentification.inscription_final(req, res);
// });



// /**
//  * POST CONNEXION
//  * Route POST pour traiter le formulaire de la page connexion
//  */
// authentification.post('/post/connexion', MiddlewareAuth.verif_user_no_connect_cookie, async (req, res) => {
//   await Authentification.connexion_final(req, res);
// });


export default authentification;