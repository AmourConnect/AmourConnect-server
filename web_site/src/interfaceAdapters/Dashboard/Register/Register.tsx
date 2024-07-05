import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus } from "@/entities/AuthStatus";
import { UseAuth } from "@/interfaceAdapters/Hook/UseAuth";
import Loader1 from "@/app/components/Loading/Loader1";
import Image from 'next/image';
import Head from 'next/head';
import { servicesTools } from "@/services/Tools";
import { Button_1Loading } from '@/app/components/Button/Button_1';
import {SetUserDto} from '@/entities/SetUserDto';

const Register = () => {



    const { status, UserGetConnected, MessageApiAuth, AuthRegister }  = UseAuth();
    const router = useRouter();



    const [pseudo, setPseudo] = useState('');
    const [Description, setDescription] = useState('');
    const [sex, setSex] = useState('');
    const [city, setCity] = useState('');
    const [date_of_birth, setdate_of_birth] = useState('');



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
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!servicesTools.Tools.isValidDate(date_of_birth)) {
                alert('Veuillez entrer une date de naissance valide.');
                return;
            }
            const user: SetUserDto = {
                pseudo: pseudo,
                description: Description,
                sex: sex,
                city: city,
                date_of_birth: new Date(date_of_birth)
            };
            AuthRegister(user);
        };



        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-lg">
                            <h1 className="text-center text-2xl font-bold text-pink-500 sm:text-3xl">Valider votre Inscription pour lover ❤️</h1>

                        <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">

                            {MessageApiAuth && <p style={{ color: "red" }}>{MessageApiAuth}</p>}

                                <div>
                                    <label htmlFor="pseudo" className="sr-only">Pseudo</label>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="pseudo"
                                            value={pseudo}
                                            onChange={(e) => setPseudo(e.target.value)}
                                            className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                            placeholder="Enter Pseudo"
                                            required
                                        />

                                       <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                            <Image
                                            src="/assets/svg/circle-user-round.svg"
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
                                        required
                                        >
                                        <option value="">Choose your sex...</option>
                                        <option value="M">Masculin</option>
                                        <option value="F">Feminin</option>
                                    </select>

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <Image
                                            src="/assets/svg/dna.svg"
                                            alt="Sex icon"
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
                                        required
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
                                            src="/assets/svg/home.svg"
                                            alt="City icon"
                                            width={20}
                                            height={20}
                                        />
                                    </span>
                                </div>
                            </div>


                            <div>
                                    <label htmlFor="description" className="sr-only">Description</label>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="descripton"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                            placeholder="Enter Description"
                                            required
                                        />

                                       <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                            <Image
                                            src="/assets/svg/tchat_icon.svg"
                                            alt="Tchat icon"
                                            width={20}
                                            height={20}
                                            />
                                        </span>
                                    </div>
                                </div>


                            <div>
                                <label htmlFor="date_of_birth" className="sr-only">date_of_birth</label>

                                <div className="relative">
                                    <input
                                        type="date"
                                        id="date_of_birth"
                                        value={date_of_birth}
                                        onChange={(e) => setdate_of_birth(e.target.value)}
                                        className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        required
                                    />
                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <Image
                                            src="/assets/svg/calendar-days.svg"
                                            alt="Calendar icon"
                                            width={20}
                                            height={20}
                                        />
                                    </span>
                                </div>
                            </div>
                            <Button_1Loading
                                            onClick={() => handleSubmit}
                                            title="Valider 😍"
                                            className="block w-full rounded-lg bg-pink-500 hover:bg-pink-600 px-5 py-3 text-sm font-medium text-white"
                             />
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

export default Register