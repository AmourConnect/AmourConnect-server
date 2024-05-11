import { AuthStatus} from "@/Hook/type";
import Loader1 from "../../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { ConvertingADateToAge } from "../../lib/helper";



export default function ProfileDetailID() {


    const { status, UserGetUserID, accountState } = UseAuth();
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



    if (status === AuthStatus.Authenticated) {

        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                {accountState.userDto ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Le detail dune proie</h1>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                {accountState.userDto.sex === 'F' && !accountState.userDto.profile_picture && (
                                    <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={accountState.userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {accountState.userDto.sex === 'M' && !accountState.userDto.profile_picture && (
                                    <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={accountState.userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {accountState.userDto.profile_picture && (
                                    <Image src={`data:image/jpeg;base64,${accountState.userDto.profile_picture}`} width="100" height="100" alt={accountState.userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-xl font-medium text-black dark:text-white">
                                    {accountState.userDto.sex === 'F' ? 'Mme ' : 'Mr '}
                                    <span className="font-bold text-pink-700">{accountState.userDto.pseudo}</span>
                                </div>
                                <p className="text-pink-700">Sexe : <span className="font-bold">{accountState.userDto.sex}</span></p>
                                <p className="text-pink-700">Ville : <span className="font-bold">{accountState.userDto.city}</span></p>
                                <p className="text-pink-700">Date de naissance : {new Date(accountState.userDto.date_of_birth).toLocaleString()}</p>
                                <div className="text-pink-700">Age : {ConvertingADateToAge(accountState.userDto.date_of_birth)} ans</div>
                            </div>
                        </div>
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