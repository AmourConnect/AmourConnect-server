import { NextApiRequest, NextApiResponse } from 'next';
import Cookie_Session from '../../lib/Cookie_Session';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const session = await new Cookie_Session();
        const responseAPI = await session.RequestApi(req, "/auth/post/login", 'POST', req.body);
  
        if(responseAPI && responseAPI.status === 200 && responseAPI.message === "Connection completed successfully") {

        const new_session =  await session.create_cookie(responseAPI);

        res.setHeader('Set-Cookie', new_session);

        res.status(200).json(responseAPI);
        
        } else {
          res.status(200).json(responseAPI);
        }
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API externe', error);
        res.status(500).json({ error: 'Erreur lors de la requête à l\'API externe' });
      }
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
}  