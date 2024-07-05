import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus } from "@/entities/AuthStatus";
import { UseAuth } from "@/interfaceAdapters/Hook/UseAuth";
import Loader1 from "@/app/components/Loading/Loader1";
import Image from 'next/image';
import Head from 'next/head';
import { Button_1Loading } from '@/app/components/Button/Button_1';


const LoginGoogle = () => {



    const { status, UserGetConnected, AuthLoginGoogle } = UseAuth();
    const router = useRouter();



    useEffect(() => {
        UserGetConnected();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Authenticated) {
            timer = setTimeout(() => {
                router.push('/welcome');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetConnected, router]);




    if (status === AuthStatus.Unauthenticated)
    {
        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Connexion uniquement avec Google❤</h1>
                <div className="flex items-center mb-4 sm:mb-6">
                    <Image src="/assets/images/logo_google.png" alt="Logo Google" width={50} height={50} className="h-6 w-6 mr-2 sm:h-8 sm:w-8" />
                <Button_1Loading
                    onClick={AuthLoginGoogle}
                    title="Se connecter avec Google"
                    className="px-6 py-3 bg-pink-500 text-white font-medium rounded hover:bg-pink-600 focus:outline-none sm:px-8 sm:py-4"
                    />
                </div>
            </div>
        );
    }



    return (
            <Loader1 />
    );
}

export default LoginGoogle