import crypto from 'crypto';
import { Session } from './Interface';
import { Validator } from './Validator';
import { parse } from 'dotenv';


export class FunctionSession extends Validator
{
    /**
     * Purpose of creating a user session to send to the client side
     * @returns 
     */
    public generate_session_client = async (x_days: number, length_session: number): Promise<Session> => 
    {
        const key_secret = await crypto.randomBytes(length_session).toString('hex');
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
      const cookies = parse(req.headers.cookie || '');
      const cookie_user = cookies['Cookie-user-AmourConnect'] || null;
      return cookie_user;
    }

}