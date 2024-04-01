import bodyParser from "body-parser";
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';
import { NextFunction, Response } from "express";
const envPath = path.resolve(__dirname, '..', '..','.env');
dotenv.config({ path: envPath });



export class ConfigExpressMiddlewares
  {

    protected limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit of 100 requests per IP
      message: 'Too many requests from this IP address, please try again later.',
    });


    protected handleJsonError = (err: any, req: Request, res: Response, next: NextFunction) => {
      const syntaxError = err as { status?: number, body?: any };
    
      if (syntaxError instanceof SyntaxError && syntaxError.status === 400 && 'body' in syntaxError) {
        res.status(400).json({ error: 'JSON syntax error in request body' });
      } else {
        next();
      }
    };

    protected errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
      console.error(err.message);
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }

  }


export class ConfigApp extends ConfigExpressMiddlewares

{

    public configureAppExpress (app: any)
    {

      app.disable('x-powered-by');

      app.use(this.limiter);

      app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header('Strict-Transport-Security', 'max-age=31536000');
        res.header('Access-Control-Allow-Origin', "http://192.168.1.21:3000");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('X-XSS-Protection', '1; mode=block');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH, DELETE');
        res.header('X-Frame-Options', 'DENY');
        res.header('X-Content-Type-Options', 'nosniff');
        res.header('Content-Security-Policy', 'default-src \'self\'');
        res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
          if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        } else {
          return next();
          }
        });

        app.use(bodyParser.json());
        
        app.use(this.handleJsonError);

        app.use(this.errorHandler);

    }

}