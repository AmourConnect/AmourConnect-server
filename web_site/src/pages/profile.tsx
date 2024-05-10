﻿import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus } from "@/Hook/type";
import { UseAuth } from "@/Hook/UseAuth";
import Loader1 from "../app/components/Loader1";
import Head from 'next/head';
import Image from 'next/image';
import { ConvertingADateToAge, isValidDate } from "../lib/helper";


export default function Profile() {



    const { status, GetUserOnly, account, PatchUser } = UseAuth();
    const router = useRouter()



    const [sex, setSex] = useState('');
    const [city, setCity] = useState('');
    const [date_of_birth, setdate_of_birth] = useState('');



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




    if (status === AuthStatus.Authenticated) {


        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const inputElement = event.currentTarget.elements.namedItem("profile_picture") as HTMLInputElement;
            const formData = new FormData();
            let file;
            if (inputElement)
            {
               file = inputElement.files?.[0];
            }
            if (file)
            {
                formData.append("profile_picture", file);
            }
            formData.append("city", city);
            formData.append("sex", sex);
            PatchUser(formData);
        };


        const handleSubmitDate = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!isValidDate(date_of_birth)) {
                alert('Veuillez entrer une date de naissance valide.');
                return;
            }
            let d = new Date(date_of_birth);
            const formData = new FormData();
            formData.append("date_of_birth", d.toISOString());
            PatchUser(formData);
        };



        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                {account ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Améliore ton profil pour attirer plus de proies ❤</h1>
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
                                </div>
                                <p>Date de naissance : {new Date(account.date_of_birth).toLocaleString()}</p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Âge : {ConvertingADateToAge(account.date_of_birth)} ans</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                                <input type="file" name="profile_picture" accept="image/*" />
                                <p className="text-sm text-red-500">Veuillez télécharger une image de maximum 3 Mo.</p>
                                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded mt-2">Update Picture Profile</button>
                            </form>
                            <form onSubmit={handleSubmitDate} className="w-full sm:w-auto">
                                <input type="date" value={date_of_birth} onChange={(e) => setdate_of_birth(e.target.value)} className="p-2 border rounded mt-2" />
                                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded mt-2">Update Date</button>
                            </form>
                            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
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
                                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded mt-2">Update City</button>
                            </form>
                            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
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
                                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded mt-2">Update Sex</button>
                            </form>
                        </div>
                        <a href="/welcome" className="block mt-4 text-center underline">Aller à la page welcome pour chercher des proies</a>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Chargement du profil...</h1>
                )}
            </div>
        );
    }



    return (
        <Loader1 />
    );
}