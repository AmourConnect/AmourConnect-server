export type GetUserDto = 
{
    id_User: number;
    pseudo: string;
    description: string;
    profile_picture: Blob;
    sex: string;
    date_of_birth: Date;
    city: string;
}