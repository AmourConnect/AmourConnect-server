export type GetMessageDto =
{
  id_Message: number,
  message_content: string,
  date_of_request: Date,
  idUserIssuer: number,
  id_UserReceiver: number,
  userReceiverPseudo: string,
  userIssuerPseudo: string,
}