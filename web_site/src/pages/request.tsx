import { AuthStatus, RequestFriends } from "@/Hook/type";
import Loader1 from "../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Head from 'next/head';



export default function Request() {


    const { status2, account, account2, GetRequestFriends, GetUserOnly, AcceptRequestFriends } = UseAuth();
    const router = useRouter();


    const [sentRequests, setSentRequests] = useState<RequestFriends[]>([]);
    const [receivedRequests, setReceivedRequests] = useState<RequestFriends[]>([]);
    const [friends, setFriends] = useState<RequestFriends[]>([]);



    useEffect(() => {
        GetRequestFriends();
        GetUserOnly();
        let timer: NodeJS.Timeout | undefined;
        if (status2 === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status2, GetRequestFriends, GetUserOnly, router]);



    useEffect(() => {
        if (account2) {
            const sent: RequestFriends[] = [];
            const received: RequestFriends[] = [];
            const friendsList: RequestFriends[] = [];
            account2.forEach((item: RequestFriends) => {
                if (item.idUserIssuer === account?.id_User && item.status === 0) {
                    sent.push(item);
                } else if (item.id_UserReceiver === account?.id_User && item.status === 0) {
                    received.push(item);
                } else if (item.status === 1) {
                    friendsList.push(item);
                }
            });
            setSentRequests(sent);
            setReceivedRequests(received);
            setFriends(friendsList);
        }
    }, [account2, account]);



    if (status2 === AuthStatus.Authenticated) {
        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                <div className="w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 p-4">
                            <h2 className="text-lg font-medium text-gray-900 mb-2 bg-white">Demandes de match envoyees en attente</h2>
                            <table className="w-full text-left divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200">
                                    {sentRequests.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap ">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <a href={`/profil-details/${item.id_UserReceiver}`}>
                                                            <div className="text-sm font-medium text-gray-900">{item.userReceiverPseudo}</div>
                                                        </a>
                                                        <div className="text-sm text-gray-500">{new Date(item.date_of_request).toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                            <h2 className="text-lg font-medium text-gray-900 mb-2 bg-white">Demandes de match recues</h2>
                            <table className="w-full text-left divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200">
                                    {receivedRequests.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <a href={`/profil-details/${item.idUserIssuer}`}>
                                                            <div className="text-sm font-medium text-gray-900">{item.userIssuerPseudo}</div>
                                                        </a>
                                                        <div className="text-sm text-gray-500">{new Date(item.date_of_request).toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    onClick={() => AcceptRequestFriends(item.idUserIssuer)}
                                                >
                                                    Accepter
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                            <h2 className="text-lg font-medium text-gray-900 mb-2 bg-white">Liste de match valider</h2>
                            <table className="w-full text-left divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200">
                                    {friends.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <a href={`/profil-details/${item.idUserIssuer === account?.id_User ? item.id_UserReceiver : item.idUserIssuer}`}>
                                                        <div className="text-sm font-medium text-gray-900">{item.userIssuerPseudo === account?.pseudo ? item.userReceiverPseudo : item.userIssuerPseudo}</div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <Loader1 />
    );


}