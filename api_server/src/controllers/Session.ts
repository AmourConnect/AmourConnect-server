import crypto from 'crypto';
import { Validator } from './Validator';
import { Session } from './Interface';


export class FunctionSession extends Validator

{
    /**
     * Purpose of creating a user session to send to the client side
     * @returns 
     */
    public create_cookie_send_client = async (x_days: number): Promise<Session> => 
    {
        const key_secret = await crypto.randomBytes(64).toString('hex'); // token session

        // Calculate expiration date in X days
        const date_expiration = new Date();
        date_expiration.setDate(date_expiration.getDate() + x_days);
        
        return {
          key_secret: key_secret,
          date_expiration: date_expiration
        }
    }

    public get_cookie (req: any): string
    {
      const cookie = req.header('Cookie-user-AmourConnect');
      this.checkTokenSession(cookie);
      return cookie;
    }

    public get_no_cookie(req: any): any
    {
      const cookie = req.header('Cookie-user-AmourConnect');
      return cookie;
    }

}