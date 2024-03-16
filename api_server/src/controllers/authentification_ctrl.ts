import { RegEXValidator } from './class/function_regex';
import Utilisateur from '../models/shema_migration/utilisateur';
import UserInscription from '../models/shema_migration/user_inscription';
import { FunctionSession } from './Session';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';


  interface body_temporary_registration {
    email: string;
    pseudo: string;
    mot_de_passe: string;
    sexe: string;
    date_naissance: Date;
    ville: string;
  }

  // /**
  //  * To manage temporary registration in the pre-registration table
  //  */
  // export class temporary_registration
  // {
  //   public checkRegex(body: body_temporary_registration, res: Response): boolean 
  //   {
  //     if (
  //         RegEXValidator.isValidEmail(body.email, res)
  //         && RegEXValidator.isValidPseudo(body.pseudo, res)
  //         && RegEXValidator.isValidPassword(body.mot_de_passe, res)
  //         && RegEXValidator.isValidSexe(body.sexe, res)
  //         && RegEXValidator.isValidDate(body.date_naissance, res)
  //         && RegEXValidator.isValidVille(body.ville, res)
  //       ) 
  //       {
  //         return true;
  //       }
  //   }

  //   public async check_if_the_account_does_not_already_exist (body: body_temporary_registration): Promise<object>
  //   {
  //     const utilisateur = await Utilisateur.findOne({
  //       attributes: ['utilisateur_id'],
  //       where: {
  //         [Op.or]: [{ pseudo: body.pseudo }, { email: body.email }]
  //       }
  //     });

  //     return utilisateur;
  //   }

  //   public async if_user_not_found_in_table_user_check_in_the_table_inscription (utilisateur: string, body: body_temporary_registration, res: Response): Promise<object>
  //   {
  //     //si il n'a pas été trouvé on le check dans la table user inscription
  //     if (utilisateur === null) 
  //     {
  //       const userInscription = await UserInscription.findOne({
  //         attributes: ['user_inscription_id'],
  //         where: {
  //           [Op.or]: [{ pseudo: body.pseudo }, { email: body.email }]
  //         }
  //       });
  //       return userInscription;
  //     }
  //     else
  //     { // le compte existe déjà
  //       return res.status(401).json({ status: 401, message: 'Email ou Pseudo Existe déjà' });
  //     }
  //   }

  //   public async if_user_not_found_in_table_inscription_check_in_the_table_user(userInscription: string, body: body_temporary_registration, res: Response)
  //   {
  //     if (userInscription === null) 
  //     { // si c'est null le compte n'existe pas Alors on créer le compte

  //           const hashedPassword = await bcrypt.hash(body.mot_de_passe, 10); // on hache le mot de passe

  //           const value_cookie = await FunctionSession.create_cookie_send_client();
        
  //           // on enregistre l'email dans la base de données
  //           await UserInscription.create({
  //             email: body.email,
  //             pseudo: body.pseudo,
  //             mot_de_passe: hashedPassword,
  //             token_validation_email: value_cookie.cle_secret,
  //             date_token_expiration_email: value_cookie.date_expiration,
  //             sexe: body.sexe,
  //             date_naissance: body.date_naissance,
  //             ville: body.ville
  //           });
  //           // on lui envoie un email
  //           const corps = await corps_inscription_temporaire(body.pseudo, value_cookie.cle_secret);
  //           await envoyerEmail(body.email, 'Valider Inscription AmourConnect ❤️', corps);
  //           return res.status(200).json({ status: 200, message: 'Pré-Inscription fini avec succès et envoie du mail pour valider l\'inscription' });
  //     }
  //     else 
  //     { // le compte existe déjà
  //       return res.status(401).json({ status: 401, message: 'Email ou Pseudo Existe déjà dans la table inscription' });
  //     }
  //   }

  // }

  export namespace Authentification 

  {


    // /**
    //  * Function qui sert à faire la pré-inscription de l'utilisateur
    //  * @param req 
    //  * @param res 
    //  */
    // export const inscription_temporaire = async (req: any, res: any) => {
        
    //   try {

    //   const pseudo = req.body.pseudo;
    //   const email = req.body.email;
    //   const mot_de_passe = req.body.mot_de_passe;
    //   const ville = req.body.ville;
    //   const date_naissance = req.body.date_naissance;
    //   const sexe = req.body.sexe;
      
    //     // on vérifie la REGEX
    //     if(RegEXValidator.isValidEmail(email, res) 
    //     && RegEXValidator.isValidPseudo(pseudo, res) 
    //     && RegEXValidator.isValidPassword (mot_de_passe, res) 
    //     && RegEXValidator.isValidSexe(sexe, res) 
    //     && RegEXValidator.isValidDate(date_naissance, res) 
    //     && RegEXValidator.isValidVille(ville, res)) { // si la RegEX est true
              
    //           // on vérifie si le compte n'existe pas déjà dans la base de données
    //           // on attend à chaque requête
    //           const utilisateur = await Utilisateur.findOne({
    //             attributes: ['utilisateur_id'],
    //             where: {
    //               [Op.or]: [{ pseudo: pseudo }, { email: email }]
    //             }
    //           });

    //           //si il n'a pas été trouvé on le check dans la table user inscription
    //           if (utilisateur === null) {
    //               const userInscription = await UserInscription.findOne({
    //                 attributes: ['user_inscription_id'],
    //                 where: {
    //                   [Op.or]: [{ pseudo: pseudo }, { email: email }]
    //                 }
    //               });


    //               if (userInscription === null) { // si c'est null le compte n'existe pas Alors on créer le compte

    //                     const hashedPassword = await bcrypt.hash(mot_de_passe, 10); // on hache le mot de passe

    //                     const value_cookie = await FunctionSession.create_cookie_send_client();
                        
    //                     // on enregistre l'email dans la base de données
    //                     await UserInscription.create({
    //                       email: email,
    //                       pseudo: pseudo,
    //                       mot_de_passe: hashedPassword,
    //                       token_validation_email: value_cookie.cle_secret,
    //                       date_token_expiration_email: value_cookie.date_expiration,
    //                       sexe: sexe,
    //                       date_naissance: date_naissance,
    //                       ville: ville
    //                     });

    //                     // on lui envoie un email
    //                     const corps = await corps_inscription_temporaire(pseudo, value_cookie.cle_secret);
    //                     await envoyerEmail(email, 'Valider Inscription AmourConnect ❤️', corps);
    //                     res.status(200).json({ status: 200, message: 'Pré-Inscription fini avec succès et envoie du mail pour valider l\'inscription' });
    //               } else { // le compte existe déjà
    //                 res.status(401).json({ status: 401, message: 'Email ou Pseudo Existe déjà dans la table inscription' });
    //               }
    //           }else { // le compte existe déjà
    //             res.status(401).json({ status: 401, message: 'Email ou Pseudo Existe déjà dans la table utilisateur' });
    //           }
    //         }
    //       } catch (error) {
    //           console.error(error);
    //           res.status(500).json({ status: 500, message: 'Erreur interne du serveur' });
    //       }
    // }

    // /**
    //  * Valider l'inscription de l'utilisateur
    //  * @param req 
    //  * @param res 
    //  */
    // export const inscription_final = async (req: any, res: any) => {

    //   try {

    //   const email = req.body.email;
    //   const Token_validation_email = req.body.Token_validation_email;

    //   // Validation la REGEX
    //   if(
    //     RegEXValidator.isValidEmail(email, res) 
    //     && RegEXValidator.isValidToken(Token_validation_email, res)) { // si la RegEX est true


    //         // on vérifie si l'email et le token sont correctes
    //         const userInscription: any = await UserInscription.findOne({
    //           where: {
    //             email: email,
    //             token_validation_email: Token_validation_email
    //           }
    //         });

    //         if (userInscription !== null) { // si l'utilisateur correspond bien

    //           const expirationDate = new Date(userInscription.date_token_expiration_email);

    //           // on vérifie si le token de validation expiration n'est pas exipiré
    //           if(expirationDate > new Date()) 
    //           {
    //               // il est encore valide
    //               const value_cookie = await FunctionSession.create_cookie_send_client(); // token générer

    //               // Inscription définitive de l'utilisateur dans la table 'utilisateur'
    //               await Utilisateur.create({
    //                 email: userInscription.email,
    //                 pseudo: userInscription.pseudo,
    //                 password_hash: userInscription.mot_de_passe,
    //                 grade: 'User',
    //                 token_session_user: value_cookie.cle_secret,
    //                 token_session_expiration: value_cookie.date_expiration,
    //                 sexe: userInscription.sexe,
    //                 date_naissance: userInscription.date_naissance,
    //                 ville: userInscription.ville
    //               });
              
    //               // Suppression de sa données dans la table 'user_inscription'
    //               await userInscription.destroy();
    //               // on lui envoye un email
    //               const corps = await corps_inscription_validation(userInscription.pseudo);
    //               await envoyerEmail(email, 'Inscription Finie AmourConnect ❤️', corps);
    //               res.status(200).json({ status: 200, message: 'Inscription finie avec succès :)' , cle_secret: value_cookie.cle_secret, date_expiration: value_cookie.date_expiration});
    //           } else 
    //           {
    //               userInscription.destroy(); // on supprime l'utilisateur de la table inscription car il est expiré
    //               res.status(400).json({ status: 400, message: 'Token expiré'});
    //           }
    //         } else {
    //           res.status(404).json({ status: 404, message: 'Email ou Token invalide pour valider l\'inscription' });
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Erreur lors de la validation de l\'inscription :', error);
    //       res.status(500).json({ status: 500, message: 'Une erreur serveur' });
    //     }
    // }


    // /**
    //  * Traiter le formulaire de connexion
    //  * @param req 
    //  * @param res 
    //  */
    // export const connexion_final = async (req: any, res: any) => {

    //   try {

    //   const email = req.body.email;
    //   const mot_de_passe = req.body.mot_de_passe;

    //   if(RegEXValidator.isValidEmail(email, res) 
    //   && RegEXValidator.isValidPassword(mot_de_passe, res)) { // Si la RegEX est bonne


    //           // on vérifie si le mot de passe et l'email correspondent
    //           const user_password_hash: any = await Utilisateur.findOne({
    //             attributes: ['password_hash'],
    //             where: {
    //               email: email
    //             }
    //           });

    //           if(user_password_hash !== null) { // si il a trouvé l'utilisateur, on compare le mot de passe
    //             const resultat = await bcrypt.compare(mot_de_passe, user_password_hash.password_hash);
    //             if(resultat) { // mot de passe correcte, on génère un nouveau cookie de sessions, 

    //               const value_cookie = await FunctionSession.create_cookie_send_client(); // token générer
                  
    //               // et mettre à jour celui de la base de données

    //               await Utilisateur.update(
    //                 { token_session_user: value_cookie.cle_secret, token_session_expiration: value_cookie.date_expiration },
    //                 { where: { email: email } }
    //               )

    //               res.status(200).json({ status: 200, message: 'Connexion effectuée avec succès', cle_secret: value_cookie.cle_secret, date_expiration: value_cookie.date_expiration});
    //             } else { // mot de passe incorrecte
    //               res.status(401).json({ status: 401, message: 'Mot de passe incorrecte' });
    //             }
    //           }
    //           else { // sinon l'identifiant n'existe pas
    //             res.status(404).json({ status: 404, message: 'L\'utilisateur n\'existe pas' });
    //           }
              
    //         }
            
    //       } catch (error) {
    //         console.error('Erreur lors de la validation de l\'inscription :', error);
    //         res.status(500).json({ status: 500, message: 'Une erreur serveur' });
    //       }
    // }


  }