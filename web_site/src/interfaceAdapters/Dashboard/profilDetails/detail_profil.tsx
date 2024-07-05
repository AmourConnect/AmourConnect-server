import { AuthStatus } from "@/entities/AuthStatus";
import Loader1 from "@/app/components/Loading/Loader1";
import { UseAuth } from "@/interfaceAdapters/Hook/UseAuth";
import { UseUser } from "@/interfaceAdapters/Hook/UseUser";
import { UseRequestFriends } from "@/interfaceAdapters/Hook/UseRequestFriends";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { servicesTools } from "@/services/Tools";
import PopUp from "@/app/components/PopUp/pop_up1";
import PopUp2 from "@/app/components/PopUp/pop_up2";
import { Button_1Loading } from '@/app/components/Button/Button_1';
import { Button_link_welcome } from '@/app/components/Button/Button_link_welcome';

const ProfileDetailID = () => {


    const { UserGetConnected, status } = UseAuth();
    const { requestFriendsDto, MessageApiR, RequestFriendsAdd } = UseRequestFriends();
    const { userIDDto, UserGetUserID } = UseUser();
    const router = useRouter();
    const { id } = router.query;
    const idNumber = Number(id);


    useEffect(() => {
        UserGetConnected();
        UserGetUserID(idNumber);
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetConnected, UserGetUserID, router]);


    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show && MessageApiR || requestFriendsDto) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, MessageApiR, requestFriendsDto]);


    const button_requestfriendsAdd = (id_user: number): void =>
    {
        RequestFriendsAdd(id_user);
        setShow(true);
    }


    if (status === AuthStatus.Authenticated) {

        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {show && (requestFriendsDto?.message) && (
                        <PopUp title="Message" description={requestFriendsDto?.message} />
                    )} : { show &&(MessageApiR) && (
                        <PopUp2 title="Attention" description={MessageApiR} />
                    )}
                {userIDDto ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Partenaire potentiel 😏💖</h1>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                {userIDDto.sex === 'F' && !userIDDto.profile_picture && (
                                    <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={userIDDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {userIDDto.sex === 'M' && !userIDDto.profile_picture && (
                                    <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={userIDDto.pseudo} className="rounded-full border-4 border-blue-500" />
                                )}
                                {userIDDto.profile_picture && (
                                    <Image src={`data:image/jpeg;base64,${userIDDto.profile_picture}`} width="100" height="100" alt={userIDDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-xl font-medium text-black dark:text-white">
                                    <p className="text-pink-700"><span className="font-bold">{userIDDto.sex === 'F' ? 'Mme ' : 'Mr '}</span><span className="font-bold text-pink-700">{userIDDto.pseudo}</span></p>
                                </div>
                                <p className="text-pink-700">ID user : <span className="font-bold">{userIDDto.id_User}</span></p>
                                <p className="text-pink-700">Description : <span className="font-bold">{userIDDto.description}</span></p>
                                <p className="text-pink-700">Sex : <span className="font-bold">{userIDDto.sex}</span></p>
                                <p className="text-pink-700">Ville : <span className="font-bold">{userIDDto.city}</span></p>
                                <p className="text-pink-700">Date de naissance : {new Date(userIDDto.date_of_birth).toLocaleDateString()}</p>
                                <div className="text-pink-700">Age : {servicesTools.Tools.ConvertingADateToAge(userIDDto.date_of_birth)} ans</div>
                            </div>
                        </div>
                        <Button_1Loading
                            onClick={() => button_requestfriendsAdd(userIDDto.id_User)}
                            title="Demande de match"
                            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 md:text-base md:px-6 md:py-3"
                        />
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                        </div>
                        <Button_link_welcome/>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Aucun profil trouvé...</h1>
                )}
            </div>
        );
    }

    return (
        <Loader1 />
    );
}

export default ProfileDetailID