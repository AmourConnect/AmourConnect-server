import { useCallback, useState } from "react";
import { AuthStatus } from "@/entities/AuthStatus";
import {GetUserDto } from "@/entities/GetUserDto";
import { apiClient, ApiError } from "@/services/apiClient";
import { servicesTools } from "@/services/Tools";
import {SetUserDto} from '@/entities/SetUserDto';

export const UseAuth = () =>
{
    const [UserAuthDto, setUserAuthDto] = useState<GetUserDto | null>(null);
    const [UserRegisterDto, setUserRegisterDto] = useState<GetUserDto | null>(null);
    const [MessageApiAuth, setMessageApiAuth] = useState<string | null>(null);

    let status: AuthStatus;

    switch (UserAuthDto) 
    {
        case null:
          status = AuthStatus.Unauthenticated;
          break;
        default:
          status = AuthStatus.Authenticated;
          break;
    }

    const AuthLoginGoogle = useCallback(() => {
        window.location.href = servicesTools.Tools.GOOGLE_LOGIN_URL;
    }, []);


    const UserGetConnected = useCallback(() => {
        apiClient.FetchData<GetUserDto>("/User/GetUserConnected")
            .then(response => setUserAuthDto(response))
            .catch(() => setUserAuthDto(null))
    }, []);


    const AuthRegister = useCallback((SetUserDto: SetUserDto) => {
        apiClient.FetchData<GetUserDto>("/Auth/register", { json: SetUserDto })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                if (error instanceof ApiError) {
                    setMessageApiAuth(error.message);
                }
                setUserRegisterDto(null)
            });
    }, []);

    return {
        UserGetConnected,
        AuthLoginGoogle,
        AuthRegister,
        UserAuthDto,
        MessageApiAuth,
        UserRegisterDto,
        status
    }
}