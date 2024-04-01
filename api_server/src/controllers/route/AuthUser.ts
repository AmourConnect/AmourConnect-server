import { UserValidator } from '../User/UserValidator';
import { Request, Response } from 'express';
import { UserChecker } from '../User/UserChecker';
import { UserCreator } from '../User/UserCreator';
import { SendEmail } from '../Email/SendEmail';
import { error_msg_api } from "../CustomError";
import { UserGet } from '../User/UserGet';


const user_validator = new UserValidator();

const user_check = new UserChecker();

const UserCreate = new UserCreator();

const send_mail = new SendEmail();

const user_get = new UserGet();


export default class AuthUser
{
    /**
    * POST
    * Process the form to validate registration
    */
    public async ValidateRegistration(req: Request, res: Response)
    {
        try {
            await user_validator.checkRegexValidateRegister(req.body);
        
            const userInscription = await user_get.UserGetRegister(['date_token_expiration_email', 'user_inscription_id', 'ville', 'date_naissance', 'sexe', 'mot_de_passe', 'pseudo', 'email'], [{ email: req.body.email, token_validation_email: req.body.Token_validation_email }] );

            await user_check.checkUserGet(userInscription, "User no found", 404);
        
            await user_check.checkDateTokenValidationEmailRegistrer(userInscription);
        
            const value_cookie = await UserCreate.FinishRegister(userInscription);

            await send_mail.SendUserMailInscriptionConfirmation(value_cookie, req.body);

            await send_mail.SendMailFinishRegister(userInscription);
        
            res.status(200).json({ status: 200, message: 'Registration completed successfully :)'});
          }
          catch (error)
          {
            error_msg_api(error, res);
          }
    }


    /**
     * POST PRE-REGISTER
     * It will send an email to the user to confirm inscription and if no account already exists in the registration and user table
     * The Middleware first check if the user is already connected, if this is the case we reject the registration because they are already connected
     */
    public async Register(req: Request, res: Response)
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
    }


    /**
    * POST LOGIN
    * POST route to process the login page form
    */
    public async Login(req: Request, res: Response)
    {
        try 
        {
          user_validator.checkRegexLogin(req.body);
          const user_password_hash = await user_get.UserGetData(['utilisateur_id', 'password_hash'], { email: req.body.email });
          user_check.checkUserGet(user_password_hash, "Password or Pseudo incorrect", 404);
          await user_check.checkCompareHashMdp(req.body, user_password_hash);
          const value_cookie = await UserCreate.UpdateSessionUser(req.body);
          UserCreate.send_cookie(value_cookie, res);
          res.status(200).json({ status: 200, message: 'Connection completed successfully' });
        }
        catch (error)
        {
          error_msg_api(error, res);
        }
    }


    /**
    * GET Session Status
    * To know if the user is connected or not
    */
    public async SessionUserStatus(req: Request, res: Response)
    {
        return res.status(200).json({ status: 200, message: 'User connected' });
    }


    /**
    * GET Welcome
    * Public test route to find out if the API works
    */
    public async TestoApi(req: Request, res: Response)
    {
        res.status(200).json({ status: 200, message: 'Welcome to the AmourConnect API' });
    }
}