export type Account = 
{
    utilisateur_id: number;
    pseudo: string;
    email: string;
    photo_profil: Blob;
    sexe: string;
    date_naissance: Date;
    ville: string;
    centre_interet: string;
    grade: string;
}

export type UserInscription =
{
    date_token_expiration_email: Date;
    mot_de_passe: string;
    email: string;
    pseudo: string;
    cle_secret: string;
    sexe: string;
    date_naissance: string;
    ville: string;
}

export enum AuthStatus
{
    Unknown = 0,
    Authenticated = 1,
    Guest = 2
}