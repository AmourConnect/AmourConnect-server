import bcrypt from 'bcrypt';
import { Body, Session } from './Interface';
import { FunctionSession } from './Session';
import UserInscription from '../models/shema_migration/user_inscription';

export class UserCreator
{
    public async createUser(body: Body): Promise<Session> 
    {
      const hashedPassword = await bcrypt.hash(body.mot_de_passe, 10);
      const value_cookie = await new FunctionSession().create_cookie_send_client(7);
  
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
}