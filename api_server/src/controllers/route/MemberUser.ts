import { Request, Response } from 'express';
import { error_msg_api } from "../CustomError";
import { FunctionSession } from '../Session';
import { UserGet } from '../User/UserGet';

const session = new FunctionSession();

const user_get = new UserGet();



export default class MemberUser
{
    /**
    * GET User to match
    */
    public async GetUsersToMatch(req: Request, res: Response): Promise<void>
    {
        try
        {
            const cookie_user = await session.get_cookie(req);
            const data_user = await user_get.UserGetData(['date_naissance', 'ville', 'sexe', 'pseudo', 'photo_profil'], { token_session_user: cookie_user });
            const data_to_match = await user_get.GetAlgoAllUsersToMatch(data_user);
            if (data_to_match.length > 0) {
                res.status(200).json({
                    status: 200,
                    message: `Here are users to match =>`,
                    user_to_match: data_to_match,
                    donnees_utilisateur_connecte: data_user
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: `Unfortunately, no users found based on opposite gender, city, date of birth (between less or more than 5 years old) :/`
                });
            } 
        }
        catch (error)
        {
            error_msg_api(error, res);
        }
    }
}