import { GetRequestFriendsDto } from "@/entities/GetRequestFriendsDto";
import { AuthStatus } from "@/entities/AuthStatus";
import Loader1 from "@/app/components/Loading/Loader1";
import { UseRequestFriends } from "@/interfaceAdapters/Hook/UseRequestFriends";
import { UseAuth } from "@/interfaceAdapters/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button_link_welcome } from '@/app/components/Button/Button_link_welcome';
import { Button_1Loading } from '@/app/components/Button/Button_1';
import { servicesTools } from '@/services/Tools';
import Link from 'next/link';

const RequestMatch = () => {



    const { requestFriendsDto,  AcceptRequestFriends, GetRequestFriends } = UseRequestFriends();
    const { status, UserAuthDto, UserGetConnected } = UseAuth();
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
            const fetchData = () => {
                GetRequestFriends();
                timer = setTimeout(fetchData, 10000);
            };
    
            fetchData();
        }

        return () => clearTimeout(timer);
    }, [status, GetRequestFriends]);


    useEffect(() => {
        if (Array.isArray(requestFriendsDto)) {
            const sent: GetRequestFriendsDto[] = [];
            const received: GetRequestFriendsDto[] = [];
            const friendsList: GetRequestFriendsDto[] = [];
            requestFriendsDto.forEach((item: GetRequestFriendsDto) => {
                if (item.idUserIssuer === UserAuthDto?.id_User && item.status === 0) {
                    sent.push(item);
                } else if (item.id_UserReceiver === UserAuthDto?.id_User && item.status === 0) {
                    received.push(item);
                } else if (item.status === 1) {
                    friendsList.push(item);
                }
            });
            setSentRequests(sent);
            setReceivedRequests(received);
            setFriends(friendsList);
        }
    }, [requestFriendsDto, UserAuthDto]);




    if (status === AuthStatus.Authenticated) {
        return (
            <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className="w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden md:flex md:flex-row">
    <div className="w-full md:w-1/3 p-4">
        <div className="twhitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <h2 className="text-lg font-medium text-gray-900">Match envoyés</h2>
        </div>

        <table className="w-full text-left divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
                {sentRequests.length > 0 ? (
                sentRequests.sort((a, b) => servicesTools.Tools.compareByProperty(a, b, 'date_of_request')).reverse().map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <Link href={`/profil-details/${item.id_UserReceiver}`}>
                                        <div className="text-sm font-medium text-gray-900">{item.userReceiverPseudo}</div>
                                        <div className="mb-4 sm:mb-0">
                                            {item.userReceiverSex === 'F' && !item.userReceiverPictureProfile && (
                                                <Image src="/assets/images/femme_anonyme.png" width="50" height="50" alt={item.userReceiverPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                            {item.userReceiverSex === 'M' && !item.userReceiverPictureProfile && (
                                                <Image src="/assets/images/homme_bg.png" width="50" height="50" alt={item.userReceiverPseudo} className="rounded-full border-4 border-blue-500" />
                                            )}
                                            {item.userReceiverPictureProfile && (
                                                <Image src={`data:image/jpeg;base64,${item.userReceiverPictureProfile}`} width="50" height="50" alt={item.userReceiverPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                        </div>
                                        <div className="text-pink-700">{new Date(item.date_of_request).toLocaleString()}</div>
                                    </Link>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                ) :
                (
                    <div className="flex justify-center">
                    <p className="text-center text-black">Rien à afficher ici 🫠</p>
                </div>
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
                receivedRequests.sort((a, b) => servicesTools.Tools.compareByProperty(a, b, 'date_of_request')).reverse().map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <Link href={`/profil-details/${item.idUserIssuer}`}>
                                        <div className="text-sm font-medium text-gray-900">{item.userIssuerPseudo}</div>
                                        <div className="mb-4 sm:mb-0">
                                            {item.userIssuerSex === 'F' && !item.userIssuerPictureProfile && (
                                                <Image src="/assets/images/femme_anonyme.png" width="50" height="50" alt={item.userIssuerPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                            {item.userIssuerSex === 'M' && !item.userIssuerPictureProfile && (
                                                <Image src="/assets/images/homme_bg.png" width="50" height="50" alt={item.userIssuerPseudo} className="rounded-full border-4 border-blue-500" />
                                            )}
                                            {item.userIssuerPictureProfile && (
                                                <Image src={`data:image/jpeg;base64,${item.userIssuerPictureProfile}`} width="50" height="50" alt={item.userIssuerPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">Date demande {new Date(item.date_of_request).toLocaleString()}</div>
                                    </Link>
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
                    <div className="flex justify-center">
                    <p className="text-center text-black">Rien à afficher ici 🫠</p>
                </div>
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
                                    <Link href={`/profil-details/${item.idUserIssuer === UserAuthDto?.id_User ? item.id_UserReceiver : item.idUserIssuer}`}>
                                        <div className="text-sm font-medium text-gray-900">{item.userIssuerPseudo === UserAuthDto?.pseudo ? item.userReceiverPseudo : item.userIssuerPseudo}</div>
                                        <div className="mb-4 sm:mb-0">
                                            {item.idUserIssuer !== UserAuthDto?.id_User && item.userIssuerSex === 'F' && !item.userIssuerPictureProfile && (
                                                <Image src="/assets/images/femme_anonyme.png" width="50" height="50" alt={item.userIssuerPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                            {item.idUserIssuer !== UserAuthDto?.id_User && item.userIssuerSex === 'M' && !item.userIssuerPictureProfile && (
                                                <Image src="/assets/images/homme_bg.png" width="50" height="50" alt={item.userIssuerPseudo} className="rounded-full border-4 border-blue-500" />
                                            )}
                                            {item.userIssuerPictureProfile && (
                                                <Image src={`data:image/jpeg;base64,${item.userIssuerPictureProfile}`} width="50" height="50" alt={item.userIssuerPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                            {item.id_UserReceiver !== UserAuthDto?.id_User && item.userReceiverSex === 'F' && !item.userReceiverPictureProfile && (
                                                <Image src="/assets/images/femme_anonyme.png" width="50" height="50" alt={item.userReceiverPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                            {item.id_UserReceiver !== UserAuthDto?.id_User && item.userReceiverSex === 'M' && !item.userReceiverPictureProfile && (
                                                <Image src="/assets/images/homme_bg.png" width="50" height="50" alt={item.userReceiverPseudo} className="rounded-full border-4 border-blue-500" />
                                            )}
                                            {item.userReceiverPictureProfile && (
                                                <Image src={`data:image/jpeg;base64,${item.userReceiverPictureProfile}`} width="50" height="50" alt={item.userReceiverPseudo} className="rounded-full border-4 border-pink-500" />
                                            )}
                                        </div>
                                    </Link>
                                    <Link href={`/tchat/${item.idUserIssuer === UserAuthDto?.id_User ? item.id_UserReceiver : item.idUserIssuer}`}>
                                        <Image
                                            src="/assets/svg/tchat_icon.svg"
                                            alt="Tchater"
                                            width={30}
                                            height={30}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                )   : (
                    <div className="flex justify-center">
                    <p className="text-center text-black">Rien à afficher ici 🫠</p>
                </div>
                    )}
            </tbody>
        </table>
    </div>
</div>
                <Button_link_welcome/>
            </div>
        );
    }

    return (
        <Loader1 />
    );
}

export default RequestMatch