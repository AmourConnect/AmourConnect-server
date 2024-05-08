export type Account = 
{
    id_User: number;
    pseudo: string;
    profile_picture: Blob;
    sex: string;
    date_of_birth: Date;
    city: string;
    emailGoogle: string;
}

export enum AuthStatus
{
    Authenticated,
    Unauthenticated
}