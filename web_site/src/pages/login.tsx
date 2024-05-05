import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus } from "@/Hook/type";
import { useAuth } from "@/Hook/UseAuth";
import Loader1 from "../app/components/Loader1";
import Image from 'next/image';
import googleLogo from '../../public/assets/images/logo_google.png';
export default function LoginGoogle() {

    const { status, LoginGoogle } = useAuth();
    const router = useRouter()

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Authenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status, router]);


    if (status === AuthStatus.Unauthenticated) {
        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-black">Connexion uniquement avec Google❤</h1>
                <div className="flex items-center mb-4 sm:mb-6">
                    <Image src={googleLogo} alt="Logo Google" className="h-6 w-6 mr-2 sm:h-8 sm:w-8" />
                    <button
                        type="button"
                        className="px-6 py-3 bg-red-500 text-white font-medium rounded hover:bg-red-600 focus:outline-none sm:px-8 sm:py-4"
                        onClick={LoginGoogle}
                    >
                        Se connecter avec Google
                    </button>
                </div>
            </div>
        );
    }

    else {
        return (
            <Loader1 />
        );
    }
}