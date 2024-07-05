import { GetUserDto } from "@/entities/GetUserDto";
import { AuthStatus } from "@/entities/AuthStatus";
import Loader1 from "@/app/components/Loading/Loader1";
import PopUp from "@/app/components/PopUp/pop_up1";
import PopUp2 from "@/app/components/PopUp/pop_up2";
import { UseAuth } from "@/interfaceAdapters/Hook/UseAuth";
import { UseRequestFriends } from "@/interfaceAdapters/Hook/UseRequestFriends";
import { UseUser } from "@/interfaceAdapters/Hook/UseUser";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { servicesTools } from "@/services/Tools";
import { motion } from 'framer-motion';
import { Button_1Loading } from '@/app/components/Button/Button_1';
import Link from "next/link";


const WelcomePage = () => {


    const { status, UserGetConnected } = UseAuth();
    const { UserGetUsersToMach, usersDto } = UseUser();
    const { RequestFriendsAdd, MessageApiR, requestFriendsDto } = UseRequestFriends();
    const router = useRouter();


    useEffect(() => {
        UserGetConnected();
        UserGetUsersToMach();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetUsersToMach, router]);



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
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="sticky top-0 z-10 flex justify-between w-full mb-4">
                    <a
                        href={`/profile`}
                        className="text-white bg-pink-400 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 md:text-base md:px-6 md:py-3"
                    >
                        Voir mon profil
                    </a>
                    <a
                        href={`/request`}
                        className="text-white bg-pink-400 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 md:text-base md:px-6 md:py-3"
                    >
                        Voir mes matchs
                    </a>
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                {show && (requestFriendsDto?.message) && (
                        <PopUp title="Message" description={requestFriendsDto?.message} />
                    )} : { show &&(MessageApiR) && (
                        <PopUp2 title="Attention" description={MessageApiR} />
                    )}
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {Array.isArray(usersDto) && usersDto.length > 0 ? (
                            usersDto.map((account: GetUserDto) => (
                                <motion.div
                                    key={account.id_User}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg dark:border-gray-700 md:space-y-6 md:p-6 sm:w-full"
                                >
                                    {account.sex === "F" && !account.profile_picture && (
                                        <Image
                                            src="/assets/images/femme_anonyme.png"
                                            width="100"
                                            height="100"
                                            alt={account.pseudo}
                                            className="rounded-full md:w-20 md:h-20"
                                        />
                                    )}
                                    {account.sex === "M" && !account.profile_picture && (
                                        <Image
                                            src="/assets/images/homme_bg.png"
                                            width="100"
                                            height="100"
                                            alt={account.pseudo}
                                            className="rounded-full md:w-20 md:h-20"
                                        />
                                    )}
                                    {account.profile_picture && (
                                        <Image
                                            src={`data:image/jpeg;base64,${account.profile_picture}`}
                                            width="100"
                                            height="100"
                                            alt={account.pseudo}
                                            className="rounded-full md:w-20 md:h-20"
                                        />
                                    )}
                                    <div className="text-xl font-medium text-black dark:text-white md:text-2xl">
                                    <Link href={`/profil-details/${account.id_User}`}>
                                        {account.sex === "F" ? "Mme " : "Mr "}
                                        {account.pseudo}
                                    </Link>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 md:text-base">
                                        Âge : {servicesTools.Tools.ConvertingADateToAge(account.date_of_birth)} ans
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 md:text-base">
                                        Description : {account.description}
                                    </div>
                                    <Button_1Loading
                                            onClick={() => button_requestfriendsAdd(account.id_User)}
                                            title="Demander un match 🥰"
                                            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 md:text-base md:px-6 md:py-3"
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400 md:text-base">
                                Aucun utilisateur à afficher à cause de vos critères (ville, âge, sexe...) modifier votre profil
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }



    return (
        <Loader1 />
    );
}

export default WelcomePage