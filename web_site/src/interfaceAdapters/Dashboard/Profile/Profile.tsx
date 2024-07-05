import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus } from "@/entities/AuthStatus";
import { UseAuth } from "@/interfaceAdapters/Hook/UseAuth";
import { UseUser } from "@/interfaceAdapters/Hook/UseUser";
import Loader1 from "@/app/components/Loading/Loader1";
import Head from 'next/head';
import Image from 'next/image';
import { servicesTools } from "@/services/Tools";
import { Button_1Loading } from '@/app/components/Button/Button_1';
import { Button_link_welcome } from '@/app/components/Button/Button_link_welcome';



const Profile = () => {



    const { status, UserGetConnected, UserAuthDto } = UseAuth();
    const { UserPatch } = UseUser();
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
            if (!servicesTools.Tools.isValidDate(date_of_birth)) {
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
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {UserAuthDto ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl text-pink-500">Mets en valeur tes atouts pour séduire sur notre site ❤</h1>
                        <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                {UserAuthDto?.sex === 'F' && !UserAuthDto?.profile_picture && (
                                    <Image src="/assets/images/femme_anonyme.png" width="100" height="100" alt={UserAuthDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                                {UserAuthDto?.sex === 'M' && !UserAuthDto.profile_picture && (
                                    <Image src="/assets/images/homme_bg.png" width="100" height="100" alt={UserAuthDto.pseudo} className="rounded-full border-4 border-blue-500" />
                                )}
                                {UserAuthDto?.profile_picture && (
                                    <Image src={`data:image/jpeg;base64,${UserAuthDto.profile_picture}`} width="100" height="100" alt={UserAuthDto.pseudo} className="rounded-full border-4 border-pink-500" />
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-xl font-medium text-black dark:text-white">
                                    <p className="text-pink-700"><span className="font-bold">{UserAuthDto.sex === 'F' ? 'Mme ' : 'Mr '}</span><span className="font-bold text-pink-700">{UserAuthDto.pseudo}</span></p>
                                </div>
                                <p className="text-pink-700">ID user : <span className="font-bold">{UserAuthDto.id_User}</span></p>
                                <p className="text-pink-700">Description : <span className="font-bold">{UserAuthDto.description}</span></p>
                                <p className="text-pink-700">Date de naissance : {new Date(UserAuthDto.date_of_birth).toLocaleDateString()}</p>
                                <div className="text-pink-700">Age : {servicesTools.Tools.ConvertingADateToAge(UserAuthDto.date_of_birth)} ans</div>
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
                                    <option value="">{UserAuthDto?.city}</option>
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
                                    <option value="">{UserAuthDto?.sex}</option>
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
                        <Button_link_welcome/>
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

export default Profile