import { NextFunction, Response } from "express";
import { FunctionSession } from '../controllers/Session';
import { UserChecker } from '../controllers/User/UserChecker';
import { error_msg_api } from "../controllers/CustomError";
import { Validator } from "../controllers/Validator";
import { UserGet } from "../controllers/User/UserGet";

const user_get = new UserGet();

const user_check = new UserChecker();

const session = new FunctionSession();

export class AuthMiddleware extends Validator

{

  public async verif_user_connect_cookie(req: Request, res: Response, next: NextFunction)
  {
    try {

      const cookie_user = session.get_cookie(req);

      this.checkTokenSession(cookie_user);

      const db_user = await user_get.UserGetData(['token_session_user', 'token_session_expiration'], { token_session_user: cookie_user });

      user_check.checkUserGet(db_user, "User no connected", 403);

      user_check.checkSessionDateExpiration((await db_user).token_session_expiration);

      next();
    }
    catch (error)
    {
      error_msg_api(error, res);
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
        const cookie_user = session.get_cookie(req);

        if(!this.checkTokenSessionReturnBool(cookie_user)) {
          return next();
        }

        const db_user = await user_get.UserGetData(['token_session_user', 'token_session_expiration'], { token_session_user: cookie_user });

        if (!db_user) {
          return next();
        }
    
        if (!this.checkDateExpired(db_user.token_session_expiration)) 
        {
          return next();
        }
    
        res.status(403).json({ status: 403, message: "User Already connected" });

      }
      catch (error)
      {
        error_msg_api(error, res);
      }
  }
}