import bcrypt from 'bcrypt';
import { Body, Session, UserInscriptionInstance } from '../Interface';
import { FunctionSession } from '../Session';
import UserInscription from '../../models/shema_migration/user_inscription';
import Utilisateur from '../../models/shema_migration/utilisateur';

export class UserCreator
{
    public async createUser(body: Body): Promise<Session> 
    {
      const hashedPassword = await bcrypt.hash(body.mot_de_passe, 10);
      const value_cookie = await new FunctionSession().generate_session_client(7, 6);
  
      await UserInscription.create({
        email: body.email,
        pseudo: body.pseudo,
        mot_de_passe: hashedPassword,
        token_validation_email: value_cookie.key_secret,
        date_token_expiration_email: value_cookie.date_expiration,
        sexe: body.sexe,
        date_naissance: body.date_naissance,
        ville: body.ville
      });
      return value_cookie;
    }

    public async FinishRegister(userInscription: UserInscriptionInstance): Promise<Session> 
    {
      const value_cookie = await new FunctionSession().generate_session_client(7, 64);

      await Utilisateur.create({
        email: userInscription.email,
        pseudo: userInscription.pseudo,
        password_hash: userInscription.mot_de_passe,
        grade: 'User',
        token_session_user: value_cookie.key_secret,
        token_session_expiration: value_cookie.date_expiration,
        sexe: userInscription.sexe,
        date_naissance: userInscription.date_naissance,
        ville: userInscription.ville
      });
              
      await userInscription.destroy();

      return value_cookie;
    }

    public async UpdateSessionUser(body: Body): Promise<Session>
    {
      const value_cookie = await new FunctionSession().generate_session_client(7, 64);
      await Utilisateur.update(
        { token_session_user: value_cookie.key_secret, token_session_expiration: value_cookie.date_expiration },
        { where: { email: body.email } }
      )
      return value_cookie;
    }
}