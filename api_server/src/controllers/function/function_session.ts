import crypto from 'crypto';


export namespace FunctionSession {


/**
 * Pour but de créer une session utilisateur à envoyer côté client
 * @returns 
 */
export const create_cookie_send_client = async () => {

      const cle_secret = await crypto.randomBytes(64).toString('hex'); // token de session générer

      // Calculer la date d'expiration dans 7 jours
      const date_expiration = new Date();
      date_expiration.setDate(date_expiration.getDate() + 7);
    
    return {
      cle_secret: cle_secret,
      date_expiration: date_expiration
    }

}


}