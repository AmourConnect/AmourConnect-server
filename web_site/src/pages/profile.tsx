import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus } from "@/Hook/type";
import { UseAuth } from "@/Hook/UseAuth";
import Loader1 from "../app/components/Loader1";
import Head from 'next/head';
import Image from 'next/image';
import { ConvertingADateToAge, isValidDate } from "../lib/helper";
import { Button_1Loading } from '../app/components/Button_1';
import Link from 'next/link';


export default function Profile() {



    const { status, UserGetConnected, userDto, UserPatch } = UseAuth();
    const router = useRouter()



    const [sex, setSex] = useState('');
    const [Description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [date_of_birth, setdate_of_birth] = useState('');



    useEffect(() => {
        UserGetConnected();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetConnected, router]);




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
            formData.append("Description", Description);
            UserPatch(formData);
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
            UserPatch(formData);
        };



        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                {userDto ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Améliore ton profil pour attirer plus de proies ❤</h1>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                {userDto?.sex === 'F' && !userDto?.profile_picture && (
                                    <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {userDto?.sex === 'M' && !userDto.profile_picture && (
                                    <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-blue-500" />
                                )}
                                {userDto?.profile_picture && (
                                    <Image src={`data:image/jpeg;base64,${userDto.profile_picture}`} width="100" height="100" alt={userDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-xl font-medium text-black dark:text-white">
                                    <p className="text-pink-700"><span className="font-bold">{userDto.sex === 'F' ? 'Mme ' : 'Mr '}</span><span className="font-bold text-pink-700">{userDto.pseudo}</span></p>
                                </div>
                                <p className="text-pink-700">ID user : <span className="font-bold">{userDto.id_User}</span></p>
                                <p className="text-pink-700">Description : <span className="font-bold">{userDto.description}</span></p>
                                <p className="text-pink-700">Date de naissance : {new Date(userDto.date_of_birth).toLocaleDateString()}</p>
                                <div className="text-pink-700">Age : {ConvertingADateToAge(userDto.date_of_birth)} ans</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                                <input type="file" name="profile_picture" accept="image/*" />
                                <p className="text-sm text-red-500">Veuillez télécharger une image de maximum de 1 Mo.</p>
                                <Button_1Loading
                                            onClick={() => {handleSubmit}}
                                            title="Update Picture Profile"
                                            className="bg-pink-500 text-white px-4 py-2 rounded mt-2"
                                />
                            </form>
                            <form onSubmit={handleSubmitDate} className="w-full sm:w-auto">
                                <input type="date" value={date_of_birth} onChange={(e) => setdate_of_birth(e.target.value)} className="p-2 border rounded mt-2" />
                                <Button_1Loading
                                            onClick={() => {handleSubmitDate}}
                                            title="Update Date"
                                            className="bg-pink-500 text-white px-4 py-2 rounded mt-2"
                                />
                            </form>
                            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                                <select
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                >
                                    <option value="">{userDto?.city}</option>
                                    <option value="Marseille">Marseille</option>
                                    <option value="Paris">Paris</option>
                                    <option value="Lyon">Lyon</option>
                                    <option value="Strasbourg">Strasbourg</option>
                                    <option value="Toulouse">Toulouse</option>
                                </select>
                                <Button_1Loading
                                            onClick={() => {handleSubmit}}
                                            title="Update City"
                                            className="bg-pink-500 text-white px-4 py-2 rounded mt-2"
                                />
                            </form>
                            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                                <select
                                    id="sex"
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                    className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                >
                                    <option value="">{userDto?.sex}</option>
                                    <option value="M">Masculin</option>
                                    <option value="F">Feminin</option>
                                </select>
                                <Button_1Loading
                                            onClick={() => {handleSubmit}}
                                            title="Update Sex"
                                            className="bg-pink-500 text-white px-4 py-2 rounded mt-2"
                                />
                            </form>
                            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
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
                                    </div>
                                <Button_1Loading
                                            onClick={() => {handleSubmit}}
                                            title="Update Description"
                                            className="bg-pink-500 text-white px-4 py-2 rounded mt-2"
                                />
                            </form>
                        </div>
                        <Link href="/welcome" className="text-white bg-pink-400 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                            Retour à la page welcome pour chercher des proies
                        </Link>
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