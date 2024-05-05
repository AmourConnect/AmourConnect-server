export type Account = 
{
    id_User: number;
    pseudo: string;
    profile_picture: Blob;
    sex: string;
    dateOfBirth: string;
    account_created_at: Date;
    city: string;
}

export type UserRegister =
{
    dateOfBirth: string;
    pseudo: string;
    sex: string;
    city: string;
    response: string
}

export enum AuthStatus
{
    Authenticated,
    Unauthenticated
}