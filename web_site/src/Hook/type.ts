export type Account = 
{
    id_User: number;
    pseudo: string;
    profile_picture: Blob;
    sex: string;
    date_of_birth: Date;
    city: string;
}

export type RequestFriends =
{
  id_RequestFriends: number;
  status: StatusRequestFriends,
  date_of_request: Date;
  id_UserReceiver: number;
  idUserIssuer: number;
  userReceiverPseudo: string;
  userIssuerPseudo: string;
}

export enum StatusRequestFriends
{
    Onhold,
    Accepted,
    Refused
}

export enum AuthStatus
{
    Authenticated,
    Unauthenticated
}