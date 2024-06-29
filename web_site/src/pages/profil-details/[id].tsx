import { AuthStatus} from "@/Hook/type";
import Loader1 from "../../app/components/Loading/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { ConvertingADateToAge } from "../../utils/helper";
import PopUp from "@/app/components/PopUp/pop_up1";
import PopUp2 from "../../app/components/PopUp/pop_up2";
import { Button_1Loading } from '../../app/components/Button/Button_1';
import Link from 'next/link';

export default function ProfileDetailID() {


    const { status, UserGetUserID, userDto, requestFriendsDto, MessageApi, RequestFriendsAdd } = UseAuth();
    const router = useRouter();
    const { id } = router.query;
    const idNumber = Number(id);


    useEffect(() => {
        UserGetUserID(idNumber);
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetUserID, router]);


    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show && MessageApi || requestFriendsDto) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, MessageApi, requestFriendsDto]);


    function button_requestfriendsAdd(id_user: number)
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
                    )} : { show &&(MessageApi) && (
                        <PopUp2 title="Attention" description={MessageApi} />
                    )}
                {userDto ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Un partenaire potentiel 😏💖</h1>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                {userDto.sex === 'F' && !userDto.profile_picture && (
                                    <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {userDto.sex === 'M' && !userDto.profile_picture && (
                                    <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-blue-500" />
                                )}
                                {userDto.profile_picture && (
                                    <Image src={`data:image/jpeg;base64,${userDto.profile_picture}`} width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-xl font-medium text-black dark:text-white">
                                    <p className="text-pink-700"><span className="font-bold">{userDto.sex === 'F' ? 'Mme ' : 'Mr '}</span><span className="font-bold text-pink-700">{userDto.pseudo}</span></p>
                                </div>
                                <p className="text-pink-700">ID user : <span className="font-bold">{userDto.id_User}</span></p>
                                <p className="text-pink-700">Description : <span className="font-bold">{userDto.description}</span></p>
                                <p className="text-pink-700">Sex : <span className="font-bold">{userDto.sex}</span></p>
                                <p className="text-pink-700">Ville : <span className="font-bold">{userDto.city}</span></p>
                                <p className="text-pink-700">Date de naissance : {new Date(userDto.date_of_birth).toLocaleDateString()}</p>
                                <div className="text-pink-700">Age : {ConvertingADateToAge(userDto.date_of_birth)} ans</div>
                            </div>
                        </div>
                        <Button_1Loading
                            onClick={() => button_requestfriendsAdd(userDto.id_User)}
                            title="Demande de match"
                            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 md:text-base md:px-6 md:py-3"
                        />
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                        </div>
                        <Link href="/welcome" className="text-white bg-pink-400 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                        Retour à la page welcome pour rencontrer de nouvelles personnes
                        </Link>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Aucun profil trouve...</h1>
                )}
            </div>
        );
    }

    return (
        <Loader1 />
    );
}