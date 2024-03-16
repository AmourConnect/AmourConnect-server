import { Body } from './Interface';
import Utilisateur from '../models/shema_migration/utilisateur';
import { Op } from 'sequelize';
import UserInscription from '../models/shema_migration/user_inscription';



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
}