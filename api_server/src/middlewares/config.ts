import bodyParser from "body-parser";
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';
const envPath = path.resolve(__dirname, '..', '..','.env');
dotenv.config({ path: envPath });
/**
 * Configuration du rate limit (limite de requêtes) 100 requêtes toute les 15 minutes
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite de 100 requêtes par IP
  message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.',
});


// Middleware pour gérer les erreurs JSON
const handleJsonError = (err: any, req: any, res: any, next: any) => {
  const syntaxError = err as { status?: number, body?: any };

  if (syntaxError instanceof SyntaxError && syntaxError.status === 400 && 'body' in syntaxError) {
    res.status(400).json({ error: 'Erreur de syntaxe JSON dans le corps de la requête' });
  } else {
    next();
  }
};



/**
 * Gérer la configuration CORS du Middlewares
 * @param app
 */
export default function configureAppExpress (app: any) {

  app.disable('x-powered-by'); // désactiver le type de serveur utilisé

  app.use(limiter); // limitation du nombre de requête

  app.use(function (req: any, res: any, next: any) {
      res.header('Access-Control-Allow-Origin', process.env.NOM_DE_DOMAINE_FRONTEND);
      res.header('Strict-Transport-Security', 'max-age=31536000');
      res.header('X-XSS-Protection', '1; mode=block');
      res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.header('Content-Security-Policy', 'default-src \'self\'');
      res.header('Access-Control-Allow-Methods', 'GET,POST');
      res.header('Access-Control-Expose-Headers', 'Content-Length');
      res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
      res.header('X-Frame-Options', 'DENY');
      res.header('X-Content-Type-Options', 'nosniff');
      if (req.method === 'OPTIONS') { // pré-vérification CORS (sans ce code le côté client risque d'être bloqué)
        return res.sendStatus(200);
    } else {
      return next(); // passe au Middleware suivant
      }
    });

    app.use(bodyParser.json()); // pour convertir en JSON le Body
    
    app.use(handleJsonError); // gérer les erreurs JSON

    app.use(bodyParser.urlencoded({ extended: true })); // décodé les données

}