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

}