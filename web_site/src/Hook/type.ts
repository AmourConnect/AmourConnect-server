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

export type GetMessageDto =
{
  id_Message: number,
  message_content: string,
  date_of_request: Date,
  idUserIssuer: number,
  id_UserReceiver: number,
  userReceiverPseudo: string,
  userIssuerPseudo: string,
  userReceiverProfile_picture: Blob,
  userIssuerProfile_picture: Blob
  userIssuerSex: string,
  userReceiverSex: string
}

export enum StatusRequestFriends
{
    Onhold,
    Accepted,
}

export enum AuthStatus
{
    Authenticated,
    Unauthenticated
}