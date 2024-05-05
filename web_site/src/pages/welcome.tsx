import { AuthStatus, Account } from "@/Hook/type";
import Loader1 from "../app/components/Loader1";
import { useAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Image from 'next/image';

export default function Welcome() {

    const { status, authenticate, account } = useAuth();
    const router = useRouter()

    useEffect(() => {
        authenticate();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status, authenticate, router]);

    if (status === AuthStatus.Authenticated) {
        return (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {account.length > 0 ? (
                            account.map(account => (
                                <div key={account.id_User} className="flex flex-col items-center space-y-4">
                                    {account.sex === 'F' && !account.profile_picture && (
                                        <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                    )}
                                    {account.sex === 'M' && !account.profile_picture && (
                                        <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                    )}
                                    {account.profile_picture && (
                                        <Image src={URL.createObjectURL(account.profile_picture)} width="100" height="100" alt={account.pseudo} className="rounded-full" />
                                    )}
                                    <div className="text-xl font-medium text-black dark:text-white">{account.pseudo}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Date de Naissance : {account.dateOfBirth}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Aucun utilisateur à afficher à cause de vos critères (âge, sexe...)</div>
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