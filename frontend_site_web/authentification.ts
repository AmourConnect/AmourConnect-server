import { serialize, parse } from 'cookie'; // cookie serveur

export namespace AuthentificationPerso {

  /**
   * Créer un cookie de session à l'utilisateur
   * @param responseAPI 
   * @returns 
   */
  export const creer_cookie = async (responseAPI: any) => {
  
    const session = await responseAPI.cle_secret;
    const expires = responseAPI.date_expiration;

    // Convertir la date d'expiration en objet Date
    const expirationDate = new Date(expires);
    
    // Calculer la différence en secondes entre la date actuelle et la date d'expiration
    const maxAgeInSeconds = Math.floor((expirationDate.getTime() - Date.now()) / 1000);
    
    // Créer un cookie avec la durée de vie en secondes
    const myCookie = serialize('Cookie-user-AmourConnect', session, {
      path: '/',
      maxAge: maxAgeInSeconds,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict'
    });
  
    return myCookie;
  }
  
  
  /**
   * Récupérer la sesion de l'utilisateur
   * @param req 
   * @returns 
   */
  export const recup_session_user = async (req: any) => {
  
    const cookies = parse(req.headers.cookie || '');
    const sessionData = cookies['Cookie-user-AmourConnect'] || null;
  
    return sessionData;
  
  }

}