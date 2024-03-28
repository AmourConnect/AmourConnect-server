import express from 'express';
import { AuthMiddleware } from '../middlewares/AuthAPI';
import { UserValidator } from '../controllers/UserValidator';
import { Request, Response } from 'express';
import { UserChecker } from '../controllers/UserChecker';
import { UserCreator } from '../controllers/UserCreator';
import { SendEmail } from '../controllers/Email/SendEmail';
import { error_msg_api } from "../controllers/CustomError";

const authentification = express.Router();

const authMiddleware = new AuthMiddleware();

const user_validator = new UserValidator();

const user_check = new UserChecker();

const UserCreate = new UserCreator();

const send_mail = new SendEmail();



/**
 * GET Welcome
 * Public test route to find out if the API works
 */
authentification.get('/get/testo', async (req: Request, res: Response) => {
  res.status(200).json({ status: 200, message: 'Welcome to the AmourConnect API' });
});



/**
 * GET Session Status
 * To know if the user is connected or not
 */
authentification.get('/get/SessionStatus', authMiddleware.verif_user_connect_cookie.bind(authMiddleware), async (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, message: 'User connected' });
});


/**
 * POST
 * Process the form to validate registration
 */
authentification.post('/post/validate_registration', authMiddleware.verif_user_no_connect_cookie.bind(authMiddleware), async (req: Request, res: Response) => {
  try {

    await user_validator.checkRegexValidateRegister(req.body);

    const userInscription = await user_check.getUserToValideInscription(req.body);

    await user_check.checkDateTokenValidationEmailRegistrer(userInscription);

    const value_cookie = await UserCreate.FinishRegister(userInscription);

    await send_mail.SendMailFinishRegister(userInscription);

    res.status(200).json({ status: 200, message: 'Registration completed successfully :)' , key_secret: value_cookie.key_secret, date_expiration: value_cookie.date_expiration});
  }
  catch (error)
  {
    error_msg_api(error, res);
  }
});

/**
 * POST PRE-REGISTER
 * It will send an email to the user to confirm inscription and if no account already exists in the registration and user table
 * The Middleware first check if the user is already connected, if this is the case we reject the registration because they are already connected
 */
authentification.post('/post/register', authMiddleware.verif_user_no_connect_cookie.bind(authMiddleware), async (req: Request, res: Response) =>
  {
    try 
    {
      await user_validator.checkRegexRegister(req.body);
      await user_check.checkIfUserExistsInBDUser(req.body);
      await user_check.CheckIfUserExistsInDBInscription(req.body);
      const value_cookie = await UserCreate.createUser(req.body);
      await send_mail.SendUserMailInscriptionConfirmation(value_cookie, req.body);
      res.status(200).json({ status: 200, message: 'Pre-Registration completed successfully and send email to validate registration' });
    }
    catch (error)
    {
      error_msg_api(error, res);
    }
  });

/**
 * POST LOGIN
 * POST route to process the login page form
 */
authentification.post('/post/login', authMiddleware.verif_user_no_connect_cookie.bind(authMiddleware), async (req: Request, res: Response) =>
{
  try 
  {
    await user_validator.checkRegexLogin(req.body);
    const user_password_hash = await user_check.getUser(req.body);
    await user_check.checkCompareHashMdp(req.body, user_password_hash);
    const value_cookie = await UserCreate.UpdateSessionUser(req.body);
    res.status(200).json({ status: 200, message: 'Connection completed successfully', key_secret: value_cookie.key_secret, date_expiration: value_cookie.date_expiration});
  }
  catch (error)
  {
    error_msg_api(error, res);
  }
});


export default authentification;