import { AuthStatus, Account } from "@/Hook/type";
import Loader1 from "../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { ConvertingADateToAge } from "../lib/helper";
import { motion } from 'framer-motion';


export default function Welcome() {



    const { status, GetAllUsersToMatch, account, RequestFriends } = UseAuth();
    const router = useRouter();



    useEffect(() => {
        GetAllUsersToMatch();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status, GetAllUsersToMatch, router]);



    if (status === AuthStatus.Authenticated) {
        return (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                <a href={`/profile`} className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                    Voir mon profil
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {Array.isArray(account) && account.length > 0 ? (
                            account.map((account: Account) => (
                                <motion.div
                                    key={account.id_User}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg dark:border-gray-700"
                                >
                                    {account.sex === 'F' && !account.profile_picture && (
                                        <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                    )}
                                    {account.sex === 'M' && !account.profile_picture && (
                                        <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                    )}
                                    {account.profile_picture && (
                                        <Image src={`data:image/jpeg;base64,${account.profile_picture}`} width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                    )}
                                    <div className="text-xl font-medium text-black dark:text-white">
                                        {account.sex === 'F' ? 'Mme ' : 'Mr '}
                                        {account.pseudo}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Âge : {ConvertingADateToAge(account.date_of_birth)} ans</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Sex : {account.sex}</div>
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        onClick={() => RequestFriends(account.id_User)}
                                    >
                                        Demande de match
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Aucun utilisateur à afficher à cause de vos critères (ville, âge, sexe...) modifier votre profil</div>
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