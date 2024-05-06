import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus, UserRegister } from "@/Hook/type";
import { UseAuth } from "@/Hook/UseAuth";
import Loader1 from "../app/components/Loader1";
import Image from 'next/image';
import Head from 'next/head';


export default function Register() {



    const { status, GetAllUsersToMatch, FinalRegister } = UseAuth();
    const router = useRouter();



    const [pseudo, setPseudo] = useState('');
    const [sex, setSex] = useState('');
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');



    useEffect(() => {
        GetAllUsersToMatch();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Authenticated) {
            timer = setTimeout(() => {
                router.push('/welcome');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status, GetAllUsersToMatch, router]);




    if (status === AuthStatus.Unauthenticated)
    {
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const user: UserRegister = {
                pseudo: pseudo,
                sex: sex,
                city: city,
                dateOfBirth: dateOfBirth
            };
            FinalRegister(user.pseudo, user.sex, user.city, user.dateOfBirth);
        };



        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-lg">
                            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Valider votre Inscription pour lover ❤️</h1>

                        <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">



                                <div>
                                    <label htmlFor="pseudo" className="sr-only">Pseudo</label>

                                    <div className="relative">
                                        <input
                                            type="pseudo"
                                            id="pseudo"
                                            value={pseudo}
                                            onChange={(e) => setPseudo(e.target.value)}
                                            className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                            placeholder="Enter Pseudo"
                                        />

                                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                            <Image
                                            src="/assets/images/circle-user-round.svg"
                                            alt="Pseudo icon"
                                            width={20}
                                            height={20}
                                            />
                                        </span>
                                    </div>
                                </div>



                            <div>
                                <label htmlFor="sex" className="sr-only">Sex</label>

                                <div className="relative">
                                    <select
                                        id="sex"
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                        className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        >
                                        <option value="">Choose your sex...</option>
                                        <option value="M">Masculin</option>
                                        <option value="F">Feminin</option>
                                    </select>

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <Image
                                            src="/assets/images/dna.svg"
                                            alt="Pseudo icon"
                                            width={20}
                                            height={20}
                                        />
                                    </span>
                                </div>
                            </div>



                            <div>
                                <label htmlFor="city" className="sr-only">City</label>

                                <div className="relative">
                                    <select
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    >
                                        <option value="">Choose your city...</option>
                                        <option value="Marseille">Marseille</option>
                                        <option value="Paris">Paris</option>
                                        <option value="Lyon">Lyon</option>
                                        <option value="Strasbourg">Strasbourg</option>
                                        <option value="Toulouse">Toulouse</option>
                                    </select>

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <Image
                                            src="/assets/images/home.svg"
                                            alt="Pseudo icon"
                                            width={20}
                                            height={20}
                                        />
                                    </span>
                                </div>
                            </div>



                            <div>
                                <label htmlFor="dateOfBirth" className="sr-only">dateOfBirth</label>

                                <div className="relative">
                                    <input
                                        type="date"
                                        id="dateOfBirth"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <Image
                                            src="/assets/images/calendar-days.svg"
                                            alt="Pseudo icon"
                                            width={20}
                                            height={20}
                                        />
                                    </span>
                                </div>
                            </div>



                                <button
                                    type="submit"
                                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                >
                                    Valider 😍
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }



    return (
            <Loader1 />
    );
}