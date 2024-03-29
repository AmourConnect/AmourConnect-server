import { Body, UserInstance, UserInscriptionInstance } from '../Interface';
import bcrypt from 'bcrypt';
import { CustomError } from "../CustomError";
import { Validator } from '../Validator';
import { UserGet } from "../User/UserGet";

const user_get = new UserGet();


export class UserChecker extends Validator
{
    public async checkIfUserExistsInBDUser(body: Body): Promise<void> 
    {
      const utilisateur = await user_get.UserGetData(['utilisateur_id'], [{ pseudo: body.pseudo }, { email: body.email }]);
  
      if (utilisateur)
      {
        throw new CustomError('User already exists', 400);
      }
    }

    public async CheckIfUserExistsInDBInscription(body: Body): Promise<void>
    {
        const userInscription = await user_get.UserGetRegister(['user_inscription_id'], [{ pseudo: body.pseudo }, { email: body.email }]);
        if (userInscription) 
        {
          throw new CustomError('User already exists', 400);
        }
    }

    public checkSessionDateExpiration(date_session_expiration: Date)
    {
      if (!this.checkDateExpired(date_session_expiration)) 
      {
        throw new CustomError('Session expired', 403);
      }
    }

    public checkDateTokenValidationEmailRegistrer(userInscription: UserInscriptionInstance): void
    {
      if(!this.checkDateExpired(userInscription.date_token_expiration_email)) 
      {
        userInscription.destroy();
        throw new CustomError('Token expired', 403);
      }
    }

    public async checkCompareHashMdp(body: Body, user: UserInstance)
    {
      const resultat = await bcrypt.compare(body.mot_de_passe, user.password_hash);
      if(!resultat)
      {
        throw new CustomError('Password or Pseudo incorrect', 403); // in true, it's only password 
      }
    }
    public checkUserGet(user: any, message: string, error_http: number)
    {
      if (!user) 
      {
        throw new CustomError(message, error_http);
      }
    }
}