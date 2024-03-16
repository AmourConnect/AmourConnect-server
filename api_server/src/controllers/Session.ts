import crypto from 'crypto';


export namespace FunctionSession

{

    /**
     * Purpose of creating a user session to send to the client side
     * @returns 
     */
    export const create_cookie_send_client = async () => 

    {

        const key_secret = await crypto.randomBytes(64).toString('hex'); // token session

        // Calculate expiration date in 7 days
        const date_expiration = new Date();
        date_expiration.setDate(date_expiration.getDate() + 7);
        
        return {
          key_secret: key_secret,
          date_expiration: date_expiration
        }

    }

}