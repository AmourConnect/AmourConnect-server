import crypto from 'crypto';
import { Session } from './Interface';


export class FunctionSession

{
    /**
     * Purpose of creating a user session to send to the client side
     * @returns 
     */
    public generate_session_client = async (x_days: number, length_session: number): Promise<Session> => 
    {
        const key_secret = await crypto.randomBytes(length_session).toString('hex'); // token session

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
      return cookie;
    }

}