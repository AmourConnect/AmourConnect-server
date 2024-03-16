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