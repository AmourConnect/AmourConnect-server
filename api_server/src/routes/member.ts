import express from 'express';
import { Request, Response } from 'express';
import { FunctionSession } from '../controllers/Session';
import { UserChecker } from '../controllers/UserChecker';
import { error_msg_api } from "../controllers/CustomError";

const membre = express.Router();

const session = new FunctionSession();

const user_check = new UserChecker();


/**
 * GET User to match
 */
membre.get('/get/user_to_match', async (req: Request, res: Response) => 
{
    try 
    {
        const cookie_user = await session.get_cookie(req);
        const data_user = await user_check.getDataUser(cookie_user);
        const data_to_match = await user_check.GetAlgoAllUsersToMatch(data_user);
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
});


export default membre;