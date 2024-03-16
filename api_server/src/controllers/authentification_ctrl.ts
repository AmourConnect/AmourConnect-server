  export namespace Authentification 

  {

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