import Utilisateur from '../models/shema_migration/utilisateur';
import { Op } from 'sequelize';


export const affichage_user_to_match = async (req: any, res: any) => {
    try {
        
    const cookie = req.header('Cookie-user-AmourConnect');


        // on recupere les données de l'utilisateur connectées
        const donnees_utilisateur_connecte: any = await Utilisateur.findOne({
            attributes: ['date_naissance', 'ville', 'sexe', 'pseudo', 'photo_profil'],
            where: {
                token_session_user: cookie
            }
          });

        // Algo requête SQL qui s'occupe de return des utilisateurs de la même ville, sexe opposés 
        // (si l'utilisateur qui est connectée est de sexe Masculin alors return des sexe Feminin
        // sinon on fait l'inverse)
        // si l'utilisateur connectée est un homme, return des femmes de moins de 1 à 10 ans que son âge, sinon
        // si l'utilisateur connectée est une femme, return des hommes de plus de 1 à 10 ans que son âge.

        
        const user_to_match = await Utilisateur.findAll({
            attributes: ['utilisateur_id', 'pseudo', 'photo_profil', 'sexe', 'centre_interet', 'date_naissance'],
            where: {
                ville: donnees_utilisateur_connecte.ville,
                sexe: donnees_utilisateur_connecte.sexe === 'Masculin' ? 'Feminin' : 'Masculin',
                date_naissance: {
                    [Op.between]: [
                        donnees_utilisateur_connecte.sexe === 'Feminin' ?
                            new Date(donnees_utilisateur_connecte.date_naissance).setFullYear(new Date(donnees_utilisateur_connecte.date_naissance).getFullYear() - 10):
                            new Date(donnees_utilisateur_connecte.date_naissance).setFullYear(new Date(donnees_utilisateur_connecte.date_naissance).getFullYear() - 1),
                        donnees_utilisateur_connecte.sexe === 'Masculin' ?
                            new Date(donnees_utilisateur_connecte.date_naissance).setFullYear(new Date(donnees_utilisateur_connecte.date_naissance).getFullYear() + 10):
                            new Date(donnees_utilisateur_connecte.date_naissance).setFullYear(new Date(donnees_utilisateur_connecte.date_naissance).getFullYear() + 1),
                    ]
                }
            },
        });        

        if (user_to_match.length > 0) { // si la longeur du tableau n'est pas vide .length > 0
            res.status(200).json({
                status: 200,
                message: `Utilisateur bien connecté, affiche la page accueil membre. Voici des utilisateurs pour matcher => `,
                user_to_match: user_to_match,
                donnees_utilisateur_connecte: donnees_utilisateur_connecte
            });
        } else {
            res.status(200).json({
                status: 200,
                message: `Utilisateur bien connecté. Malheureusement, aucun utilisateur trouvé en fonction du sexe opposé, ville, date de naissance (entre moins ou plus de 5 ans) :/`
            });
        }        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Erreur interne du serveur' });
    }
}