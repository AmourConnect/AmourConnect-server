import { Body, UserInstance, UserInscriptionInstance } from '../Interface';
import { Op } from 'sequelize';
import Utilisateur from '../../models/shema_migration/utilisateur';
import { CustomError } from "../CustomError";
import { ModelStatic } from 'sequelize';
import UserInscription from '../../models/shema_migration/user_inscription';


export class UserGet
{

    /**
     * Exemple => await checkIfUserExistsInBDUser(['utilisateur_id', 'nom'], [{ nom: body.nom }, { prenom: body.prenom }], Op.and);
     * @param attributes 
     * @param conditions 
     * @param op 
     * @returns 
     */
    public async UserGetData(attributes?: string[], conditions?: object, op?: any): Promise<UserInstance | null> 
    {
        const user = await (Utilisateur as ModelStatic<UserInstance>).findOne<UserInstance>({
            attributes: attributes,
            where: {
              [op || Op.or]: conditions
            }
          });
          return user;
    }

    /**
     * Exemple => await checkIfUserExistsInBDUser(['utilisateur_id', 'nom'], [{ nom: body.nom }, { prenom: body.prenom }], Op.and);
     * @param attributes 
     * @param conditions 
     * @param op 
     * @returns 
     */
    public async UserGetRegister(attributes?: string[], conditions?: object, op?: any): Promise<UserInscriptionInstance | null>
    {
        const userInscription = await (UserInscription as ModelStatic<UserInscriptionInstance>).findOne<UserInscriptionInstance>({
            attributes: attributes,
            where: {
              [op || Op.or]: conditions
            }
          });
          return userInscription;
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
    public async GetAlgoAllUsersToMatch(user_data: UserInstance): Promise<UserInstance[]> 
    {
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