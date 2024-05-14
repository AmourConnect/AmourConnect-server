import { AuthStatus} from "@/Hook/type";
import Loader1 from "../../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { ConvertingADateToAge } from "../../lib/helper";
import PopUp from "@/app/components/pop_up1";



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
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                {show && (MessageApi || requestFriendsDto) && (
                        <PopUp title="Message" description={MessageApi || requestFriendsDto?.message} />
                )}
                {userDto ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Le detail dune proie</h1>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                {userDto.sex === 'F' && !userDto.profile_picture && (
                                    <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {userDto.sex === 'M' && !userDto.profile_picture && (
                                    <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {userDto.profile_picture && (
                                    <Image src={`data:image/jpeg;base64,${userDto.profile_picture}`} width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-xl font-medium text-black dark:text-white">
                                    {userDto.sex === 'F' ? 'Mme ' : 'Mr '}
                                    <span className="font-bold text-pink-700">{userDto.pseudo}</span>
                                </div>
                                <p className="text-pink-700">Description : <span className="font-bold">{userDto.description}</span></p>
                                <p className="text-pink-700">Sex : <span className="font-bold">{userDto.sex}</span></p>
                                <p className="text-pink-700">Ville : <span className="font-bold">{userDto.city}</span></p>
                                <p className="text-pink-700">Date de naissance : {new Date(userDto.date_of_birth).toLocaleString()}</p>
                                <div className="text-pink-700">Age : {ConvertingADateToAge(userDto.date_of_birth)} ans</div>
                            </div>
                        </div>
                        <button
                                        className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 md:text-base md:px-6 md:py-3"
                                        onClick={() => button_requestfriendsAdd(userDto.id_User)}
                                    >
                                        Demande de match
                        </button>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                        </div>
                        <a href="/welcome" className="block mt-4 text-center underline text-pink-700">Aller a la page welcome pour chercher des proies</a>
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