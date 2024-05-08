import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus, Account } from "@/Hook/type";
import { UseAuth } from "@/Hook/UseAuth";
import Loader1 from "../app/components/Loader1";
import Head from 'next/head';
import Image from 'next/image';
import { ConvertingADateOfBirthToAge } from "../lib/helper";



export default function Profile() {



    const { status, GetUserOnly, account, PatchUser } = UseAuth();
    const router = useRouter()



    useEffect(() => {
        GetUserOnly();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status, GetUserOnly, router]);



    const [sex, setSex] = useState('');
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [profilePicture, setProfilePicture] = useState(null);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        PatchUser(profilePicture, sex, city, dateOfBirth);
    };



    if (status === AuthStatus.Authenticated) {
        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                {account ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Améliore ton profile pour attirer plus de proie❤</h1>
                        <div>
                            <p>ID utilisateur : {account.id_User}</p>
                            {account.sex === 'F' && !account.profile_picture && (
                                <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                            )}
                            {account.sex === 'M' && !account.profile_picture && (
                                <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={account.pseudo} className="rounded-full" />
                            )}
                            {account.profile_picture && (
                                <Image src={URL.createObjectURL(account.profile_picture)} width="100" height="100" alt={account.pseudo} className="rounded-full" />
                            )}
                            <div className="text-xl font-medium text-black dark:text-white">
                                {account.sex === 'F' ? 'Mme ' : 'Mr '}
                                {account.pseudo}
                            </div>
                            <p>Email Google : {account.emailGoogle}</p>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Âge : {ConvertingADateOfBirthToAge(account.date_of_birth)} ans</div>
                        </div>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Chargement du profil...</h1>
                )}

                <form onSubmit={handleSubmit}>
                    <input type="file" name="profilePicture" accept="image/*" onChange={handleProfilePictureChange} />
                    <select
                        id="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    >
                        <option value="">{account.sex}</option>
                        <option value="M">Masculin</option>
                        <option value="F">Feminin</option>
                    </select>

                    <select
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    >
                        <option value="">{account.city}</option>
                        <option value="Marseille">Marseille</option>
                        <option value="Paris">Paris</option>
                        <option value="Lyon">Lyon</option>
                        <option value="Strasbourg">Strasbourg</option>
                        <option value="Toulouse">Toulouse</option>
                    </select>


                    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(new Date(e.target.value))} />
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        );
    }



    return (
        <Loader1 />
    );
}