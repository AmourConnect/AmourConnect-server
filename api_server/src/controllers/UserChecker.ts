import { Body, UserInstance, UserInscriptionInstance } from './Interface';
import Utilisateur from '../models/shema_migration/utilisateur';
import { Op } from 'sequelize';
import UserInscription from '../models/shema_migration/user_inscription';
import { ModelStatic } from 'sequelize';
import bcrypt from 'bcrypt';


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


    public async getUserByNoHaveSessionToken(cookie_user: string): Promise<UserInstance | null> 
    {
      const user = await (Utilisateur as ModelStatic<UserInstance>).findOne<UserInstance>({
        attributes: ['token_session_user', 'token_session_expiration'],
        where: {
          token_session_user: cookie_user
        }
      });
      return user;
    }

    public async getUserToValideInscription(body: Body): Promise<UserInscriptionInstance | null> 
    {
            const userInscription = await (UserInscription as ModelStatic<UserInscriptionInstance>).findOne<UserInscriptionInstance>({
              where: {
                email: body.email,
                token_validation_email: body.Token_validation_email
              }
            });
            if (!userInscription) {
              throw new Error('User not found');
            }
            return userInscription;
    }

    public checkDateTokenValidationEmailRegistrer(userInscription: UserInscriptionInstance): void
    {
      const expirationDate = new Date();
      if(userInscription.date_token_expiration_email < expirationDate) 
      {
        userInscription.destroy();
        throw new Error('Token expired');
      }
    }

    public async getUser(body: Body): Promise<UserInstance | null> 
    {
      const utilisateur = await (Utilisateur as ModelStatic<UserInstance>).findOne<UserInstance>({
        attributes: ['utilisateur_id', 'password_hash'],
        where: {
          [Op.or]: [{ email: body.email }]
        }
      });
  
      if (!utilisateur)
      {
        throw new Error('User No Found');
      }
      return utilisateur;
    }

    public async checkCompareHashMdp(body: Body, user: UserInstance)
    {
      const resultat = await bcrypt.compare(body.mot_de_passe, user.password_hash);
      if(!resultat)
      {
        throw new Error('User No Found'); // Because we don't want to show the user that the password is incorrect as a security measure
      }
    }

    public async getDataUser(cookie_user: string)
    {
      const user = await (Utilisateur as ModelStatic<UserInstance>).findOne<UserInstance>({
        attributes: ['date_naissance', 'ville', 'sexe', 'pseudo', 'photo_profil'],
        where: {
          token_session_user: cookie_user
        }
      });
      return user;
    }


    /**
     * Algo SQL query that takes care of returning users from the same city, opposite genders
     *(if the user who is connected is of Male gender then return of Female gender
     * otherwise we do the opposite)
     * if the connected user is a man, return women less than 1 to 10 years old than their age, otherwise
     * if the connected user is a woman, return men 1 to 10 years older than her age.
     * @param user_data 
     * @returns 
     */
      public async GetAlgoAllUsersToMatch(user_data: UserInstance): Promise<UserInstance[]> {
        const user_to_match = await (Utilisateur as ModelStatic<UserInstance>).findAll<UserInstance>({
          attributes: ['utilisateur_id', 'pseudo', 'photo_profil', 'sexe', 'centre_interet', 'date_naissance'],
          where: {
              ville: user_data.ville,
              sexe: user_data.sexe === 'Masculin' ? 'Feminin' : 'Masculin',
              date_naissance: {
                  [Op.between]: [
                      user_data.sexe === 'Feminin' ?
                          new Date(user_data.date_naissance).setFullYear(new Date(user_data.date_naissance).getFullYear() - 10):
                          new Date(user_data.date_naissance).setFullYear(new Date(user_data.date_naissance).getFullYear() - 1),
                      user_data.sexe === 'Masculin' ?
                          new Date(user_data.date_naissance).setFullYear(new Date(user_data.date_naissance).getFullYear() + 10):
                          new Date(user_data.date_naissance).setFullYear(new Date(user_data.date_naissance).getFullYear() + 1),
                  ]
              }
          },
        });
        return user_to_match;
      }      
}