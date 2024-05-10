import { AuthStatus, Account } from "@/Hook/type";
import Loader1 from "../../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { ConvertingADateToAge } from "../../lib/helper";



export default function ProfileDetailID() {


    const { status2, GetUserID, account, GetRequestFriends } = UseAuth();
    const router = useRouter();
    const { id } = router.query;



    useEffect(() => {
        GetRequestFriends();
        GetUserID(id);
        let timer: NodeJS.Timeout | undefined;
        if (status2 === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status2, GetRequestFriends, GetUserID, router]);



    if (status2 === AuthStatus.Authenticated) {

        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                {account ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Le detail dune proie</h1>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                {account.sex === 'F' && !account.profile_picture && (
                                    <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                )}
                                {account.sex === 'M' && !account.profile_picture && (
                                    <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                )}
                                {account.profile_picture && (
                                    <Image src={`data:image/jpeg;base64,${account.profile_picture}`} width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-xl font-medium text-black dark:text-white">
                                    {account.sex === 'F' ? 'Mme ' : 'Mr '}
                                    {account.pseudo}
                                    {account.sex}
                                    {account.city}
                                </div>
                                <p>Date de naissance : {new Date(account.date_of_birth).toLocaleString()}</p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">age : {ConvertingADateToAge(account.date_of_birth)} ans</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                        </div>
                        <a href="/welcome" className="block mt-4 text-center underline">Aller a la page welcome pour chercher des proies</a>
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