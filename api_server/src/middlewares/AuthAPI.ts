import path from 'path';
import dotenv from 'dotenv';
const envPath = path.resolve(__dirname, '..' ,'..', '.env');
dotenv.config({ path: envPath });
import Utilisateur from '../models/shema_migration/utilisateur';



export namespace MiddlewareAuth 

  {

      /**
       * But de vérifier si l'utilisateur est connectée,
       * et que sa session n'est pas expirée
       * @param req 
       * @param res 
       * @param next 
       * @returns 
       */
      export const verif_user_connect_cookie = async (req: any, res: any, next: any) => 
      {
        try 
        {
            if (req && req.header && req.header('Cookie-user-AmourConnect')) 
            {
                const cookie_user = req.header('Cookie-user-AmourConnect');
                // Requête pour vérifier si le cookie de l'utilisateur existe dans la base de données 
                const cookie_user_bd: any  = await Utilisateur.findOne({
                  attributes: ['token_session_user', 'token_session_expiration'],
                  where: {
                    token_session_user: cookie_user
                  }
                });

                if (cookie_user_bd && cookie_user === cookie_user_bd.token_session_user && cookie_user_bd.token_session_expiration) 
                {
                    const expirationDate = new Date(cookie_user_bd.token_session_expiration);
                                
                    if (expirationDate > new Date()) // on vérifie si le cookie n'est pas expiré
                    {
                        // alors il est connectée
                        next();
                    }
                    else 
                    {
                        return res.status(403).json({ status: 403, message: 'Cookie Utilisateur expiré' });
                    }
                }
                else 
                {
                  return res.status(404).json({ status: 404, message: 'Vous n\'êtes pas connectée' });
                }
            }
            else 
            {
              // L'utilisateur n'a pas de cookie dans le header
              return res.status(401).json({ status: 401, message: 'Cookie AmourConnect n\'existe pas' });
            }
        } 
        catch (error) 
        {
          console.error('Erreur lors de la requête serveur ', error);
          return res.status(500).json({ status: 500, message: 'Erreur Serveur -_-' });
        }
      }


      /**
       * Attention, But de vérifier si l'utilisateur n'est pas connectée
       * @param req 
       * @param res 
       * @param next 
       * @returns 
       */
      export const verif_user_no_connect_cookie = async (req: any, res: any, next: any) => 
      {
        try 
        {
            if (req && req.header && req.header('Cookie-user-AmourConnect')) 
            {
                const cookie_user = req.header('Cookie-user-AmourConnect');
                // Requête pour vérifier si le cookie de l'utilisateur existe dans la base de données 
                const cookie_user_bd: any  = await Utilisateur.findOne({
                  attributes: ['token_session_user', 'token_session_expiration'],
                  where: {
                    token_session_user: cookie_user
                  }
                });

                if (cookie_user_bd && cookie_user === cookie_user_bd.token_session_user && cookie_user_bd.token_session_expiration) 
                {
                    const expirationDate = new Date(cookie_user_bd.token_session_expiration);
                                
                    if (expirationDate > new Date()) // on vérifie si le cookie n'est pas expiré
                    {
                        // alors il est déjà connectée
                        return res.status(403).json({ status: 403, message: 'Utilisateur déjà connectée' });
                    }
                    else 
                    {
                      next();
                    }
                }
                else 
                {
                  next();
                }
            }
            else 
            {
              // L'utilisateur n'a pas de cookie dans le header
              next();
            }
        } 
        catch (error) 
        {
          console.error('Erreur lors de la requête serveur ', error);
          return res.status(500).json({ status: 500, message: 'Erreur Serveur -_-' });
        }
      }
      
    }




    // export const AuthorisationAPI = async (req: any, res: any, next: any) => {

    //   const Authorisation = req.header('AuthorisationAPI');

    //   if(Authorisation && Authorisation === process.env.AuthorisationAPI) {

    //     next(); // on passe au Middelware suivant
    //   } else {
    //     res.status(403).json({ status: 403, message: `Authorisation API false` });
    //   }

    // }