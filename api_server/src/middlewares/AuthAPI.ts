import { NextFunction, Response } from "express";
import { FunctionSession } from '../controllers/Session';
import { UserChecker } from '../controllers/UserChecker';


export class AuthMiddleware

{

  public async verif_user_connect_cookie(req: Request, res: Response, next: NextFunction)
  {

    try {

      const session = new FunctionSession();

      const cookie_user = session.get_cookie(req);

      const user_checker = new UserChecker();

      const db_user = user_checker.getUserBySessionToken(cookie_user);

      user_checker.checkSessionDateExpiration((await db_user).token_session_expiration);

      next();

    }
    catch (error)
    {
      res.status(401).json({ status: 401, message: error.message });
    }
  }

  /**
   * Be careful, this middleware is true if the user is not connected
   * @param req 
   * @param res 
   * @param next 
   */
  public async verif_user_no_connect_cookie(req: Request, res: Response, next: NextFunction)
  {
      try 
      {
        const session = new FunctionSession();

        const cookie_user = session.get_no_cookie(req);

        if(!cookie_user) {
          return next();
        }

        const user_checker = new UserChecker();

        const db_user = await user_checker.getUserByNoHaveSessionToken(cookie_user);

        if (!db_user) {
          return next();
        }
    
        const date_session_expiration = db_user.token_session_expiration;
    
        const currentDate = new Date();
        if (date_session_expiration < currentDate) {
          return next();
        }
    
        res.status(403).json({ status: 403, message: "User Already connected" });

      }
      catch (error)
      {
        res.status(401).json({ status: 401, message: error.message });
      }
  }
}