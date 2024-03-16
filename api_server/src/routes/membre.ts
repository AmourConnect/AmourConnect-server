import express from 'express';
import { affichage_user_to_match } from '../controllers/membre_ctrl';


const membre = express.Router();

// /**
//  * PAGE ACCUEIL MEMBRE
//  */

// // Route GET Afficher page accueil Membre
// membre.get('/get/page_accueil', async (req, res) => {
//     await affichage_user_to_match(req, res);
// });


export default membre;