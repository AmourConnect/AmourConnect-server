export type GetRequestFriendsDto =
{
  id_RequestFriends: number;
  status: StatusRequestFriends,
  date_of_request: Date;
  id_UserReceiver: number;
  idUserIssuer: number;
  userReceiverPseudo: string;
  userIssuerPseudo: string;
  message: string;
  userReceiverPictureProfile : Blob;
  userIssuerPictureProfile : Blob;
  userIssuerSex: string;
  userReceiverSex: string;
}


export enum StatusRequestFriends
{
    Onhold,
    Accepted,
}