import { Model } from 'sequelize';


export interface Body
{
    email: string;
    pseudo: string;
    mot_de_passe: string;
    sexe: string;
    date_naissance: string;
    ville: string;
}

export interface Session
{
    key_secret: string;
    date_expiration: Date;
}

export interface User
{
    utilisateur_id: number;
    token_session_expiration: Date;
    token_session_user: string;
    pseudo: string;
    email: string;
    password_hash: string;
    photo_profil: Blob;
    created_at: Date;
    sexe: string;
    date_naissance: Date;
    ville: string;
    centre_interet: string;
    token_forget_email: string;
    grade: string;
    date_expiration_token_email: Date;
}


export interface UserInstance extends Model, User {}