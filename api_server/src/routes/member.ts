import express from 'express';
import MemberUser from '../controllers/route/MemberUser';

const membre = express.Router();

const User = new MemberUser(); 

membre.get('/get/user_to_match', User.GetUsersToMatch.bind(User));


export default membre;