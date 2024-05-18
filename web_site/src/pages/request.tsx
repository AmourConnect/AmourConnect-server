import { AuthStatus, GetRequestFriendsDto } from "@/Hook/type";
import Loader1 from "../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button_1Loading } from '../app/components/Button_1';
import { LoaderCustombg } from '../app/components/ui/LoaderCustombg';
import { compareByProperty } from '../lib/helper';
import Link from 'next/link';


export default function Request() {



    const { requestFriendsDto, status, userDto, GetRequestFriends, UserGetConnected, AcceptRequestFriends } = UseAuth();
    const router = useRouter();



    const [sentRequests, setSentRequests] = useState<GetRequestFriendsDto[]>([]);
    const [receivedRequests, setReceivedRequests] = useState<GetRequestFriendsDto[]>([]);
    const [friends, setFriends] = useState<GetRequestFriendsDto[]>([]);




    useEffect(() => {
        UserGetConnected();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetConnected, GetRequestFriends ,router]);


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (status === AuthStatus.Authenticated) {
            timer = setInterval(() => {
                GetRequestFriends();
            }, 3000);
        }

        return () => clearInterval(timer);
    }, [status, GetRequestFriends]);


    useEffect(() => {
        if (Array.isArray(requestFriendsDto)) {
            const sent: GetRequestFriendsDto[] = [];
            const received: GetRequestFriendsDto[] = [];
            const friendsList: GetRequestFriendsDto[] = [];
            requestFriendsDto.forEach((item: GetRequestFriendsDto) => {
                if (item.idUserIssuer === userDto?.id_User && item.status === 0) {
                    sent.push(item);
                } else if (item.id_UserReceiver === userDto?.id_User && item.status === 0) {
                    received.push(item);
                } else if (item.status === 1) {
                    friendsList.push(item);
                }
            });
            setSentRequests(sent);
            setReceivedRequests(received);
            setFriends(friendsList);
        }
    }, [requestFriendsDto, userDto]);




    if (status === AuthStatus.Authenticated) {
        return (
            <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>

                <div className="w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden md:flex md:flex-row">
    <div className="w-full md:w-1/3 p-4">
        <div className="twhitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <h2 className="text-lg font-medium text-gray-900">Match envoyés</h2>
        </div>

        <table className="w-full text-left divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
                {sentRequests.length > 0 ? (
                sentRequests.sort((a, b) => compareByProperty(a, b, 'date_of_request')).reverse().map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <a href={`/profil-details/${item.id_UserReceiver}`}>
                                        <div className="text-sm font-medium text-gray-900">{item.userReceiverPseudo}</div>
                                    </a>
                                    <div className="text-pink-700">{new Date(item.date_of_request).toLocaleString()}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                ) :
                (
                    <LoaderCustombg />
                )
                }
            </tbody>
        </table>
    </div>

    <div className="w-full md:w-1/3 p-4">
        <div className="twhitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <h2 className="text-lg font-medium text-gray-900">Match reçues</h2>
        </div>

        <table className="w-full text-left divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
                { receivedRequests.length > 0 ? (
                receivedRequests.sort((a, b) => compareByProperty(a, b, 'date_of_request')).reverse().map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <a href={`/profil-details/${item.idUserIssuer}`}>
                                        <div className="text-sm font-medium text-gray-900">{item.userIssuerPseudo}</div>
                                    </a>
                                    <div className="text-sm text-gray-500">Date demande {new Date(item.date_of_request).toLocaleString()}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                           <Button_1Loading
                            onClick={() => AcceptRequestFriends(item.idUserIssuer)}
                            title="Accepter"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </td>
                    </tr>
                ))
                ) :
                (
                    <LoaderCustombg />
                )
                }
            </tbody>
        </table>
    </div>

    <div className="w-full md:w-1/3 p-4">
        <div className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <h2 className="text-lg font-medium text-gray-900">Liste de matchs valides</h2>
        </div>

        <table className="w-full text-left divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
                { friends.length > 0 ? (
                friends.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <a href={`/profil-details/${item.idUserIssuer === userDto?.id_User ? item.id_UserReceiver : item.idUserIssuer}`}>
                                        <div className="text-sm font-medium text-gray-900">{item.userIssuerPseudo === userDto?.pseudo ? item.userReceiverPseudo : item.userIssuerPseudo}</div>
                                    </a>
                                    <a href={`/tchat/${item.idUserIssuer === userDto?.id_User ? item.id_UserReceiver : item.idUserIssuer}`}>
                                        <Image
                                            src="/assets/images/tchat_icon.svg"
                                            alt="Tchater avec"
                                            width={20}
                                            height={20}
                                        />
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                )   : (
                        <LoaderCustombg />
                    )}
            </tbody>
        </table>
    </div>
</div>
                <Link href="/welcome" className="text-white bg-pink-400 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                        Aller a la page welcome pour chercher des proies
                </Link>
            </div>
        );
    }

    return (
        <Loader1 />
    );
}
