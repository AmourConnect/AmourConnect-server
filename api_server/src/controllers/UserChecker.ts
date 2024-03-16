import { Body, UserInstance } from './Interface';
import Utilisateur from '../models/shema_migration/utilisateur';
import { Op } from 'sequelize';
import UserInscription from '../models/shema_migration/user_inscription';
import { ModelStatic } from 'sequelize';



export class UserChecker
{
    public async checkIfUserExistsInBDUser(body: Body): Promise<void> 
    {
      const utilisateur = await Utilisateur.findOne({
        attributes: ['utilisateur_id'],
        where: {
          [Op.or]: [{ pseudo: body.pseudo }, { email: body.email }]
        }
      });
  
      if (utilisateur)
      {
        throw new Error('User already exists');
      }
    }

    public async CheckIfUserExistsInDBInscription(body: Body): Promise<void>
    {
        const userInscription = await UserInscription.findOne({
          attributes: ['user_inscription_id'],
          where: {
            [Op.or]: [{ pseudo: body.pseudo }, { email: body.email }]
          }
        });
        if (userInscription) 
        {
          throw new Error('User already exists');
        }
    }

    public async getUserBySessionToken(cookie_user: string): Promise<UserInstance | null> 
    {
      const user = await (Utilisateur as ModelStatic<UserInstance>).findOne<UserInstance>({
        attributes: ['token_session_user', 'token_session_expiration'],
        where: {
          token_session_user: cookie_user
        }
      });
      if (!user) {
        throw new Error('User not connected');
      }
      return user;
    }

    public checkSessionDateExpiration(date_session_expiration: Date)
    {
      const currentDate = new Date();
      if (date_session_expiration < currentDate) 
      {
        throw new Error('Session expired');
      }
    }
}